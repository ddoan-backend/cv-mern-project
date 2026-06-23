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
export const placeOrder = async (req, res) => {
    try {
        const { tableId, items } = req.body

        const table = await Table.findById(tableId)
        if (!table) {
            return res.status(404).json({ message: "bàn không tồn tại" })
        }

        // Kiểm tra bàn đã có order chưa
        const existingOrder = await Order.findOne({
            table: tableId,
            status: { $in: ['pending', 'comfirmed'] }
        })

        if (existingOrder) {
            // Gộp items vào order cũ
            items.forEach(newItem => {
                const existed = existingOrder.item.find(i =>
                    i.menuItem.toString() === newItem.menuItem
                )
                if (existed) {
                    existed.quantity += newItem.quantity
                } else {
                    existingOrder.item.push(newItem)
                }
            })
            existingOrder.totalAmount += items.reduce((sum, i) => sum + i.price * i.quantity, 0)
            await existingOrder.save()

            const populated = await Order.findById(existingOrder._id)
                .populate('table', 'tableNumber')
                .populate('item.menuItem', 'name')

            io.emit('new_order', populated)
            return res.status(200).json({ message: 'Thêm món thành công', order: populated })
        }

        // Tạo order mới
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

        const order = await Order.create({
            table: tableId,
            item: items,
            totalAmount
        })

        await Table.findByIdAndUpdate(tableId, { status: "occupied" })

        const populatedOrder = await Order.findById(order._id)
            .populate('table', 'tableNumber')
            .populate('item.menuItem', 'name')

        io.emit('new_order', populatedOrder)

        res.status(201).json({ message: 'Đặt món thành công', order: populatedOrder })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Lấy bill theo bàn
export const getBillByTable = async (req, res) => {
    try {
        const { tableId } = req.params

        const order = await Order.findOne({
            table: tableId,
            status: { $in: ['pending', 'comfirmed' ,'done'] }
        })
        .populate('table', 'tableNumber')
        .populate('item.menuItem', 'name')

        if (!order) return res.status(404).json({ message: 'Không có đơn nào' })

        res.json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Thanh toán
export const checkout = async (req, res) => {
    try {
        const { orderId } = req.params
        const { items } = req.body // items đã điều chỉnh từ frontend

        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status: 'done', item: items, totalAmount },
            { new: true }
        )

        // Bàn về available
        await Table.findByIdAndUpdate(order.table, { status: 'available' })

        res.json({ message: 'Thanh toán thành công', order })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}