import {
  FaUser,
  FaMapMarkerAlt,
  FaHashtag,
  FaEuroSign,
  FaBoxOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import OrderStatusBadge from "./OrderStatusBadge";
import Button from "./Button";
import Modal from "./Modal";
import PropTypes from "prop-types";

/**
 * Componente Modal para mostrar los detalles de un pedido.
 * Muestra información como usuario, dirección, fecha, estado, total y productos.
 * @component OrderDetailsModal
 * @param {Object} props
 * @param {boolean} props.open - Si el modal está abierto.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Object} props.order - Detalles del pedido a mostrar.
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function OrderDetailsModal({ open, onClose, order }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Detalles del pedido #${order?.id ?? ""}`}
      actions={
        <Button
          text="Cerrar"
          onClick={onClose}
          bgColor="bg-cyan-500"
          bgColorHover="hover:bg-cyan-600"
        />
      }
    >
      {order && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FaUser className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Usuario:</span>
            <span>{order.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Dirección:</span>
            <span>
              {order.address} {order.number}
              {order.floor ? `, ${order.floor}` : ""} ({order.postalCode})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Fecha:</span>
            <span>
              {new Date(order.createdAt).toLocaleString("es-ES", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaHashtag className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Estado:</span>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="flex items-center gap-2">
            <FaEuroSign className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Total:</span>
            <span>{order.total?.toFixed(2)} €</span>
          </div>
          <div>
            <span className="font-semibold text-cyan-700 flex items-center gap-2">
              <FaBoxOpen className="text-cyan-600" /> Productos:
            </span>
            <ul className="mt-2 space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 bg-cyan-50 rounded px-2 py-2"
                >
                  <span className="text-xs text-cyan-700 font-mono">
                    # {item.productId}
                  </span>
                  <span className="font-semibold">{item.productName}</span>
                  <span className="text-xs text-gray-500">
                    x{item.quantity}
                  </span>
                  <span className="sm:ml-auto text-cyan-700 font-semibold">
                    {item.subtotal.toFixed(2)} €
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Modal>
  );
}

/**
 * PropTypes para validar las propiedades del componente OrderDetailsModal.
 * @typedef {Object} OrderDetailsModalProps
 * @property {boolean} open - Indica si el modal está abierto.
 * @property {Function} onClose - Función para cerrar el modal.
 * @property {Object} order - Detalles del pedido a mostrar.
 * @property {number} order.id - ID del pedido.
 * @property {string} order.username - Nombre de usuario del cliente.
 * @property {string} order.address - Dirección de envío.
 * @property {string} order.number - Número de la dirección.
 * @property {string} [order.floor] - Piso de la dirección (opcional).
 * @property {string} order.postalCode - Código postal de la dirección.
 * @property {string} order.createdAt - Fecha de creación del pedido en formato ISO.
 * @property {string} order.status - Estado del pedido (ej: "PENDIENTE", "CONFIRMADO").
 * @property {number} order.total - Total del pedido en euros.
 * @property {Array} order.items - Lista de productos en el pedido.
 * @property {Object} order.items[].productId - ID del producto.
 * @property {string} order.items[].productName - Nombre del producto.
 * @property {number} order.items[].quantity - Cantidad del producto.
 * @property {number} order.items[].subtotal - Subtotal del producto en euros.
 * @author Ángel Aragón
 */
OrderDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    address: PropTypes.string,
    number: PropTypes.string,
    floor: PropTypes.string,
    postalCode: PropTypes.string,
    createdAt: PropTypes.string,
    status: PropTypes.string,
    total: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        subtotal: PropTypes.number.isRequired,
      })
    ),
  }),
};
