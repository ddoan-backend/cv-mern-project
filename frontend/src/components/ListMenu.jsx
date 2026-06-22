

function ListMenu({menu ,deletefood , editfood}) {
  return (
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                {menu.image ? ( <img src={menu.image} alt={menu.name} className="w-12 h-12 object-cover rounded-lg" />)
                 : (<div className="w-12 h-12 bg-gray-200 rounded-lg" />
)}
                </td>
                  <td className="p-4">{menu.name}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">{menu.category}</span>
                  </td>
                  <td className="p-4">{menu.price.toLocaleString("vi-VN")}đ</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      {menu.isAvailable?"còn món":"hết"}
                    </span>
                  </td>
                  <td className="p-6 flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={()=>editfood(menu)}>Sửa</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm" onClick={()=>deletefood(menu._id)}>Xóa</button>
                  </td>
                </tr>
  )
}

export default ListMenu