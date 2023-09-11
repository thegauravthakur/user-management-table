import { ChangeEvent } from "react";
import { User } from "../hooks/useUsers.tsx";

interface TableHeadProps {
  tableData: User[];
  setTableData: (data: User[]) => void;
}
export function TableHead({ tableData, setTableData }: TableHeadProps) {
  function onSelectAllClick(event: ChangeEvent<HTMLInputElement>) {
    const updatedData = tableData.map((user) => ({
      ...user,
      selected: event.target.checked,
    }));
    setTableData(updatedData);
  }

  return (
    <thead className="text-gray-800/60">
      <tr>
        <th className="text-left">
          <input type="checkbox" className="ml-4" onChange={onSelectAllClick} />
        </th>
        <th className="text-left font-normal text-sm">Name</th>
        <th className="text-left font-normal text-sm">Email</th>
        <th className="text-left font-normal text-sm">Role</th>
        <th className="text-center font-normal text-sm">Actions</th>
      </tr>
    </thead>
  );
}
