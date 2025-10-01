interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const showPages = pages.slice(
    Math.max(0, currentPage - 3),
    Math.min(totalPages, currentPage + 2)
  )

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-[#FDE68A] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        Previous
      </button>
      {showPages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${currentPage === page
              ? 'text-gray-900 bg-[#FDE68A] border border-[#FDE68A] shadow-md'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-[#FDE68A]'
            }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-[#FDE68A] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
