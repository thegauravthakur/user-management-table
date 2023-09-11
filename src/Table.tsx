import { useId, useState } from "react";
import { TableRowItem } from "./components/TableRowItem.tsx";
import { TableHead } from "./components/TableHead.tsx";
import { TableFooter } from "./components/TableFooter.tsx";
import { usePagination } from "./hooks/usePagination.tsx";
import { useUsers } from "./hooks/useUsers.tsx";

export function Table() {
  const [tableData, setTableData] = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputId = useId();
  const filteredData = tableData.filter((user) => {
    const { name, email, role } = user;
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const { paginatedData, startIndex, activePage, setActivePage, totalPages } =
    usePagination({
      filteredData,
    });

  return (
    <main className="m-10 text-gray-800">
      <div className="max-w-screen-lg mx-auto">
        <div className="mb-5">
          <h1 className="text-xl font-medium">User Management</h1>
          <p className="text-gray-800/70 text-sm">
            Manage all your users with ease
          </p>
        </div>
        <label className="sr-only" htmlFor={searchInputId}>
          Search
        </label>
        <input
          id={searchInputId}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setActivePage(1);
          }}
          className="w-full rounded text-sm"
          placeholder="Search by name, email or role"
        />
        <table className="w-full mt-5">
          <TableHead tableData={tableData} setTableData={setTableData} />
          <tbody className="text-sm">
            {paginatedData.map((user) => (
              <TableRowItem
                key={user.id}
                user={user}
                tableData={tableData}
                setTableData={setTableData}
              />
            ))}
          </tbody>
        </table>
        <TableFooter
          endIndex={filteredData.length}
          totalSelectedItems={tableData.filter((u) => u.selected).length}
          startIndex={startIndex + 1}
          showDeleteSelected={tableData.filter((u) => u.selected).length > 0}
          totalItems={filteredData.length}
          activePage={activePage}
          setActivePage={setActivePage}
          totalPages={totalPages}
          onDeleteSelected={() => {
            const updatedData = tableData.filter((u) => !u.selected);
            setTableData(updatedData);
          }}
        />
      </div>
    </main>
  );
}
