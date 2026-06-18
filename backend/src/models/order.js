import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    table:{type:mongoose.Schema.ObjectId , ref:'table' , required:true},
    customerNote:{type:String},
    item:[
        {
            menuItem:{type:mongoose.Schema.ObjectId , ref:'menuitem'},
            quantity:{type:Number , required:true},
            price:{type:Number , required:true},
            note:{type:String},
            status:{type:String ,enum:['active' , 'cancelled'] , default:'active'}
        },
    ],
    totalAmount:{type:Number , required:true},
    status:{
        type:String,
        enum:['pending' , 'comfirmed' , 'done'],
        default:'pending'
    },
    handleBy:{type:mongoose.Schema.ObjectId , ref:'user'}
},{timestamps:true})

export default mongoose.model('order', OrderSchema)