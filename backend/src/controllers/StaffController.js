import User from "../models/users.js";
import bcrypt from 'bcrypt'

export const CreateStaff = async (req, res) => {
    try {
        const {password,...rest} = req.body
        const hashedPassword = await bcrypt.hash(password , 10)

        const staff = await User.create({
            ...rest,
            password:hashedPassword,
            role:"staff"
        })
        return res.status(200).json({message:"tạo thành công nhân viên" , staff})
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// get satff
export const GetStaff = async (req , res) =>{
    try {
        const staffList = await User.find({role:"staff"}).select("-password")
        return res.status(200).json(staffList)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        
    })
}
}
//delete staff
export const deleteStaff = async(req , res)=>{
    try {
        const {id} = req.params

        const staff = await User.findByIdAndDelete(id)

        if(!staff){
            return res.status(404).json({
                message:"khong tim thay nhan vien"
            })
        }

        return res.status(200).json({
            message:"xoa nhan vien thanh cong"
        })
    } catch (error) {
            return res.status(500).json({
            message: error.message
    })
}
}

//update staff
export const updateStaff = async(req,res)=>{
    try {
      const {id} = req.params
    const updated = await User.findByIdAndUpdate(
        id,
        {...req.body},
        {returnDocument:'after'}
    ).select("-password")  
    return res.status(200).json({message:"cập nhật thành công" , staff:updated})
    } catch (error) {
       return res.status(500).json({
            message: error.message
    }) 
    }
}