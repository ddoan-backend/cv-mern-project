import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import CrudStaff from "../components/CrudStaff.jsx";
import {useState , useEffect} from 'react'
import { getStaff , createStaff , deleteStaff, updateStaff } from "../Api/StaffApi.jsx";
import { toast } from "sonner";

export default function StaffPage() {
const navigate = useNavigate()
const [showModal , setShowModal] = useState(false)
const [form , setForm] = useState({
  name:"",email:"",password:"",phone:"",role:"staff"
})
const [listStaff , setListStaff] = useState([])
const [search , setSearch] = useState("")
const [showEditModal , setShowEditModal] = useState(false)
const [editForm , setEditForm] = useState({name:"",phone:"",role:"staff"})
const [editstaff , setEditStaff] = useState(null)
//search
const filteredStaff = listStaff.filter((staff)=>(
  staff?.name.toLowerCase().includes(search.toLowerCase())
))

const handleChange = (e)=>{
  setForm({...form ,[e.target.name]:e.target.value})
}
const handleEditChange = (e)=>{
  setEditForm({...editForm,[e.target.name]:e.target.value})
}
//Get render data
useEffect(()=>{
  const handleRender = async()=>{
    const data = await getStaff()
    return setListStaff(data)
  }
  handleRender()
},[])
// handle create staff
const handleSubmit = async(e)=>{
  e.preventDefault()
  const newStaff = await createStaff(form)
  console.log("newstaff:" , newStaff)
  setListStaff((prev)=>[...prev,newStaff.staff])

  setShowModal(false)

  setForm({
    name:"",
    email:"",
    phone:"",
    password:"",
    role:"staff"
  })
  toast.success("Thêm thành công nhân viên ")
}
//handle delete staff
const handleDelete = async(id)=>{
  const confirm = window.confirm("xác nhận xóa người này ?")
  if(!confirm)return
   await deleteStaff(id)
  setListStaff((prev)=>prev.filter((staff)=>(
    staff._id !== id
  )))
  toast.success("Xóa thành công nhân viên ")
}
//handle show modal
const handleShowModal = ()=>{
  setShowModal(true)
}
//handle show edit modal
const handleShowEditModal =(staff)=>{
  setEditStaff(staff)
  setEditForm({name:staff.name , phone:staff.phone , role:staff.role})
  setShowEditModal(true)
}
//handle edit staff
const handleEditStaff = async(e)=>{
  e.preventDefault()

  const updated = await updateStaff(editstaff._id , editForm)
  setListStaff((prev)=>prev.map((staff)=>(
    staff._id === editstaff._id? updated.staff:staff
  )))
  setShowEditModal(false)
  toast.success("Sửa thành công nhân viên ")
}

  return (
    <div className="p-2">

      {/* Back */}
      <button className="flex items-center  text-gray-600 hover:text-black">
        <ArrowLeft size={20} />
        <span
        onClick={() => navigate("/dashboard")}
        >Quay lại Dashboard</span>
      </button>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Quản lý nhân viên
          </h1>

          <p className="text-gray-500">
            Thêm, sửa và quản lý nhân viên
          </p>
        </div>

        <button className="bg-green-500 text-white px-5 py-3 rounded-lg"
        onClick={handleShowModal}
        >
          + Thêm nhân viên
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Tìm kiếm nhân viên..."
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="text-left p-4">Tên</th>
              <th className="text-left p-4">Chức vụ</th>
              <th className="text-left p-4">SĐT</th>
              <th className="text-left p-4">Ca làm</th>
              <th className="text-left p-4">Thao tác</th>
            </tr>
          </thead>

          <tbody>
        {/* render staff */}
        {filteredStaff.map((staff)=>(
          <CrudStaff key={staff._id} staff={staff} 
          deleteStaff={handleDelete} editModal ={handleShowEditModal}
          >
          </CrudStaff>
        ))}
          </tbody>
        </table>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Thêm nhân viên</h2>
              <button>
                x
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4"
            onSubmit={handleSubmit}
            autoComplete="off"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="nhanvien@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="0901234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Chức vụ</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="staff">Nhân viên</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="flex-1 border rounded-lg py-2 text-gray-600 hover:bg-gray-50"
                  onClick={()=>setShowModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white rounded-lg py-2 disabled:opacity-50"
                >
                Lưu
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

        {/* Modal sửa */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Sửa nhân viên</h2>
              <button type="button" onClick={() => setShowEditModal(false)}>x</button>
            </div>
            <form className="space-y-4" onSubmit={handleEditStaff}>
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên</label>
                <input name="name" value={editForm.name} onChange={handleEditChange}  className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chức vụ</label>
                <select name="role" value={editForm.role} onChange={handleEditChange} className="w-full border rounded-lg px-3 py-2">
                  <option value="staff">Nhân viên</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 border rounded-lg py-2 text-gray-600 hover:bg-gray-50">Hủy</button>
                <button type="submit" className="flex-1 bg-blue-500 text-white rounded-lg py-2">Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}