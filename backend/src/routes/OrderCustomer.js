import express from 'express'
import { VerifyAdmin , protectdRoute } from '../middlewares/authMiddlewares.js'
import {GetFood ,placeOrder} from '../controllers/OrderCusController.js'
import Order from '../models/order.js'
const router = express.Router()


router.get("/", GetFood)
router.post("/place-order" , placeOrder)
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('table', 'tableNumber')
            .populate('item.menuItem', 'name')
            .sort({ createdAt: -1 })
         console.log(JSON.stringify(orders[0]?.item, null, 2))
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export default router
