import express from 'express'
import { signIn, signOut } from '../controllers/authControllers.js'

const router = express.Router()
//route sign in
router.post("/signin" , signIn)
//route sign out
router.post("/signout" , signOut)

export default router