import { EditIcon } from "../assets/icons/EditIcon.tsx";
import { DeleteIcon } from "../assets/icons/DeleteIcon.tsx";
import { useState } from "react";
import { EditMode } from "./EditMode.tsx";
import { User } from "../hooks/useUsers.tsx";

interface TableRowItemProps {
  user: User;
  tableData: User[];
  setTableData: (data: User[]) => void;
}
export function TableRowItem({
  user,
  tableData,
  setTableData,
}: TableRowItemProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  if (isEditMode)
    return (
      <EditMode
        setIsEditMode={setIsEditMode}
        user={user}
        tableData={tableData}
        setTableData={setTableData}
      />
    );
  return (
    <tr className={user.selected ? "bg-gray-800/10" : ""}>
      <td>
        <input
          className="m-4"
          type="checkbox"
          checked={user.selected}
          onChange={() => {
            const updatedData = tableData.map((u) => {
              if (u.id === user.id) {
                return { ...u, selected: !u.selected };
              }
              return u;
            });
            setTableData(updatedData);
          }}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <div className="flex items-center gap-x-2 justify-center">
          <button
            aria-label="Edit user"
            className="border p-1 rounded-lg border-blue-600 text-blue-600"
            onClick={() => {
              setIsEditMode(true);
            }}
            type="button"
          >
            <EditIcon />
          </button>
          <button
            aria-label="Delete user"
            className="border p-1 rounded-lg border-red-600 text-red-600"
            onClick={() => {
              const updatedData = tableData.filter((u) => u.id !== user.id);
              setTableData(updatedData);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}
