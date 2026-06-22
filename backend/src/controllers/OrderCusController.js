import MenuItem from "../models/menuItem.js"
import Table from '../models/table.js'
import Order from '../models/order.js'
import { io } from "../server.js"
// get list food
export const GetFood = async (req, res) => {
  try {
    const listFood = await MenuItem.find({})
    return res.status(200).json({
      message: "Lấy danh sách thành công", data:listFood})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Lỗi server khi lấy danh sách món" })
  }
}


//
export const placeOrder = async(req , res)=>{
    try {
        const {tableId , items} = req.body

        //check table
        const table = await Table.findById(tableId)
        if(!table){
            return res.status(404).json({message:"bàn không tồn tại"})
        }

        const totalAmount = items.reduce((sum ,item)=> sum + item.price * item.quantity ,0)

        const order = await Order.create({
            table:tableId,
            item:items,
            totalAmount
        })

        await Table.findByIdAndUpdate(tableId , {status:"occupied"})

        const populatedOrder = await Order.findById(order._id)
            .populate('table', 'tableNumber')
            .populate('item.menuItem', 'name')

        //emit realtie
        io.emit('new_order',order)

        res.status(201).json({ message: 'Đặt món thành công', order })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}