"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page); // Notify parent to fetch new page
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Prev Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1 px-3 py-1 rounded-md border bg-black shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black"
      >
        <ChevronLeft size={16} />
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 rounded-md border shadow-sm ${
              page === currentPage
                ? "bg-gray-600 text-white border-primary shadow-sm disabled:opacity-50"
                : "bg-black hover:bg-gray-100 shadow-sm disabled:opacity-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1 px-3 py-1 rounded-md border bg-black shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
