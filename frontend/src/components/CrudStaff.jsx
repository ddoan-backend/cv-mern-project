

function CrudStaff({staff, deleteStaff , editModal}) {
  return (
    <tr className="border-t">
              <td className="p-4">{staff.name}</td>
              <td className="p-4">{staff.role}</td>
              <td className="p-4">{staff.phone}</td>
              <td className="p-4">{staff.shift}</td>

              <td className="p-4">
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => editModal(staff)}
                  >
                    Sửa
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={()=>deleteStaff(staff._id)}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
  )
}

export default CrudStaff