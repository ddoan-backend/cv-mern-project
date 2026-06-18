import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    phone:{type:String},
    role:{
        type:String,
        enum:['staff' , 'admin'],
        default:'staff'
    },
    isActive:{type:Boolean , default:true}
},{timestamps:true})

export default mongoose.model('user' , UserSchema)