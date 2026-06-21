import bcrypt from 'bcrypt'
import User from '../models/users.js'
import refreshtoken from '../models/refreshToken.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const ACCESS_TOKEN_TTL = '30m'
const REFRESH_TOKEN_TTL = 14*24*60*60*1000


//sign in
export const signIn = async(req , res)=>{
    try {
        //check input
        const {name , password } = req.body
        if(!name || !password){
            return res.status(400).json({message:'tài khoản hoặc mật khẩu không đúng'})
        }
        //check user
        const userSignIn = await User.findOne({name})
        if(!userSignIn){
             return res.status(400).json({message:'tên đăng nhập  hoặc mật khẩu không chính xác'})
        }
        //check password
        const PasswordCorrect = await bcrypt.compare(password , userSignIn.password)
        if(!PasswordCorrect){
            return res.status(400).json({message:'tên đăng nhập hoặc mật khẩu không chính xác'})
        }
        //create accesstoken
        const accessToken =  jwt.sign({userId:userSignIn._id , role: userSignIn.role} , process.env.SECRET_KEY_TOKEN,{expiresIn:ACCESS_TOKEN_TTL})
        //create refreshtoken
        const refreshTK = await crypto.randomBytes(64).toString('hex')
        //delete refresh token
        await refreshtoken.deleteMany({userId:userSignIn._id})
        //save refreshToken to db
        await refreshtoken.create({
            userId:userSignIn._id,
            refreshToken:refreshTK,
            expiresAt:new Date(Date.now() + REFRESH_TOKEN_TTL)

        })

        //return refresh token to cookie
        res.cookie('refreshToken' , refreshTK,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:REFRESH_TOKEN_TTL
        })
        //return accesstoken
        return res.status(200).json({message:`người dùng ${userSignIn.name} đã đăng nhập` , accessToken , user:{
            id: userSignIn._id,
            name: userSignIn.name,
            role: userSignIn.role
        }})
    } catch (error) {
        console.error('lỗi khi gọi signin' , error)
        return res.status(500).json({message:'lỗi hệ thống'})
    }
}
//sign out
export const signOut = async(req , res)=>{
    try {
        //get refresh token from cookie
        const token = req.cookies?.refreshToken
        if(token){
            await refreshtoken.deleteOne({refreshToken:token})
            // delete cookie
            res.clearCookie("refreshToken")
        }
        return res.status(200).json({message:'ng dung da dang xuat'})
    } catch (error) {
       console.error('lỗi khi gọi signin' , error)
        return res.status(500).json({message:'lỗi hệ thống'}) 
    }
}