import { ArrowLeft, Plus, QrCode, Trash2 } from "lucide-react"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import api from "@/lib/axios.js"

export default function TablePage() {
    const navigate = useNavigate()
    const [tables, setTables] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [tableNumber, setTableNumber] = useState('')
    const [capacity, setCapacity] = useState(4)
    const [selectedQR, setSelectedQR] = useState(null)

    useEffect(() => {
        api.get('/table/all').then(res => setTables(res.data))
    }, [])
    //create table
    const handleCreate = async () => {
        if (!tableNumber) return toast.error('Nhập số bàn!')
        try {
            const res = await api.post('/table/create', { tableNumber: Number(tableNumber), capacity: Number(capacity) })
            setTables(prev => [...prev, res.data.table])
            setShowAdd(false)
            setTableNumber('')
            toast.success('Tạo bàn thành công!')
        } catch (error) {
            toast.error(error.response?.data?.message ?? 'Tạo bàn thất bại!')
        }
    }
    //delete table
    const handleDelete = async (id) => {
        toast('Xác nhận xóa bàn này?', {
            action: {
                label: 'Xóa',
                onClick: async () => {
                    await api.delete(`/table/${id}`)
                    setTables(prev => prev.filter(t => t._id !== id))
                    toast.success('Xóa bàn thành công!')
                }
            },
            cancel: { label: 'Huỷ' }
        })
    }
    //down QR
    const handleDownloadQR = (table) => {
        const link = document.createElement('a')
        link.href = table.qrCode
        link.download = `ban-${table.tableNumber}-qr.png`
        link.click()
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <ArrowLeft size={20} className="cursor-pointer" onClick={() => navigate("/dashboard")} />
                    <h1 className="text-2xl font-bold">Quản lý bàn</h1>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg"
                >
                    <Plus size={16} />
                    Thêm bàn
                </button>
            </div>

            {/* Danh sách bàn */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {tables.map(table => (
                    <div key={table._id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-lg">Bàn {table.tableNumber}</h2>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                table.status === 'occupied' 
                                ? 'bg-orange-100 text-orange-600' 
                                : 'bg-green-100 text-green-600'
                            }`}>
                                {table.status === 'occupied' ? 'Đang dùng' : 'Trống'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400">{table.capacity} người</p>

                        {/* QR */}
                        {table.qrCode && (
                            <img
                                src={table.qrCode}
                                className="w-full rounded-lg cursor-pointer"
                                onClick={() => setSelectedQR(table)}
                            />
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleDownloadQR(table)}
                                className="flex-1 flex items-center justify-center gap-1 border border-gray-300 text-gray-600 py-1.5 rounded-lg text-sm"
                            >
                                <QrCode size={14} />
                                Tải QR
                            </button>
                            <button
                                onClick={() => handleDelete(table._id)}
                                className="text-red-400 px-3 py-1.5 rounded-lg border border-red-200"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal thêm bàn */}
            {showAdd && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
                        <h3 className="text-lg font-bold mb-4">Thêm bàn mới</h3>
                        <div className="flex flex-col gap-3 mb-4">
                            <input
                                type="number"
                                placeholder="Số bàn"
                                value={tableNumber}
                                onChange={e => setTableNumber(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm outline-none"
                            />
                            <input
                                type="number"
                                placeholder="Sức chứa"
                                value={capacity}
                                onChange={e => setCapacity(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm outline-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAdd(false)}
                                className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-xl"
                            >
                                Huỷ
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 bg-orange-500 text-white py-2 rounded-xl font-medium"
                            >
                                Tạo bàn
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal xem QR lớn */}
            {selectedQR && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                    onClick={() => setSelectedQR(null)}
                >
                    <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3">
                        <h3 className="font-bold text-lg">Bàn {selectedQR.tableNumber}</h3>
                        <img src={selectedQR.qrCode} className="w-64 h-64" />
                        <button
                            onClick={() => handleDownloadQR(selectedQR)}
                            className="bg-orange-500 text-white px-6 py-2 rounded-xl"
                        >
                            Tải xuống
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}