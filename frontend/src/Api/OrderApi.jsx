import api from "../lib/axios.js";

export const getOrders = async () => {
    const res = await api.get("/custommer/orders")
    return res.data
}

export const updateOrderStatus = async (orderId, status) => {
    const res = await api.patch(`/custommer/orders/${orderId}/status`, { status })
    return res.data
}

export const getBillByTable = async (tableId) => {
    const res = await api.get(`/custommer/bill/${tableId}`)
    return res.data
}

export const checkout = async (orderId, items) => {
    const res = await api.patch(`/custommer/checkout/${orderId}`, { items })
    return res.data
}

export const getOccupiedTables = async () => {
    const res = await api.get('/table/occupied')
    return res.data
}