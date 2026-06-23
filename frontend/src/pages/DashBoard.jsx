import { useNavigate } from 'react-router'
import { LogOut, ShoppingBag, BarChart2, Users, UtensilsCrossed,ReceiptText ,QrCode } from 'lucide-react'
import api from '@/lib/axios.js'
import { useEffect ,useState } from 'react'
import { getRevenue } from '@/Api/OrderApi.jsx'
import { io } from "socket.io-client"
import { toast } from 'sonner'

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:3000")
export default function Dashboard() {
  const navigate = useNavigate()
    const role = localStorage.getItem("role")
    const name = localStorage.getItem("name")
    const [revenue, setRevenue] = useState({ day: 0 })
    const [occupiedTables, setOccupiedTables] = useState(0)
    const [totalTables, setTotalTables] = useState(0)
    const [pendingOrders, setPendingOrders] = useState(0)

    useEffect(() => {
    if (role === 'admin') getRevenue().then(setRevenue)
    
    const fetchStats = () => {
        api.get('/table/occupied').then(res => setOccupiedTables(res.data.length))
        api.get('/table/all').then(res => setTotalTables(res.data.length))
        api.get('/custommer/orders').then(res => {
            const pending = res.data.filter(o => o.status === 'pending' || o.status === 'comfirmed')
            setPendingOrders(pending.length)
        })
    }

    fetchStats() // render

    // Realtime for new order
    socket.on('new_order', () => {
        fetchStats()
        if (role === 'admin') getRevenue().then(setRevenue)
    })

    // Realtime for done
    socket.on('order_done', () => {
        fetchStats()
        if (role === 'admin') getRevenue().then(setRevenue)
    })

    return () => {
        socket.off('new_order')
        socket.off('order_done')
    }
}, [])

//handle signout
  const handleSignOut = async () => {
  try {
    await api.post("/auth/signout")
  } catch (error) {
    console.error(error)
  } finally {
    localStorage.clear()
    navigate("/signin")
  }
  toast.success("Đã đăng xuất ")
}

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Xin chào, {name ?? "Nhân viên"}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-red-500 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </div>

      {/* Admin */}
      {role === "admin" && (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Doanh thu hôm nay</p>
            <p className="text-3xl font-bold mt-1">{revenue.day.toLocaleString("vi-VN")}đ</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Bàn đang phục vụ</p>
            <p className="text-3xl font-bold mt-1">{occupiedTables}/{totalTables}</p>
            <p className="text-gray-400 text-sm mt-1">{totalTables - occupiedTables} bàn còn trống</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Đơn đang chờ</p>
            <p className="text-3xl font-bold mt-1">{pendingOrders}</p>
            <p className="text-orange-500 text-sm mt-1">Cần xử lý</p>
        </div>
    </div>
      )}
      {/* staff */}
      {role === "staff" && (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Bàn đang phục vụ</p>
            <p className="text-3xl font-bold mt-1">{occupiedTables}/{totalTables}</p>
            <p className="text-gray-400 text-sm mt-1">{totalTables - occupiedTables} bàn còn trống</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Đơn đang chờ</p>
            <p className="text-3xl font-bold mt-1">{pendingOrders}</p>
            <p className="text-orange-500 text-sm mt-1">Cần xử lý</p>
        </div>
    </div>
      )}

      {/* Menu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div
          onClick={() => navigate("/dashboard/kitchen")}
          className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer flex items-center gap-4"
        >
          <div className="bg-orange-100 p-3 rounded-lg">
            <ShoppingBag size={24} className="text-orange-500" />
          </div>
          <div>
            <p className="font-semibold" onClick={()=>navigate("/order")}>Đơn Hàng</p>
            <p className="text-sm text-gray-500">Quản lý order</p>
          </div>
        </div>

        {role === "admin" && (
          <>
            <div
              onClick={() => navigate("/dashboard/revenue")}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer flex items-center gap-4"
            >
              <div className="bg-green-100 p-3 rounded-lg">
                <BarChart2 size={24} className="text-green-500" />
              </div>
              <div>
                <p className="font-semibold">Doanh Thu</p>
                <p className="text-sm text-gray-500">Thống kê thu nhập</p>
              </div>
            </div>

            <div
              onClick={() => navigate("/dashboard/staff")}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer flex items-center gap-4"
            >
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users size={24} className="text-purple-500" />
              </div>
              <div>
                <p className="font-semibold">Nhân Viên</p>
                <p className="text-sm text-gray-500">Quản lý nhân sự</p>
              </div>
            </div>

            <div
              onClick={() => navigate("/dashboard/menu")}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer flex items-center gap-4"
            >
              <div className="bg-yellow-100 p-3 rounded-lg">
                <UtensilsCrossed size={24} className="text-yellow-500" />
              </div>
              <div>
                <p className="font-semibold">Món Ăn</p>
                <p className="text-sm text-gray-500">Quản lý thực đơn</p>
              </div> 
            </div>

            <div
          onClick={() => navigate("/dashboard/payment")}
          className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer flex items-center gap-4"
        >
          <div className="bg-blue-100 p-3 rounded-lg">
            <ReceiptText size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="font-semibold">Thanh Toán</p>
            <p className="text-sm text-gray-500">Quản Lý Hóa Đơn</p>
          </div>
        </div>

        <div
          onClick={() => navigate("/dashboard/table")}
          className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer flex items-center gap-4">
        <div className="bg-teal-100 p-3 rounded-lg">
        <QrCode size={24} className="text-teal-500" />
        </div>
        <div>
        <p className="font-semibold">Quản lý bàn</p>
        <p className="text-sm text-gray-500">Tạo & quản lý QR bàn</p>
        </div>
      </div>

          </>
        )}

      </div>
    </div>
  )
}