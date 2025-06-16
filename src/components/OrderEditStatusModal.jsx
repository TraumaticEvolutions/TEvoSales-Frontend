import {
  FaUser,
  FaMapMarkerAlt,
  FaEuroSign,
  FaCalendarAlt,
} from "react-icons/fa";
import Button from "./Button";
import Modal from "./Modal";
import PropTypes from "prop-types";

const ORDER_STATUS_OPTIONS = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "ENVIADO", label: "Enviado" },
  { value: "ENTREGADO", label: "Entregado" },
  { value: "CANCELADO", label: "Cancelado" },
];

/**
 * Modal para editar el estado de un pedido.
 * Muestra detalles del pedido como usuario, dirección, fecha, estado, total y productos.
 * Permite ver la información detallada de un pedido específico.
 * @component OrderEditStatusModal
 * @param {Object} props
 * @param {boolean} props.open - Si el modal está abierto.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Object} props.order - Detalles del pedido a editar.
 * @param {string} props.newStatus - Nuevo estado del pedido.
 * @param {Function} props.setNewStatus - Función para actualizar el nuevo estado.
 * @param {Function} props.onSave - Función para guardar los cambios.
 * @param {boolean} props.saving - Si se está guardando el estado.
 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function OrderEditStatusModal({
  open,
  onClose,
  order,
  newStatus,
  setNewStatus,
  onSave,
  saving,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Editar estado del pedido #${order?.id ?? ""}`}
      actions={
        <>
          <Button
            text="Cancelar"
            onClick={onClose}
            bgColor="bg-gray-300"
            bgColorHover="hover:bg-gray-400"
            disabled={saving}
          />
          <Button
            text={saving ? "Guardando..." : "Guardar"}
            onClick={onSave}
            bgColor="bg-cyan-500"
            bgColorHover="hover:bg-cyan-600"
            disabled={saving}
          />
        </>
      }
    >
      {order && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-700 flex items-center gap-2">
              <FaUser /> Usuario:
            </span>{" "}
            {order.username}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-700 flex items-center gap-2">
              <FaMapMarkerAlt /> Dirección:
            </span>{" "}
            {order.address} {order.number}
            {order.floor ? `, ${order.floor}` : ""} ({order.postalCode})
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-700 flex items-center gap-2">
              <FaCalendarAlt /> Fecha:
            </span>{" "}
            {new Date(order.createdAt).toLocaleString("es-ES", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-700 flex items-center gap-2">
              <FaEuroSign /> Total:
            </span>{" "}
            {order.total?.toFixed(2)} €
          </div>
          <div>
            <label
              htmlFor="order-status-select"
              className="font-semibold text-cyan-700 block mb-1"
            >
              Estado del pedido
            </label>
            <select
              id="order-status-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300 w-full"
            >
              {ORDER_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </Modal>
  );
}

/**
 * PropTypes para validar las propiedades del componente OrderEditStatusModal.
 * @typedef {Object} OrderEditStatusModalProps
 * @property {boolean} open - Si el modal está abierto.
 * @property {Function} onClose - Función para cerrar el modal.
 * @property {Object} order - Detalles del pedido a editar.
 * @property {string} newStatus - Nuevo estado del pedido.
 * @property {Function} setNewStatus - Función para actualizar el nuevo estado.
 * @property {Function} onSave - Función para guardar los cambios.
 * @property {boolean} saving - Si se está guardando el estado.
 * @author Ángel Aragón
 */
OrderEditStatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  newStatus: PropTypes.string.isRequired,
  setNewStatus: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
};
