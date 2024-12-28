import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  itemsPerPage,
  hasNext,
  hasPrev,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex justify-end mt-4">
      <div className="items-per-page">
        <label htmlFor="itemsPerPage">Itens por página:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="ml-2 border px-2 py-1 rounded"
        >
          {[5, 10, 15, 20].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="page-navigation">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className="px-3 py-1 mx-1 bg-[#19c1ce] text-white rounded disabled:bg-gray-300"
        >
          Anterior
        </button>

        <span className="mx-2">{`Página ${currentPage} de ${totalPages}`}</span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="px-3 py-1 mx-1 bg-[#19c1ce] text-white rounded disabled:bg-gray-300"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Pagination;
