import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
    tableNumber:{type:Number , required:true , unique:true},
    qrCode:{type:String},
    status:{
        type:String,
        enum:["available" , "occupied"],
        default:'available'
    },
    capacity:{type:Number , default:4}
},{timestamps:true})

export default mongoose.model('table' , TableSchema)