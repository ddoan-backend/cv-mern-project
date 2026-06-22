import api from "../lib/axios.js";

export const getOrders = async () => {
    const res = await api.get("/custommer/orders")
    return res.data
}

export const updateOrderStatus = async (orderId, status) => {
    const res = await api.patch(`/custommer/orders/${orderId}/status`, { status })
    return res.data
}