import { ArrowLeft } from "lucide-react";
import {useNavigate} from 'react-router'

export default function OrdersPage() {

const navigate = useNavigate()
  return (
    <div className="p-6">

      {/* Back */}
      <button className="flex items-center gap-2 text-gray-600 hover:text-black mb-6">
        <ArrowLeft size={20} />
        <span
        onClick={() => navigate("/dashboard")}
        >Quay lại Dashboard</span>
      </button>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl">
            Quản lý đơn hàng
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Quản lý order và trạng thái món ăn
          </p>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
          + Tạo đơn hàng
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">

        {/* Left */}
        <div className="border rounded-xl p-6">
          <h2 className="text-3xl font-bold mb-6">
            Danh sách bàn
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <button className="h-20 rounded-lg border border-orange-500">
              Bàn 1
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 2
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 3
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 4
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 5
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 6
            </button>

            <button className="h-20 rounded-lg border border-red-300">
              Bàn 7
            </button>

            <button className="h-20 rounded-lg border border-red-300">
              Bàn 8
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 9
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 10
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 11
            </button>

            <button className="h-20 rounded-lg border">
              Bàn 12
            </button>

          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 border rounded-xl flex flex-col">

          {/* Order Header */}
          <div className="p-6 border-b">
            <h2 className="text-4xl font-bold">
              Bàn 1
            </h2>

            <p className="text-gray-500 mt-2">
              Trạng thái: Đang phục vụ
            </p>
          </div>

          {/* Order Detail */}
          <div className="flex-1 overflow-auto">

            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4">Tên món</th>
                  <th className="text-left p-4">SL</th>
                  <th className="text-left p-4">Giá</th>
                  <th className="text-left p-4">Trạng thái</th>
                  <th className="text-left p-4">Thao tác</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b">
                  <td className="p-4">Cơm gà</td>
                  <td className="p-4">2</td>
                  <td className="p-4">90.000đ</td>

                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      Chờ xác nhận
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">
                        Sửa
                      </button>

                      <button className="bg-red-500 text-white px-3 py-1 rounded">
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-4">Trà đào</td>
                  <td className="p-4">1</td>
                  <td className="p-4">30.000đ</td>

                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      Đang nấu
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">
                        Sửa
                      </button>

                      <button className="bg-red-500 text-white px-3 py-1 rounded">
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4">Bò lúc lắc</td>
                  <td className="p-4">1</td>
                  <td className="p-4">120.000đ</td>

                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Hoàn thành
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">
                        Sửa
                      </button>

                      <button className="bg-red-500 text-white px-3 py-1 rounded">
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>

          </div>

          {/* Footer */}
          <div className="border-t p-5">

            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-medium">
                Tổng tiền
              </span>

              <span className="text-3xl font-bold text-orange-500">
                240.000đ
              </span>
            </div>

            <div className="flex justify-end gap-3">

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg">
                Thanh toán
              </button>

              <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg">
                + Thêm món
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}