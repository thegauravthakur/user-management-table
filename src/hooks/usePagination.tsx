import { useState } from "react";
import { User } from "./useUsers.tsx";

interface PaginationProps {
  filteredData: User[];
}

export function usePagination({ filteredData }: PaginationProps) {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  return {
    activePage,
    setActivePage,
    paginatedData,
    startIndex,
    endIndex,
    totalPages,
  };
}
