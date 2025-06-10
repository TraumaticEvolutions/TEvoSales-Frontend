/**
 * Filtros de búsqueda para productos.
 *
 * @param {{ filters: Object, onChange: Function }} props
 * @returns {JSX.Element}
 *
 * @author Ángel Aragón
 */
export default function ProductFilters({ filters, onChange }) {
  return (
    <form className="mb-6 p-4 bg-white rounded-lg shadow flex flex-wrap gap-4 items-end">
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Buscar por nombre"
          value={filters.name}
          onChange={onChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="brand"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Marca
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="Buscar por marca"
          value={filters.brand}
          onChange={onChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="category"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Categoría
        </label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Buscar por categoría"
          value={filters.category}
          onChange={onChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </form>
  );
}
