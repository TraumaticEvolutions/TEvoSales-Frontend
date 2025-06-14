import { useState } from "react";
import PropTypes from "prop-types";
/**
 * Componente para filtrar pedidos por fecha.
 * @param {Object} props
 * @param {function} props.onFilter Cambia el filtro, recibe {from, to}
 */
export default function OrderDateFilter({ onFilter }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Formatea la fecha para la API
  const formatDateForApi = (date, end = false) => {
    if (!date) return undefined;
    return `${date}T${end ? "23:59:59" : "00:00:00"}`;
  };

  const handleChange = (type, value) => {
    if (type === "from") setFrom(value);
    if (type === "to") setTo(value);
    // Llama a onFilter con las fechas formateadas
    onFilter({
      from: formatDateForApi(type === "from" ? value : from),
      to: formatDateForApi(type === "to" ? value : to, true),
    });
  };

  return (
    <div className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-6">
      <div className="font-semibold text-primary text-lg mb-2">
        Filtrar por fecha
      </div>
      <label className="text-gray-700 text-sm">
        Desde:
        <input
          type="date"
          value={from}
          onChange={(e) => handleChange("from", e.target.value)}
          className="block mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
        />
      </label>
      <label className="text-gray-700 text-sm">
        Hasta:
        <input
          type="date"
          value={to}
          onChange={(e) => handleChange("to", e.target.value)}
          className="block mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
        />
      </label>
    </div>
  );
}

/**
 * PropTypes para OrderDateFilter
 * @typedef {Object} OrderDateFilterProps
 * @property {function} onFilter - Función que se llama al cambiar el filtro, recibe un objeto con las fechas {from, to}.
 * @author Ángel Aragón
 */
OrderDateFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
