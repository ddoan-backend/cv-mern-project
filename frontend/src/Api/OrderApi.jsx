import api from "../lib/axios.js";
//get order
export const getOrders = async () => {
    const res = await api.get("/custommer/orders")
    return res.data
}
//update order
export const updateOrderStatus = async (orderId, status) => {
    const res = await api.patch(`/custommer/orders/${orderId}/status`, { status })
    return res.data
}
//get bill
export const getBillByTable = async (tableId) => {
    const res = await api.get(`/custommer/bill/${tableId}`)
    return res.data
}

export const checkout = async (orderId, items) => {
    const res = await api.patch(`/custommer/checkout/${orderId}`, { items })
    return res.data
}
//list occpu
export const getOccupiedTables = async () => {
    const res = await api.get('/table/occupied')
    return res.data
}
//list reven
export const getRevenue = async () => {
    const res = await api.get('/admin/order/revenue')
    return res.data
}
//list histoty
export const getOrderHistory = async () => {
    const res = await api.get('/admin/order/history')
    return res.data
}
//get kichen order
export const getKitchenOrders = async () => {
    const res = await api.get("/admin/order/kitchen");
    return res.data;
};

// change food
export const updateOrderItems = async (orderId, items) => {
    const res = await api.patch(`/custommer/orders/${orderId}/items`, { items })
    return res.data
}