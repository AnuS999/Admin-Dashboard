import { useState, useMemo } from 'react';

function DataTable({ data, columns, itemsPerPage = 10 }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter((item) =>
      columns.some((column) => {
        const value = item[column.accessor];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = aValue.toString().toLowerCase();
      const bString = bValue.toString().toLowerCase();

      if (aString < bString) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aString > bString) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Search Bar */}
      <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
          />
          <svg
            className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  onClick={() => column.sortable !== false && handleSort(column.accessor)}
                  className={`px-3 sm:px-4 md:px-6 py-3 sm:py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    column.sortable !== false ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''
                  } ${column.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="whitespace-nowrap">{column.header}</span>
                    {column.sortable !== false && getSortIcon(column.accessor)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-gray-900 ${
                        column.hideOnMobile ? 'hidden md:table-cell' : ''
                      }`}
                    >
                      <div className="min-w-[80px] sm:min-w-[100px]">
                        {column.render
                          ? column.render(row[column.accessor], row)
                          : row[column.accessor]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 sm:px-6 py-12 sm:py-16 text-center text-sm sm:text-base text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-medium">No data found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-600 font-medium">
              Showing{' '}
              <span className="font-semibold text-gray-800">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{' '}
              to{' '}
              <span className="font-semibold text-gray-800">
                {Math.min(currentPage * itemsPerPage, sortedData.length)}
              </span>{' '}
              of <span className="font-semibold text-gray-800">{sortedData.length}</span> results
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {(() => {
                  const pages = [];
                  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
                  const visiblePages = pageNumbers.filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  });

                  visiblePages.forEach((page, index) => {
                    const prevPage = visiblePages[index - 1];
                    if (prevPage && page - prevPage > 1) {
                      pages.push(
                        <span key={`ellipsis-${page}`} className="px-2 py-1 text-sm text-gray-700">
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  });
                  return pages;
                })()}
              </div>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;

