import mongoose from "mongoose";


const refreshTokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true,
        index:true
    },
    refreshToken:{
        type:String,
        required:true,
        unique:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})
refreshTokenSchema.index({expiresAt:1},{expireAfterSeconds:0})
export default mongoose.model('refreshtoken' , refreshTokenSchema)