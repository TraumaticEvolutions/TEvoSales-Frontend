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
