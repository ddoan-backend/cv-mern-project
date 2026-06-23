import express from 'express'
import { getRevenue, getOrderHistory ,getKitchenOrders } from '../controllers/OrderCusController.js'
import { VerifyAdmin , protectdRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.get('/revenue', protectdRoute,VerifyAdmin, getRevenue)
router.get('/history',protectdRoute, VerifyAdmin, getOrderHistory)
router.get('/kitchen', protectdRoute, getKitchenOrders) 

export default router