import express from 'express'
import { VerifyAdmin , protectdRoute } from '../middlewares/authMiddlewares.js'
import {GetFood ,placeOrder , getBillByTable , checkout ,getRevenue , getOrderHistory , getKitchenOrders} from '../controllers/OrderCusController.js'
import Order from '../models/order.js'
import { io } from '../server.js'
const router = express.Router()


router.get("/", GetFood)
router.get('/kitchen', getKitchenOrders)
router.post("/place-order" , placeOrder)
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({ status: { $in: ['pending', 'comfirmed'] } })
            .populate('table', 'tableNumber')
            .populate('item.menuItem', 'name')
            .sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.patch('/orders/:id/status', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )

        // Emit khi done
        if (req.body.status === 'done') {
            io.emit('order_done', { orderId: order._id })
        }

        res.json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//change foood
router.patch('/orders/:id/items', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { item: req.body.items },
            { new: true }
        )
        .populate('table', 'tableNumber')
        .populate('item.menuItem', 'name')

        // Emit kitchen
        io.emit('order_updated', order)

        res.json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.get('/bill/:tableId', getBillByTable)
router.patch('/checkout/:orderId', checkout)


export default router
