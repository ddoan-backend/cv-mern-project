import express from 'express'
import { getRevenue, getOrderHistory } from '../controllers/OrderCusController.js'
import { VerifyAdmin , protectdRoute } from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.get('/revenue', protectdRoute,VerifyAdmin, getRevenue)
router.get('/history',protectdRoute, VerifyAdmin, getOrderHistory)

export default router