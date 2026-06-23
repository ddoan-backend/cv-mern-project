import express from 'express'
import Table from '../models/table.js'

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
export default router