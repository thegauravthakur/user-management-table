import { useId } from "react";
import { CheckIcon } from "../assets/icons/CheckIcon.tsx";
import { DeleteIcon } from "../assets/icons/DeleteIcon.tsx";
import { User } from "../hooks/useUsers.tsx";

interface EditModeProps {
  user: User;
  tableData: User[];
  setTableData: (data: User[]) => void;
  setIsEditMode: (isEditMode: boolean) => void;
}
export function EditMode({
  user,
  tableData,
  setTableData,
  setIsEditMode,
}: EditModeProps) {
  const formID = useId();
  return (
    <tr>
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
      <td>
        <input
          name="name"
          form={formID}
          required
          type="text"
          defaultValue={user.name}
        />
      </td>
      <td>
        <input
          name="email"
          required
          form={formID}
          type="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <select name="role" defaultValue={user.role} required form={formID}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </td>
      <td>
        <div className="flex items-center gap-x-2 justify-center">
          <button
            className="border p-1 rounded-lg border-blue-600 text-blue-600"
            form={formID}
            type="submit"
          >
            <CheckIcon />
          </button>
          <button
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
      <td className="">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const updatedData = tableData.map((u) => {
              if (u.id === user.id) {
                return {
                  ...u,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  role: formData.get("role") as string,
                };
              }
              return u;
            });
            setTableData(updatedData);
            setIsEditMode(false);
          }}
          id={formID}
        />
      </td>
    </tr>
  );
}
