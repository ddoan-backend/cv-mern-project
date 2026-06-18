import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import User from '../models/users.js'
import dotenv from 'dotenv'
dotenv.config()

const createAdmin = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONECTION)

        const existed = await User.findOne({email:'admin@gmail.com'})
        if(existed){
            console.log('admin đã tồn tại')
            process.exit(0)
        }
        
        //hasd password
        const hasdedPassword = await bcrypt.hash('123456' , 10)

        // save db
        await User.create({
            name:'Admin',
            email:'admin@gmail.com',
            password:hasdedPassword,
            role:'admin'
        })

        console.log('tạo admin thành công')
        process.exit(0)
    } catch (error) {
        console.log('có lỗi xảy ra' , error)
        process.exit(1)
    }
}
createAdmin()