import {useNavigate} from 'react-router'

export default function Dashboard() {
const navigate = useNavigate()
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          Doanh thu
        </div>

        <div className="bg-white p-5 rounded-xl shadow"
        onClick={() =>navigate("/dashboard/order")}
        >
          Đơn hàng
        </div>

        <div className="bg-white p-5 rounded-xl shadow"
        onClick={() => navigate("/dashboard/staff")}
        >
          Nhân viên
        </div>

        <div className="bg-white p-5 rounded-xl shadow"
        onClick={() => navigate("/dashboard/menu")}
        >
          Món ăn
        </div>
      </div>
    </div>
  );
}