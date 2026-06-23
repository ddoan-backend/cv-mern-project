import { Plus } from "lucide-react"
import { useMainMenu } from "@/Context/MainMenu/UseMainMenu.js"
import { useCart } from "@/Context/Cart/UseCart.js"

function ListFood() {
    const {filteredFoods , loading , error} = useMainMenu()
    const { addToCart} = useCart()

    if(loading) return <p>dang tai mon ...</p>
    if(error) return <p className="text-red-500">{error}</p>
  return (
    <>
    {filteredFoods.map((food)=>(
        <div key={food._id} className="bg-white rounded-xl overflow-hidden border hover:shadow-md transition-shadow">
              <img
                src={ food.image || `https://placehold.co/300x200/orange/white?text=Món+`}
                alt="món ăn"
                className="w-full h-36 object-cover"
              />
              <div className="p-3">
                <p className="font-medium text-sm mb-1 min-h-[48px]">{food.name}</p>
                <p className="text-orange-500 text-sm font-semibold mb-3">{`${food.price.toLocaleString("vi-VN")}đ`}</p>
                <button className="w-full flex items-center justify-center gap-1 bg-orange-500 text-white text-sm py-1.5 rounded-lg"
                onClick={()=>addToCart(food)}
                >
                  <Plus size={14} />
                  Thêm vào giỏ
                </button>
              </div>
            </div>
    ))}
    </>
  )
}

export default ListFood