import { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4">
      {pages.map(page => (
        <button
          key={page}
          className={`px-3 py-1 mx-1 rounded ${page === currentPage ? 'bg-blue-500 text-white ' : 'bg-gray-200'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
