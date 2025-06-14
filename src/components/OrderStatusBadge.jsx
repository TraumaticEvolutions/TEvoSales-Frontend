import PropTypes from "prop-types";

/**
 * Badge visual para mostrar el estado de un pedido.
 *
 * @param {Object} props
 * @param {string} props.status Estado del pedido en mayúsculas (ej: "PENDIENTE", "CONFIRMADO", etc.)
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
const statusColorMap = {
  PENDIENTE: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CONFIRMADO: "bg-blue-100 text-blue-800 border-blue-300",
  ENVIADO: "bg-cyan-100 text-cyan-800 border-cyan-300",
  ENTREGADO: "bg-emerald-100 text-emerald-800 border-emerald-300",
  CANCELADO: "bg-red-100 text-red-800 border-red-300",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full border text-xs font-semibold shadow-sm ${
        statusColorMap[status] || "bg-gray-200 text-gray-700 border-gray-300"
      }`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

/**
 * PropTypes para validar las propiedades del componente OrderStatusBadge.
 * @typedef {Object} OrderStatusBadgeProps
 * @property {string} status - Estado del pedido en mayúsculas (ej: "PENDIENTE", "CONFIRMADO", etc.).
 * @author Ángel Aragón
 */
OrderStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
