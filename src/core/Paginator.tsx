import React from "react";

// Paginator for handling paginated data
const Paginator: React.FC<{
  currentPage: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}> = ({ currentPage, totalPages, handlePagination }) => {
  return (
    <div className="flex sm:justify-end sm:items-center">
      <div className="flex items-center"></div>
      <div>
        <button
          onClick={() => handlePagination(currentPage - 1)}
          className={`border p-2 mx-2 rounded-3xl ${currentPage === 1 && "text-gray-400"}`}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span className="font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          className={`border p-2 ml-2 rounded-3xl ${currentPage === totalPages && "text-gray-400"}`}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Paginator;
