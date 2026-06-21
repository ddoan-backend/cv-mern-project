// src/lib/axios.js
import api from "../lib/axios.js";


//create staff
export const createStaff = async (staffData) => {
  const res = await api.post("/staff", staffData);
  return res.data;
};
//get lisststaff
export const getStaff = async()=>{
  const res = await api.get("/staff")
  return res.data
}
//deletestaff
export const deleteStaff = async(id)=>{
  const res = await api.delete(`/staff/${id}`)
  return res.data
}
//update staff
export const updateStaff = async(id,data)=>{
  const res = await api.put(`/staff/${id}`,data)
  return res.data
}