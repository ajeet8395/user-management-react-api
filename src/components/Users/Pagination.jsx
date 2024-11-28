// src/components/Users/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`
            px-4 py-2 rounded 
            ${currentPage === number 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }
          `}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;