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
    <nav className="flex justify-center items-center gap-2 mt-10 select-none">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 bg-white text-cyan-700 font-semibold hover:bg-cyan-50 transition disabled:opacity-50 disabled:cursor-not-allowed shadow"
        aria-label="Página anterior"
      >
        &laquo;
      </button>
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-4 py-2 cursor-pointer rounded-lg border font-semibold shadow transition ${
            num === page
              ? "bg-cyan-700 text-white border-cyan-700"
              : "bg-white text-cyan-700 border-gray-300 hover:bg-cyan-50"
          }`}
          aria-current={num === page ? "page" : undefined}
        >
          {num + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 >= totalPages}
        className="px-4 py-2 rounded-lg cursor-pointer border border-gray-300 bg-white text-cyan-700 font-semibold hover:bg-cyan-50 transition disabled:opacity-50 disabled:cursor-not-allowed shadow"
        aria-label="Página siguiente"
      >
        &raquo;
      </button>
    </nav>
  );
}
