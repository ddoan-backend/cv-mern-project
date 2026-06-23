import { CheckCircle, Clock, ChefHat, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { updateOrderStatus } from "../Api/OrderApi.jsx"

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:3000")

const borderColor = {
    pending: "border-yellow-400",
    comfirmed: "border-blue-400",
    done: "border-green-400"
}

export default function KitchenPage() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])

    // Fetch orders khi load
    useEffect(() => {
    socket.on('order_done', ({ orderId }) => {
        setOrders(prev => prev.filter(o => o._id !== orderId))
    })
    return () => socket.off('order_done')
}, [])

    // Lắng nghe order mới
    useEffect(() => {
        socket.on('new_order', (order) => {
            setOrders(prev => [order, ...prev])
        })
        return () => socket.off('new_order')
    }, [])

    const handleUpdateStatus = async (orderId, status) => {
        await updateOrderStatus(orderId, status)
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o))

        if(status === 'done'){
            setTimeout(() => {
                setOrders(prev => prev.filter(o => o._id !== orderId))
            }, 5000);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <ArrowLeft size={20} onClick={() => navigate("/dashboard")} />
                <ChefHat size={28} className="text-orange-500" />
                <h1 className="text-2xl font-bold">Đơn Món</h1>
            </div>

            {/* Grid đơn hàng */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {orders.map(order => (
                    <div key={order._id} className={`bg-white rounded-xl shadow p-5 border-l-4 ${borderColor[order.status]}`}>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-bold">Bàn {order.table?.tableNumber ?? '?'}</h2>
                            <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : order.status === 'comfirmed' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                <Clock size={12} />
                                {order.status === 'pending' ? 'Chờ xác nhận' : order.status === 'comfirmed' ? 'Đang làm' : 'Hoàn thành'}
                            </span>
                        </div>

                        <p className="text-xs text-gray-400 mb-3">
                            {new Date(order.createdAt).toLocaleTimeString("vi-VN")} — {order.item.length} món
                        </p>

                        <ul className="flex flex-col gap-2 mb-4">
                            {order.item.map((i, idx) => (
                                <li key={idx} className="flex justify-between text-sm">
                                    <span>{i.menuItem?.name ?? 'Món ăn'}</span>
                                    <span className="font-medium">x{i.quantity}</span>
                                </li>
                            ))}
                        </ul>

                        {order.status === 'pending' && (
                            <button
                                onClick={() => handleUpdateStatus(order._id, 'comfirmed')}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg text-sm font-medium"
                            >
                                Xác nhận — bắt đầu nấu
                            </button>
                        )}
                        {order.status === 'comfirmed' && (
                            <button
                                onClick={() => handleUpdateStatus(order._id, 'done')}
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium"
                            >
                                Hoàn thành
                            </button>
                        )}
                        {order.status === 'done' && (
                            <div className="flex items-center gap-1 text-green-500 text-sm">
                                <CheckCircle size={16} />
                                Đã hoàn thành
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}