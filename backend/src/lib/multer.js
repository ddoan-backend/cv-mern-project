import multer from 'multer'

const storage = multer.memoryStorage() // lưu tạm trong RAM, không lưu vào disk

export const upload = multer({ storage })