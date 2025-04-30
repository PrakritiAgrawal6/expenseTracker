import React, { useState } from "react";

// Paginator for handling paginated data
const Paginator: React.FC<{
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  handlePagination: (page: number, limit: number) => void;
}> = ({ currentPage, totalPages, pageLimit, handlePagination }) => {
  const [limit, setLimit] = useState(pageLimit);
  return (
    <div className="flex sm:justify-end sm:items-center">
      <div className="flex items-center"></div>
      <div>
        <label htmlFor="limit">No of items: </label>
        <select
          name="limit"
          id=""
          className="border-2 p-2"
          value={pageLimit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            handlePagination(currentPage, Number(e.target.value));
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <button
          onClick={() => handlePagination(currentPage - 1, limit)}
          className={`border p-2  mx-2 rounded-3xl  ${
            currentPage === 1 && "text-gray-400 "
          } `}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span className="font-bold">
          {" "}
          page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePagination(currentPage + 1, limit)}
          className={`border p-2  ml-2 rounded-3xl  ${
            currentPage === totalPages && " text-gray-400 "
          }'`}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Paginator;
