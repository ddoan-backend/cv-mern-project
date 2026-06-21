import express, { Router } from 'express'
import { VerifyAdmin ,protectdRoute} from '../middlewares/authMiddlewares.js'
import { CreateStaff , deleteStaff, GetStaff , updateStaff } from '../controllers/StaffController.js'

const router = express.Router()

//create staff
router.post("/",protectdRoute, VerifyAdmin , CreateStaff)
router.get("/",protectdRoute, VerifyAdmin , GetStaff)
router.delete("/:id",protectdRoute,VerifyAdmin,deleteStaff)
router.put("/:id" , protectdRoute,VerifyAdmin,updateStaff)

export default router