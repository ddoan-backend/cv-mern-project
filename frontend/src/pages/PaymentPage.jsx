import { ArrowLeft, Users, Minus, Plus } from "lucide-react"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { getBillByTable, checkout, getOccupiedTables } from "@/Api/OrderApi.jsx"
import { io } from "socket.io-client"

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:3000")

export default function PaymentPage() {
    // popup payment
    const handlePrint = () => {
    if (!order) return

    const billHTML = `
        <html>
        <head>
            <title>Bill - Bàn ${order.table?.tableNumber}</title>
            <style>
                body { font-family: monospace; width: 280px; margin: 0 auto; padding: 16px; }
                h2 { text-align: center; margin-bottom: 4px; }
                p { text-align: center; font-size: 12px; color: #666; margin: 0 0 12px; }
                .divider { border-top: 1px dashed #000; margin: 8px 0; }
                .item { display: flex; justify-content: space-between; font-size: 13px; margin: 4px 0; }
                .total { display: flex; justify-content: space-between; font-weight: bold; font-size: 15px; margin-top: 8px; }
                .thanks { text-align: center; font-size: 12px; margin-top: 12px; }
            </style>
        </head>
        <body>
            <h2>HÓA ĐƠN</h2>
            <p>Bàn ${order.table?.tableNumber} • ${new Date(order.createdAt).toLocaleString("vi-VN")}</p>
            <div class="divider"></div>
            ${order.item.map(i => `
                <div class="item">
                    <span>${i.menuItem?.name ?? 'Món ăn'} x${i.quantity}</span>
                    <span>${(i.price * i.quantity).toLocaleString("vi-VN")}đ</span>
                </div>
            `).join('')}
            <div class="divider"></div>
            <div class="total">
                <span>Tổng cộng</span>
                <span>${totalAmount.toLocaleString("vi-VN")}đ</span>
            </div>
            <p class="thanks">Cảm ơn quý khách!</p>
        </body>
        </html>
    `

    const popup = window.open('', '_blank', 'width=320,height=500')
    popup.document.write(billHTML)
    popup.document.close()
    popup.print()
}

    const navigate = useNavigate()
    const [tables, setTables] = useState([])
    const [selectedTable, setSelectedTable] = useState(null)
    const [order, setOrder] = useState(null)
    const [showConfirm , setShowConfirm] = useState(false)

    // Lấy danh sách bàn
    useEffect(() => {
    getOccupiedTables().then(setTables)

    socket.on('new_order', () => {
        getOccupiedTables().then(setTables)
    })
    return () => socket.off('new_order')
}, [])

    // Lấy bill khi chọn bàn
    const handleSelectTable = async (table) => {
        console.log('table:', table)
        setSelectedTable(table)
        const bill = await getBillByTable(table._id)
        console.log('full bill:', JSON.stringify(bill))
        setOrder(bill)
    }

    // Điều chỉnh số lượng
    const handleAdjust = (itemId, delta) => {
        setOrder(prev => ({
            ...prev,
            item: prev.item
                .map(i => i._id === itemId ? { ...i, quantity: i.quantity + delta } : i)
                .filter(i => i.quantity > 0)
        }))
    }

    const totalAmount = order?.item.reduce((sum, i) => sum + i.price * i.quantity, 0) ?? 0

    // Thanh toán
    const handleCheckout = async () => {
        if (!order) return
        await checkout(order._id, order.item)
        alert('Thanh toán thành công!')
        setOrder(null)
        setSelectedTable(null)
        const updated = await getOccupiedTables()
        setTables(updated)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <ArrowLeft size={20} className="cursor-pointer" onClick={() => navigate("/dashboard")} />
                <h1 className="text-2xl font-bold">Thanh toán</h1>
            </div>

            <div className="flex gap-6">
                {/* Danh sách bàn */}
                <div className="w-1/3">
                    <h2 className="font-semibold text-gray-600 mb-3">Bàn đang có khách</h2>
                    <div className="flex flex-col gap-3">
                        {tables.map(table => (
                            <div
                                key={table._id}
                                onClick={() => handleSelectTable(table)}
                                className={`bg-white rounded-xl p-4 shadow cursor-pointer border-2 transition-colors
                                    ${selectedTable?._id === table._id ? 'border-orange-400' : 'border-transparent'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users size={18} className="text-orange-500" />
                                        <span className="font-bold">Bàn {table.tableNumber}</span>
                                    </div>
                                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                        Đang dùng
                                    </span>
                                </div>
                            </div>
                        ))}

                        {tables.length === 0 && (
                            <p className="text-gray-400 text-sm">Không có bàn nào đang dùng</p>
                        )}
                    </div>
                </div>

                {/* Bill chi tiết */}
                <div className="flex-1 bg-white rounded-xl shadow p-6">
                    {!order ? (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            Chọn bàn để xem bill
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Bill - Bàn {order.table?.tableNumber}</h2>
                                <span className="text-sm text-gray-400">
                                    {new Date(order.createdAt).toLocaleString("vi-VN")}
                                </span>
                            </div>

                            {/* Danh sách món */}
                            <div className="flex flex-col gap-4 mb-6">
                                {order.item.map(i => (
                                    <div key={i._id} className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium">{i.menuItem?.name ?? 'Món ăn'}</p>
                                            <p className="text-sm text-gray-400">{i.price.toLocaleString("vi-VN")}đ / món</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleAdjust(i._id, -1)}
                                                className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-600"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-6 text-center font-medium">{i.quantity}</span>
                                            <button
                                                onClick={() => handleAdjust(i._id, 1)}
                                                className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-600"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <p className="w-24 text-right font-medium">
                                            {(i.price * i.quantity).toLocaleString("vi-VN")}đ
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 flex flex-col gap-2 mb-6">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Tổng cộng</span>
                                    <span className="text-orange-500">{totalAmount.toLocaleString("vi-VN")}đ</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-medium"
                                onClick={handlePrint}
                                >
                                    In bill
                                </button>
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-medium"
                                >
                                    Xác nhận thanh toán
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* Modal xác nhận */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
                        <h3 className="text-lg font-bold mb-2">Xác nhận thanh toán</h3>
                        <p className="text-gray-500 text-sm mb-1">Bàn {order?.table?.tableNumber}</p>
                        <p className="text-orange-500 font-bold text-xl mb-6">
                            {totalAmount.toLocaleString("vi-VN")}đ
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-xl"
                            >
                                Huỷ
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirm(false)
                                    handleCheckout()
                                }}
                                className="flex-1 bg-orange-500 text-white py-2 rounded-xl font-medium"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
        
    )
}