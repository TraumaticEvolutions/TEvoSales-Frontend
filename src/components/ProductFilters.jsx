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
    <form className="p-6 bg-white/90 rounded-2xl shadow-xl flex flex-wrap gap-6 items-end border border-[#e0f2fe]">
      <div className="flex flex-col w-full sm:w-48">
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
          className="border border-gray-300 rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col w-full sm:w-48">
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
          className="border border-gray-300 rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col w-full sm:w-48">
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
          className="border border-gray-300 rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col w-full sm:w-48">
        <label
          htmlFor="sort"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Ordenar por
        </label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={onChange}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="id,asc">Por defecto</option>
          <option value="price,asc">Precio: menor a mayor</option>
          <option value="price,desc">Precio: mayor a menor</option>
          <option value="name,asc">Nombre: A-Z</option>
          <option value="name,desc">Nombre: Z-A</option>
        </select>
      </div>
    </form>
  );
}
