import Menu from '../models/menuItem.js'
import cloudinary from '../lib/cludinary.js'

export const createMenu = async(req , res)=>{
    try {
        let imageUrl = ""

        if(req.file){
            const result =await new Promise((resolve , reject)=>{
                cloudinary.uploader.upload_stream(
                    {folder:"restaurant/menu"},
                    (error , result) =>{
                        if(error) reject(error)
                        else resolve(result)
                    }
                ).end(req.file.buffer)
            })
            imageUrl = result.secure_url
            console.log("imageUrl",imageUrl)
        }
        const food = await Menu.create({
            ...req.body,
            image: imageUrl
        })
        return res.status(201).json({
            message: "Tạo nhân viên thành công" , food
        });
    } catch (error) {
        console.log("lỗi:", error.message)
        return res.status(500).json({
            message: error.message
        });
    }
}

export const GetMenu = async(req , res)=>{
    try {
        const ListFood = await Menu.find({})
        return res.status(200).json({message:"lấy danh sách thành công" , ListFood})
    } catch (error) {
        return res.status(500).json({
         message: error.message
        });
    }
}

//delete menu
export const DeleteMenu = async (req , res)=>{
    try {
        const {id} = req.params
        const deletedFood = await Menu.findByIdAndDelete(id)
        if(!deletedFood){
            return res.status(404).json({message:"khong tim thay mon"})
        }
        return res.status(200).json({message:"xoa nhan vien thanh cong"})
    } catch (error) {
        return res.status(500).json({
         message: error.message
        });
    }
}

//update menu
export const UpdateMenu = async(req ,res)=>{
    try {
        const {id} = req.params
        let imageUrl = undefined

        if(req.file){
            const result = await new Promise((resolve , reject)=>{
                cloudinary.uploader.upload_stream(
                    {folder:"restaurant/menu"},
                    (error, result)=>{
                        if(error) reject (error)
                        else resolve(result)
                    }
                ).end(req.file.buffer)
            })
            imageUrl = result.secure_url
        }

        const updated = await Menu.findByIdAndUpdate(
            id,
            {...req.body, ...(imageUrl && {image : imageUrl})},
            {returnDocument:'after'}
        )
        return res.status(200).json({message:"cap nhat thanh cong" , food:updated})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}