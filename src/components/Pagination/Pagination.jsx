import { useMemo } from "react";

const  PaginationComponent = ({pagination, onPageCHange}) => {

  if (!pagination) return null;

    const {
    currentPage,
    totalPages,
    
  } = pagination;

  const maxPagesToShow = 8;

  const pageNumbers = useMemo(() => {
     if (!totalPages) return [];

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    } // adjussi
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageCHange(page);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center space-x-1 text-skin-primary mt-4">
      {/* Prev button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded bg-skin-button-primary disabled:opacity-50 hover:bg-skin-button-secondary transition"
        aria-label="Previous page"
      >
        Prev
      </button>

      {/* First Page and Ellipsis */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="px-3 py-1 border rounded bg-skin-button-primary hover:bg-skin-button-secondary transition"
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className="px-2 select-none">...</span>}
        </>
      )}

      {/* Visible Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded transition ${
            page === currentPage
              ? "bg-skin-button-secondary text-skin-secondary font-semibold"
              : "bg-skin-button-primary hover:bg-skin-button-secondary"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Last Page and Ellipsis */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2 select-none">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-3 py-1 border rounded bg-skin-button-primary hover:bg-skin-button-secondary transition"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded bg-skin-button-primary disabled:opacity-50 hover:bg-skin-button-secondary transition"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;