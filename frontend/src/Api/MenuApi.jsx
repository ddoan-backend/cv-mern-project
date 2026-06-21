import api from '../lib/axios.js'

//create Menu
export const CreateMenu = async(MenuData)=>{
    const res = await api.post("/menu" , MenuData , {
        headers:{"Content-Type":"multipart/form-data"}
    })
    return res.data
}
//get menu data
export const GetMenu = async()=>{
    const res = await api.get("/menu")
    return res.data
}
//delete menu
export const DeleteMenu = async(id)=>{
    const res = await api.delete(`/menu/${id}`)
    return res.data
}
//update menu
export const UpdateMenu = async(id , newdata)=>{
    const res = await api.put(`/menu/${id}` , newdata ,{
        headers:{"Content-Type":"multipart/form-data"}
    })
    return res.data
}