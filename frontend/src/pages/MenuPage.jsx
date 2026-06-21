import ListMenu from "../components/ListMenu.jsx";
import { useNavigate } from "react-router";
import { useState , useEffect } from "react";
import { GetMenu , CreateMenu , DeleteMenu ,UpdateMenu} from "@/Api/MenuApi.jsx";

export default function MenuPage() {
const [listMenu ,setListMenu] = useState([])
const [search , setSearch] = useState("")
const [filterCategory , setFilterCategory] = useState("")
const [showModal , setShowModal] = useState(false)
const [loading , setLoading] = useState(false)
const [editLoading , setEditLoading] = useState(false)
const [showEditForm , setShowEditForm] = useState(false)
const [editForm , setEditForm] = useState({
  name:"",description:"",price:0,category:"",image:"",isAvailable:true
})
const [editFood , setEditFood] = useState(null)
const [form , setForm] = useState({
  name:"",description:"",price:0,category:"Ăn Vặt",image:"",isAvailable:true,
})
const navigate = useNavigate()
//search
const filterdMenu = listMenu.filter((menu)=>{
  const matchCategory = filterCategory?menu.category === filterCategory:true
  const matchSearch = menu.name.toLowerCase().includes(search.toLowerCase())
  return matchCategory && matchSearch
})
//filterd category

//handle get input
const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value})
}
//handel get edit input
const handleEditChange = (e)=>{
  setEditForm({...editForm ,[e.target.name]:e.target.value})
}
//render list menu
useEffect(()=>{
  const getlist = async()=>{
    try {
      const res = await GetMenu()
      setListMenu(res.ListFood)
    } catch (error) {
      console.error(error)
    }
  }
  getlist()
},[])
//handel show modal
const handleShowModal = ()=>{
  setShowModal(true)
}
//handle show edit modal
const handleShowEditModal = (menu)=>{
  setEditFood(menu)
  setEditForm({
    name:menu.name,
    description:menu.description,
    price:menu.price,
    category:menu.category,
    image:"",
    isAvailable:menu.isAvailable
  })
  setShowEditForm(true)
}
//create menu
const handleSubmit = async(e)=>{
  try {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("name" , form.name)
    formData.append("description",form.description)
    formData.append("price", form.price)
    formData.append("category", form.category)
    formData.append("isAvailable", form.isAvailable)

    if (form.image) {
    formData.append("image", form.image)
  }
  const result = await CreateMenu(formData)
     setListMenu((prev) => [...prev, result.food])
    setShowModal(false)
    setForm({ name: "", description: "", price: 0, category: "snack", image: "", isAvailable: true })
  } catch (error) {
    return console.error(error)
  }finally{
    setLoading(false)
  }
}
//handle delete menu
const handleDelete = async(id)=>{
  const confirm = window.confirm("bạn có chắc muốn xóa món này không ?")
  if(!confirm)return
  await DeleteMenu(id)
  setListMenu(menu => menu.filter(food =>(
    food._id !== id
  )))
}

//update edit menu
const handleEditSubmit = async (e) => {
  try {
    e.preventDefault()
    setEditLoading(true)
    const formData = new FormData()
    formData.append("name", editForm.name)
    formData.append("description", editForm.description)
    formData.append("price", editForm.price)
    formData.append("category", editForm.category)
    formData.append("isAvailable", editForm.isAvailable)
    if (editForm.image) {
      formData.append("image", editForm.image)
    }
    const result = await UpdateMenu(editFood._id, formData)
    setListMenu((prev) => prev.map((menu) =>
      menu._id === editFood._id ? result.food : menu
    ))
    setShowEditForm(false)
  } catch (error) {
    console.error(error)
  }finally{
    setEditLoading(false)
  }
}
  return (
    <div className="h-screen p-6 overflow-hidden">

      {/* Back */}
      <div className="mb-4 text-gray-600 cursor-pointer hover:text-black"
      onClick={()=>navigate("/dashboard")}
      >
        ← Quay lại Dashboard
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Quản lý món ăn</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleShowModal}
        >
          + Thêm món
        </button>
      </div>

      {/* Card */}
      <div className="h-[calc(100vh-180px)] border rounded-xl flex flex-col">

        {/* Search + Filter */}
        <div className="p-4 border-b flex gap-3">
          <input
            placeholder="Tìm kiếm món ăn..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />
          <select className="border rounded-lg px-3"  
          onChange={(e)=>setFilterCategory(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="Ăn Vặt">Ăn Vặt</option>
            <option value="Món Nhậu">Món Nhậu</option>
            <option value="Đồ Uống">Đồ Uống</option>
          </select>
        </div>

        {/* Table Scroll */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white border-b">
              <tr>
                <th className="p-4 text-left">Hình ảnh</th>
                <th className="p-4 text-left">Tên món</th>
                <th className="p-4 text-left">Danh mục</th>
                <th className="p-4 text-left">Giá</th>
                <th className="p-4 text-left">Trạng thái</th>
                <th className="p-4 text-left">Thao tác</th>
              </tr>
            </thead>
              {/* render list */}
              <tbody>
                {filterdMenu.map((menu)=>(
                  <ListMenu key={menu._id} menu={menu} deletefood={handleDelete} editfood={handleShowEditModal}></ListMenu>
                ))}
              </tbody>
            
          </table>
        </div>

        {/* Footer */}
        <div className="border-t p-4 text-gray-500 text-sm">
          Tổng số món: {listMenu.length}
        </div>

      </div>
      {/* Modal thêm món */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Thêm món ăn</h2>
        <button type="button" onClick={() => setShowModal(false)}>x</button>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Tên món</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="Cơm gà..." required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="Mô tả món ăn..." rows={2} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Giá (VNĐ)</label>
          <input name="price" value={form.price} onChange={handleChange} type="number" className="w-full border rounded-lg px-3 py-2" placeholder="90000" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Danh mục</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
            <option value="Ăn Vặt">Ăn Vặt</option>
            <option value="Món Nhậu">Món Nhậu</option>
            <option value="Đồ Uống">Đồ Uống</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hình ảnh</label>
          <input name="image" type="file" accept="image/*" className="w-full border rounded-lg px-3 py-2"
          onChange={(e)=>setForm({...form , image:e.target.files[0]})}
          />
        </div>

        <div className="flex items-center gap-2">
          <input name="isAvailable" checked={form.isAvailable} onChange={handleChange} type="checkbox" />
          <label htmlFor="isAvailable" className="text-sm">Còn món</label>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 pt-3">
          <button type="button" onClick={() => setShowModal(false)} className="flex-1 border rounded-lg py-2 text-gray-600 hover:bg-gray-50">Hủy</button>
          <button type="submit" className="flex-1 bg-green-500 text-white rounded-lg py-2">{loading?"đang lưu":"lưu"}</button>
        </div>
      </form>

    </div>
  </div>
)}

  {/* Modal sửa món */}
{showEditForm && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Sửa món ăn</h2>
        <button type="button" onClick={() => setShowEditForm(false)}>x</button>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleEditSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Tên món</label>
          <input name="name" value={editForm.name} onChange={handleEditChange} className="w-full border rounded-lg px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea name="description" value={editForm.description} onChange={handleEditChange} className="w-full border rounded-lg px-3 py-2" rows={2} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Giá (VNĐ)</label>
          <input name="price" type="number" value={editForm.price} onChange={handleEditChange} className="w-full border rounded-lg px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Danh mục</label>
          <select name="category" value={editForm.category} onChange={handleEditChange} className="w-full border rounded-lg px-3 py-2">
            <option value="Ăn Vặt">Ăn Vặt</option>
            <option value="Món Nhậu">Món Nhậu</option>
            <option value="Đồ Uống">Đồ Uống</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hình ảnh mới</label>
          <input name="image" type="file" accept="image/*" className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input name="isAvailable" type="checkbox" checked={editForm.isAvailable} onChange={handleEditChange} />
          <label className="text-sm">Còn món</label>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 pt-3">
          <button type="button" onClick={() => setShowEditForm(false)} className="flex-1 border rounded-lg py-2 text-gray-600 hover:bg-gray-50">Hủy</button>
          <button type="submit" className="flex-1 bg-blue-500 text-white rounded-lg py-2">{editLoading?"đang lưu":"lưu"}</button>
        </div>
      </form>

    </div>
  </div>
)}
    </div>
    
  );
}