import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import authRoute from './routes/authRoutes.js'
import staffRoute from './routes/staffRoutes.js'
import MenuRoute from './routes/MenuRoutes.js'
import TableRoute from './routes/TableRoutes.js'
import CustommerRoute from './routes/OrderCustomer.js'
import cookiePaser from 'cookie-parser'
import { protectdRoute } from './middlewares/authMiddlewares.js'
import AdminOrderRoute from './routes/AdminRoutes.js'
import { createServer } from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
dotenv.config()
const app = express()
const httpServer = createServer(app)

export const io = new Server(httpServer ,{
    cors:{
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
        credentials: true
    }
})
const PORT = process.env.PORT || 3000


//middlewares
app.use(express.json())
app.use(cookiePaser())
app.use(cors({origin:process.env.CLIENT_URL , credentials:true}))

//socket
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
    })
})

//public route
app.use('/api/auth' , authRoute)
app.use('/api/staff' , staffRoute)
app.use('/api/menu' , MenuRoute)
app.use('/api/table', TableRoute)
app.use('/api/custommer',CustommerRoute)
app.use('/api/admin/order', AdminOrderRoute)
//private route
app.get('/api/me', protectdRoute, (req, res) => {
    res.status(200).json(req.user)
})
// connect database before listen POrt
connectDB().then(()=>{
httpServer.listen(PORT , () =>{
    console.log(`server bat dau o cong ${PORT}`)
})
})

