import React from "react";



const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`p-2 bg-black text-white rounded-md ${
              currentPage === i ? "bg-gray-700" : ""
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pageNumbers.push(
          <span key={i} className="p-2">
            ...
          </span>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-black text-white rounded-md"
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-black text-white rounded-md"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
