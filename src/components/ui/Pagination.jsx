import { useEffect, useRef } from "react";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  perPage,
  onPerPageChange,
  totalItems,
  loading = false 
}) => {
  const pageInputRef = useRef(null);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        start = 2;
        end = 4;
      }
      
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }
      
      if (start > 2) {
        pages.push('ellipsis-start');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageInput = (e) => {
    if (e.key === 'Enter') {
      const page = parseInt(e.target.value);
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    }
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * perPage + 1 : 0;
  const endItem = Math.min(currentPage * perPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex flex-col items-center gap-4 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 px-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {totalItems > 0 ? (
            <span>
              Ko'rsatilmoqda: <span className="font-semibold text-purple-600 dark:text-purple-400">{startItem}</span> - <span className="font-semibold text-purple-600 dark:text-purple-400">{endItem}</span> / <span className="font-semibold">{totalItems}</span>
            </span>
          ) : (
            <span>Hech narsa topilmadi</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sahifada:</span>
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(parseInt(e.target.value))}
            disabled={loading}
            className="px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || loading}
          className="px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:hover:shadow-md"
          title="Birinchi sahifa"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:hover:shadow-md flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Oldingi</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-gray-400 dark:text-gray-600"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={loading}
                className={`min-w-[40px] px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg shadow-purple-500/50 scale-105"
                    : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 shadow-md hover:shadow-lg"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:hover:shadow-md flex items-center gap-1"
        >
          <span className="hidden sm:inline">Keyingi</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || loading}
          className="px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:hover:shadow-md"
          title="Oxirgi sahifa"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span>Sahifaga o'tish:</span>
        <input
          ref={pageInputRef}
          type="number"
          min="1"
          max={totalPages}
          onKeyDown={handlePageInput}
          disabled={loading}
          placeholder={currentPage.toString()}
          className="w-20 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center"
        />
        <span>/ {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;

