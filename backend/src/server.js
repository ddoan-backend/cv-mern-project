import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000


//middlewares
app.use(express.json())


// connect database before listen POrt
connectDB().then(()=>{
app.listen(PORT , () =>{
    console.log(`server bat dau o cong ${PORT}`)
})
})

