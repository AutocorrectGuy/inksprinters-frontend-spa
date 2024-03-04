import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useSearchParams } from 'react-router-dom';

const calculatePagination = (currentPage: number, totalPages: number, maxDisplayed: number): (number | 'elipsis-left' | 'elipsis-right')[] => {
  const pages: (number | string)[] = [1]; // Always include the first page

  if (totalPages <= maxDisplayed + 2) { // +2 accounts for the first and last pages
    // No ellipses needed, just add all page numbers
    for (let i = 2; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Calculate the range of page numbers
    let start = Math.max(2, currentPage - Math.floor(maxDisplayed / 2));
    let end = Math.min(totalPages - 1, start + maxDisplayed - 1);

    // Adjust if the range is out of bounds
    if (start === 2) end = start + maxDisplayed - 1;
    if (end === totalPages - 1) start = end - maxDisplayed + 1;

    // Determine if left ellipsis is needed
    if (start > 2) pages.push('elipsis-left');

    // Add the calculated range of page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Determine if right ellipsis is needed
    if (end < totalPages - 1) pages.push('elipsis-right');
  }

  // Always include the last page if more than one page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages as (number | 'elipsis-left' | 'elipsis-right')[];
}

type Props = {
  currentPage: number,
  totalPages: number
  maxButtonCountInbetween?: number
}
const CustomPagination = ({ currentPage, totalPages, maxButtonCountInbetween = 3 }: Props) => {

  const [_searchParams, setSearchParams] = useSearchParams()

  // Pagination change handler
  const handlePageChange = (newPage: number | 'elipsis-left' | 'elipsis-right') => {
    switch (newPage) {
      case 'elipsis-left':
        setSearchParams({ page: (currentPage - maxButtonCountInbetween).toString() })
        break;
      case 'elipsis-right':
        setSearchParams({ page: (currentPage + maxButtonCountInbetween).toString() })
        break;
      default:
        setSearchParams({ page: newPage.toString() })
        break;
    }
  }

  return (
    <div className="join bg-base-100">
      {/* Arrow left */}
      <button
        onClick={() => currentPage !== 1 && handlePageChange(currentPage - 1)}
        className={`btn join-item no-animation border-2 border-base-100 hover:border-base-100 ${currentPage !== 1 ? 'hover:bg-[#CA5160] bg-base-100' : 'btn-disabled'}`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {/* Page number */}
      {calculatePagination(currentPage, totalPages, maxButtonCountInbetween).map((btn) => (
        <button
          key={`pagination-btn-${btn}`}
          onClick={() => handlePageChange(btn)}
          className={`btn border-2 border-base-100 rounded-md no-animation ${currentPage === btn ? ' bg-[#CA5160] hover:bg-[#CA5160] text-[#CFCBC4]' : 'hover:bg-[#723748]'}`}
        >
          {btn === 'elipsis-left' || btn === 'elipsis-right' ? '...' : btn}
        </button>)
      )}
      {/* Arrow right */}
      <button
        onClick={() => currentPage !== totalPages && handlePageChange(currentPage + 1)}
        className={`btn join-item no-animation border-2 border-base-100 hover:border-base-100 ${currentPage !== totalPages ? 'hover:bg-[#CA5160] bg-base-100' : 'btn-disabled'}`}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

export default CustomPagination
