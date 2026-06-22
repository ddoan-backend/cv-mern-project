// src/context/menu/MainMenuContext.jsx
import { useEffect, useMemo, useState } from "react"
import api from "@/lib/axios.js"
import { MainMenuContext } from "./MainMenuContext.js"



export function MainMenuProvider({ children }) {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search , setSearch] = useState("")
  const [category , setCategory] = useState("Tất Cả")

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await api.get("/custommer")

        const normalized = res.data.data.map((item) => ({
          ...item,
          id: item._id,
        }))

        setFoods(normalized)
      } catch (err) {
        console.error("Lỗi gọi API:", err)              // 👈 thêm dòng này
  console.error("Response:", err.response)
        setError(err.response?.data?.message || "Không tải được danh sách món")
      } finally {
        setLoading(false)
      }
    }
    fetchFood()
  }, [])

  //danh sach category
  const categories = useMemo(()=>{
     return [
      "Tất Cả",
      "Ăn Vặt",
      "Món Nhậu",
      "Đồ Uống"
    ]
  },[foods])

  //filter category and search
  const filteredFoods = useMemo(()=>{
    return foods.filter((food) =>{
      const matchCategory = category === "Tất Cả" || food.category === category

      const matchSearch = food.name.toLowerCase().includes(search.toLowerCase().trim())
      return matchCategory && matchSearch
    })
  } ,[foods , category , search])

  const value = { foods, loading, error , filteredFoods , categories ,search ,setSearch,category , setCategory  }

  return <MainMenuContext.Provider value={value}>{children}</MainMenuContext.Provider>
}