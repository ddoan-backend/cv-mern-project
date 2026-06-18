import jwt from 'jsonwebtoken'
import User from '../models/users.js'

export const protectdRoute = (req,res,next)=>{
    try {
            //get token from header
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(" ")[1]
            if(!token){
                return res.status(401).json({message:'không tìm thấy access Token'})
            }
            
            // accept valid token
            jwt.verify(token , process.env.SECRET_KEY_TOKEN , async(err , decodedUser) =>{
                if(err){
                    console.error(err)
                    return res.status(400).json({message:'access token hết hạn hoặc không đúng'})
                }
            //find user id
            const user = await User.findById(decodedUser.userId).select('-password')
            if(!user){
                return res.status(400).json({message:'người dùng không tồn tại'})
            }
            //return user to request
            req.user = user
            next()
            })
    } catch (error) {
        console.error('loi khi xac minh jwt' , error)
        return res.status(500).json({message:'lỗi hệ thống'})
    }
}