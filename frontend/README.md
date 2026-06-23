# 🍽️ Quán Cô Mai

Hệ thống quản lý nhà hàng full-stack hiện đại, cho phép khách hàng đặt món qua QR code và nhà bếp nhận order theo thời gian thực.

## 🌐 Demo

- **Frontend:** https://cv-mern-project.vercel.app
- **Backend:** https://cv-mern-project-production.up.railway.app

## ✨ Tính năng

### 👨‍🍳 Nhà bếp
- Nhận order theo thời gian thực qua Socket.io
- Xác nhận và cập nhật trạng thái món ăn
- Hiển thị danh sách món đang chờ / đang nấu / hoàn thành

### 🪑 Quản lý bàn & Đặt món qua QR
- Tạo và quản lý bàn ăn
- Tự động generate QR code riêng cho từng bàn
- Theo dõi trạng thái bàn (trống / đang dùng)
- **Flow đặt món:** Khách quét QR tại bàn → vào trang menu với đúng bàn đó → chọn món → đặt order → nhà bếp nhận thông báo realtime qua Socket.io

### 🛒 Đặt món (dành cho khách)
- Quét QR code để vào menu
- Thêm món vào giỏ hàng
- Đặt order trực tiếp từ điện thoại

### 👥 Quản lý nhân viên
- Thêm / sửa / xóa nhân viên
- Phân quyền: Admin / Staff / Kitchen

### 🍜 Quản lý menu
- Thêm / sửa / xóa món ăn
- Upload hình ảnh món ăn qua Cloudinary

### 📊 Dashboard
- Tổng quan doanh thu, số bàn, đơn đang chờ
- Thống kê theo ngày

## 🛠️ Công nghệ sử dụng

### Frontend
- **React** + Vite
- **Tailwind CSS**
- **React Router**
- **Socket.io Client**
- **Axios**
- **React Hook Form** + Zod
- **Sonner** (toast notifications)

### Backend
- **Node.js** + Express
- **MongoDB** + Mongoose
- **Socket.io**
- **JWT** (Access Token + Refresh Token)
- **Cloudinary** (upload ảnh)
- **bcrypt** (mã hóa mật khẩu)
- **Cookie Parser**

### Deploy
- **Vercel** (Frontend)
- **Railway** (Backend)
- **MongoDB Atlas** (Database)

## 🚀 Chạy local

### Yêu cầu
- Node.js >= 18
- MongoDB Atlas account
- Cloudinary account

### Backend
```bash
cd backend
npm install
```

Tạo file `.env`:
```env
PORT=3000
MONGODB_CONECTION=your_mongodb_uri
SECRET_KEY_TOKEN=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
```

Tạo file `.env`:
```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

## 📁 Cấu trúc project

```
cv-mern-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── Context/
    │   ├── lib/
    │   └── App.jsx
    └── package.json
```

## 👤 Tác giả

**ddoanDev**  
GitHub: [@ddoan-backend](https://github.com/ddoan-backend)