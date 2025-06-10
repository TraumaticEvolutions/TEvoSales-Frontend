/**
 * Componente de paginación estilizado.
 *
 * @param {{ page: number, totalPages: number, onPageChange: Function }} props
 * @returns {JSX.Element}
 *
 * @author Ángel Aragón
 */
export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const max = Math.min(5, totalPages);
    let start = Math.max(0, page - Math.floor(max / 2));
    let end = start + max;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(0, end - max);
    }
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-8 select-none">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        &laquo;
      </button>
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded border ${
            num === page
              ? "bg-blue-600 text-white border-blue-600 font-semibold"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
          } transition`}
          aria-current={num === page ? "page" : undefined}
        >
          {num + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 >= totalPages}
        className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página siguiente"
      >
        &raquo;
      </button>
    </nav>
  );
}
