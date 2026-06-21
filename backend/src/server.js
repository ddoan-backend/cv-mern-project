import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import authRoute from './routes/authRoutes.js'
import staffRoute from './routes/staffRoutes.js'
import MenuRoute from './routes/MenuRoutes.js'
import cookiePaser from 'cookie-parser'
import { protectdRoute } from './middlewares/authMiddlewares.js'
import cors from 'cors'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


//middlewares
app.use(express.json())
app.use(cookiePaser())
app.use(cors({origin:process.env.CLIENT_URL , credentials:true}))
//public route
app.use('/api/auth' , authRoute)
app.use('/api/staff' , staffRoute)
app.use('/api/menu' , MenuRoute)
//private route
app.get('/api/me', protectdRoute, (req, res) => {
    res.status(200).json(req.user)
})
// connect database before listen POrt
connectDB().then(()=>{
app.listen(PORT , () =>{
    console.log(`server bat dau o cong ${PORT}`)
})
})

