import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
    name:{type:String , required :true},
    description:{type:String},
    price:{type:Number , required:true},
    category:{type:String ,enum:["snack" , "bar snack"  ,"drink"]},
    image:{type:String},
    isAvailable:{type:Boolean , default:true}
},{timestamps:true})

export default mongoose.model('menuitem' , MenuItemSchema)