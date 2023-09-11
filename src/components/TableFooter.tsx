import { Dispatch, SetStateAction, useId } from "react";
import { DeleteIcon } from "../assets/icons/DeleteIcon.tsx";

interface TableFooterProps {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  showDeleteSelected: boolean;
  onDeleteSelected: () => void;
  totalSelectedItems: number;
}

export function TableFooter({
  activePage,
  setActivePage,
  totalPages,
  showDeleteSelected,
  endIndex,
  startIndex,
  totalItems,
  onDeleteSelected,
  totalSelectedItems,
}: TableFooterProps) {
  const jumpToPageInputId = useId();
  return (
    <div className="flex justify-between items-center text-sm mt-2">
      <div className="flex items-center gap-x-2">
        <p className="text-gray-800/60">
          Showing {startIndex} to {endIndex} of {totalItems} entries
        </p>
        {showDeleteSelected && (
          <button
            aria-label={`Delete ${totalSelectedItems} selected items`}
            className="border p-2 rounded-lg border-red-600 text-red-600 text-sm flex items-center gap-x-2"
            type="button"
            onClick={onDeleteSelected}
          >
            <DeleteIcon />
            <span>Delete Selected ({totalSelectedItems})</span>
          </button>
        )}
      </div>
      <div className="flex items-center flex-1 justify-between">
        <div className="flex items-center flex-1 justify-center">
          <button
            type="button"
            className="border p-2 rounded-lg border-blue-600 text-blue-600 text-sm flex items-center gap-x-2 w-20 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              setActivePage((prev) => prev - 1);
            }}
            disabled={activePage === 1}
          >
            Previous
          </button>
          <div className="mx-2">
            <p>{activePage}</p>
          </div>
          <button
            type="button"
            className="border p-2 rounded-lg border-blue-600 text-blue-600 text-sm flex items-center gap-x-2 w-20 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              setActivePage((prev) => prev + 1);
            }}
            disabled={activePage === totalPages}
          >
            Next
          </button>
        </div>
        <div className="flex items-center gap-x-2">
          <label htmlFor={jumpToPageInputId}>Jump to page</label>
          <select
            id={jumpToPageInputId}
            className="rounded-lg border-blue-600 text-blue-600 text-sm flex items-center w-20 justify-center"
            onChange={(event) => {
              setActivePage(Number(event.target.value));
            }}
          >
            {Array.from({ length: totalPages }).map((_, index) => (
              <option key={index}>{index + 1}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
