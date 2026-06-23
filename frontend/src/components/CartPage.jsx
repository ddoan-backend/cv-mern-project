import { X, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/Context/Cart/UseCart.js"
import api from "@/lib/axios.js"
import { useSearchParams } from "react-router"
import { toast } from "sonner"



export default function CartDrawer({ open  ,onClose }) {
  const {cart,descreseQuantity ,inscreaseQauntity ,remove , clearCart} = useCart()
  const [searchParams] = useSearchParams()
  const tableId = searchParams.get('tableId')
  const totalPrice = cart.reduce((sum , item) =>sum + item.price * item.quantity,0)

  //handle gọi món
  const handlePlaceOrder = async()=>{
    console.log('tableId:', tableId)
    console.log('cart:', cart)
    if(!tableId) return alert("không tìm thấy bàn")
    if(cart.length === 0) return toast.error("giỏ hàng trống")


    try {
      const items =cart.map(item =>({
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price,
      }))

      await api.post('/custommer/place-order',{tableId,items})

      toast.success("Đặt món thành công !")
      clearCart()
      onClose()
      
    } catch (error) {
      toast.error("Đặt món thất bại !!")
            console.error(error)
    }
  }

  return (
    <>
      {/* Overlay */}
      {open && (<div className="fixed inset-0 bg-black/40 z-20 " onClick={onClose} />)}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-30 flex flex-col shadow-xl transition-transform duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-bold">Giỏ hàng</h2>
          <button className="p-1 rounded-lg hover:bg-gray-100" onClick={onClose} >
            <X size={20} />
          </button>
        </div>

        {/* Danh sách món */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

          {/* Cart Item */}
          {cart.map(car=>(
            <div key={car.id} className="flex gap-3 items-center">
            <img
              src={car.image || "https://placehold.co/80x80/orange/white?text=Cơm"}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{car.name}</p>
              <p className="text-orange-500 text-sm">{`${car.price.toLocaleString("vi-VN")}đ`}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 rounded-full border flex items-center justify-center"
              onClick={() => descreseQuantity(car.id)}
              >
                <Minus size={12} />
              </button>
              <span className="text-sm w-4 text-center">{car.quantity}</span>
              <button className="w-7 h-7 rounded-full border flex items-center justify-center"
              onClick={()=> inscreaseQauntity(car.id)}
              >
                <Plus size={12} />
              </button>
            </div>
            <button className="text-red-400 ml-1"
            onClick={()=> remove(car.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
          ))}

          

        </div>

        {/* Footer */}
        <div className="border-t px-5 py-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-sm">Tổng tiền</span>
            <span className="text-xl font-bold text-orange-500">{totalPrice.toLocaleString("vi-VN")}đ</span>
          </div>
          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium"
          onClick={handlePlaceOrder}
          >
            Đặt món
          </button>
        </div>

      </div>
    </>
  )
}