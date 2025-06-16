const ORDER_STATUS_OPTIONS = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "ENVIADO", label: "Enviado" },
  { value: "ENTREGADO", label: "Entregado" },
  { value: "CANCELADO", label: "Cancelado" },
];

/**
 * Formatea una fecha para la API, agregando la hora correspondiente.
 * @param {string} date - Fecha en formato YYYY-MM-DD.
 * @param {boolean} isStart - Si es la fecha de inicio (true) o fin (false).
 * @author Ángel Aragón
 */
function formatDateForApi(date, isStart) {
  if (!date) return "";
  return `${date}T${isStart ? "00:00:00" : "23:59:59"}`;
}

/**
 * Componente de filtro de pedidos.
 * Permite filtrar por usuario, estado y rango de fechas.
 * @component OrderFilter
 * @param {Object} filters - Filtros actuales del componente.
 * @param {Function} onChange - Función que se llama al cambiar los filtros.
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function OrderFilter({ filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFilters = { ...filters };

    if (name === "startDate") {
      newFilters.startDate = formatDateForApi(value, true);
    } else if (name === "endDate") {
      newFilters.endDate = formatDateForApi(value, false);
    } else {
      newFilters[name] = value;
    }

    onChange(newFilters);
  };

  const getDateValue = (dateTime) => (dateTime ? dateTime.split("T")[0] : "");

  return (
    <form className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-6 w-full max-w-3xl">
      <div className="font-semibold text-primary text-lg mb-2">
        Filtrar pedidos
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={filters.username}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
        >
          <option value="">Todos los estados</option>
          {ORDER_STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-sm mb-1">
            Fecha inicio
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={getDateValue(filters.startDate)}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-sm mb-1">
            Fecha fin
          </label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={getDateValue(filters.endDate)}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
          />
        </div>
      </div>
    </form>
  );
}
