import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
    name:{type:String , required :true},
    description:{type:String},
    price:{type:Number , required:true},
    category:{type:String ,enum:["Ăn Vặt" , "Món Nhậu"  ,"Đồ Uống"]},
    image:{type:String},
    isAvailable:{type:Boolean , default:true}
},{timestamps:true})

export default mongoose.model('menuitem' , MenuItemSchema)