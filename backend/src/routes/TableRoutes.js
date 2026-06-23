import express from 'express'
import Table from '../models/table.js'
import QRcode from 'qrcode'


const router = express.Router()

router.get('/occupied', async (req, res) => {
    try {
        const tables = await Table.find({ status: 'occupied' })
        res.json(tables)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/all', async (req, res) => {
    try {
        const tables = await Table.find()
        res.json(tables)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/create', async (req, res) => {
    try {
        const { tableNumber, capacity } = req.body

        // check table
        const existed = await Table.findOne({ tableNumber })
        if (existed) return res.status(400).json({ message: 'Số bàn đã tồn tại' })

        // create table
        const table = await Table.create({ tableNumber, capacity })

        // Generate QR 
        const orderUrl = `${process.env.CLIENT_URL}/order?tableId=${table._id}`
        const qrCode = await QRcode.toDataURL(orderUrl)

        // save QR
        table.qrCode = qrCode
        await table.save()

        res.status(201).json({ message: 'Tạo bàn thành công', table })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//delete table
router.delete('/:id', async (req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id)
        res.json({ message: 'Xóa bàn thành công' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export default router