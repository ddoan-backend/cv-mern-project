import { ArrowLeft, TrendingUp, ShoppingBag, Calendar } from "lucide-react"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { getRevenue, getOrderHistory } from "@/Api/OrderApi.jsx"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function RevenuePage() {
    const navigate = useNavigate()
    const [revenue, setRevenue] = useState({ day: 0, week: 0, month: 0, chart: [] })
    const [history, setHistory] = useState([])

    useEffect(() => {
        getRevenue().then(setRevenue)
        getOrderHistory().then(setHistory)
    }, [])

    const chartData = revenue.chart.map(item => ({
        date: item._id.slice(5), // MM-DD
        total: item.total
    }))

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <ArrowLeft size={20} className="cursor-pointer" onClick={() => navigate("/dashboard")} />
                <h1 className="text-2xl font-bold">Doanh thu</h1>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <Calendar size={16} />
                        Hôm nay
                    </div>
                    <p className="text-2xl font-bold text-orange-500">{revenue.day.toLocaleString("vi-VN")}đ</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <TrendingUp size={16} />
                        Tuần này
                    </div>
                    <p className="text-2xl font-bold text-orange-500">{revenue.week.toLocaleString("vi-VN")}đ</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <ShoppingBag size={16} />
                        Tháng này
                    </div>
                    <p className="text-2xl font-bold text-orange-500">{revenue.month.toLocaleString("vi-VN")}đ</p>
                </div>
            </div>

            {/* Biểu đồ */}
            <div className="bg-white rounded-xl shadow p-5 mb-6">
                <h2 className="font-semibold mb-4">Doanh thu 7 ngày</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                        <Tooltip formatter={(v) => `${v.toLocaleString("vi-VN")}đ`} />
                        <Bar dataKey="total" fill="#f97316" radius={[4,4,0,0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Lịch sử order */}
            <div className="bg-white rounded-xl shadow p-5">
                <h2 className="font-semibold mb-4">Lịch sử thanh toán</h2>
                <div className="flex flex-col gap-3">
                    {history.map(order => (
                        <div key={order._id} className="flex items-center justify-between border-b pb-3 last:border-0">
                            <div>
                                <p className="font-medium">Bàn {order.table?.tableNumber}</p>
                                <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleString("vi-VN")}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-orange-500">{order.totalAmount.toLocaleString("vi-VN")}đ</p>
                                <p className="text-xs text-gray-400">{order.item.length} món</p>
                            </div>
                        </div>
                    ))}
                    {history.length === 0 && (
                        <p className="text-gray-400 text-sm">Chưa có đơn nào</p>
                    )}
                </div>
            </div>
        </div>
    )
}