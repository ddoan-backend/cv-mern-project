import { Search, ShoppingCart} from "lucide-react"
import ListFood from "@/components/ListFood"
import { useState  } from "react"
import CartDrawer from "../components/CartPage.jsx"
import { useMainMenu } from "@/Context/MainMenu/UseMainMenu.js"
import { useCart } from "@/Context/Cart/UseCart.js"

export default function OrdersPage() {
  const [openCart , setOpenCart] = useState(false)
  const {categories , search ,setSearch ,category , setCategory} = useMainMenu()
  const {cart} = useCart()
  const totalItem = cart.reduce((sum , item) => sum + item.quantity,0)
  const totalPrice = cart.reduce((sum , item) => sum + item.quantity * item.price ,0)
  //handle open card
  return (
  <div className="min-h-screen bg-gray-100 flex justify-center">
    <div className="w-full max-w-[430px] bg-gray-50 min-h-screen flex flex-col">
      
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold">Thực đơn</h1>
          <p className="text-sm text-gray-500">Chúc bạn ngon miệng!!</p>
        </div>
        <button 
          className="relative bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setOpenCart(true)}
        >
          <ShoppingCart size={18} />
          <span>Giỏ hàng</span>
          {totalItem > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItem}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-4 flex-1">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg bg-white text-sm outline-none"
            placeholder="Tìm món..."
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap transition-colors ${
                category === cat
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid món ăn */}
        <div className="grid grid-cols-2 gap-4">
          <ListFood />
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Tổng: {totalItem} món</p>
          <p className="font-bold text-lg text-orange-500">
            {totalPrice.toLocaleString("vi-VN")}đ
          </p>
        </div>
        <button 
          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium"
          onClick={() => setOpenCart(true)}
        >
          Đặt món
        </button>
      </div>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </div>
  </div>
)
}