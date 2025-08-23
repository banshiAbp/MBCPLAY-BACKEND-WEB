import React from "react";
import "../styles/components/pagination.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="common-pagination common-pagination--right">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="common-pagination-btn"
      >
        Previous
      </button>
      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <span key={"ellipsis-" + idx} className="common-pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={`common-pagination-btn${p === page ? " active" : ""}`}
            onClick={() => typeof p === "number" && onPageChange(p)}
            disabled={p === page}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="common-pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
