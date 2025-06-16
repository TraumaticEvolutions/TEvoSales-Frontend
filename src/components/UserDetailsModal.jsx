import Modal from "./Modal";
import Button from "./Button";
import PropTypes from "prop-types";

/**
 * Modal para mostrar los detalles de un usuario.
 * @param {Object} param0 - Props del componente
 * @param {boolean} param0.open - Indica si el modal está abierto.
 * @param {function} param0.onClose - Función para cerrar el modal.
 * @param {Object} param0.user - Objeto con los detalles del usuario.
 * @param {string} param0.user.username - Nombre de usuario.
 * @param {string} param0.user.name - Nombre completo del usuario.
 * @param {string} param0.user.email - Email del usuario.
 * @param {string} param0.user.nif - NIF del usuario.
 * @param {number} param0.user.ordersCount - Número de pedidos del usuario.
 * @param {Array<string>} param0.user.roles - Roles del usuario.
 * @returns {JSX.Element} - Componente modal con los detalles del usuario.
 * @author Ángel Aragón
 */
export default function UserDetailsModal({ open, onClose, user }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Detalles de ${user?.username || ""}`}
      actions={
        <Button
          text="Cerrar"
          onClick={onClose}
          bgColor="bg-cyan-500"
          bgColorHover="hover:bg-cyan-600"
        />
      }
    >
      {user && (
        <div className="space-y-2">
          <div>
            <span className="font-semibold text-cyan-700">Usuario:</span>{" "}
            {user.username}
          </div>
          <div>
            <span className="font-semibold text-cyan-700">Nombre:</span>{" "}
            {user.name}
          </div>
          <div>
            <span className="font-semibold text-cyan-700">Email:</span>{" "}
            {user.email}
          </div>
          <div>
            <span className="font-semibold text-cyan-700">NIF:</span> {user.nif}
          </div>
          <div>
            <span className="font-semibold text-cyan-700">Pedidos:</span>{" "}
            {user.ordersCount}
          </div>
          <div>
            <span className="font-semibold text-cyan-700">Roles:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.roles?.map((role) => (
                <span
                  key={role}
                  className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs"
                >
                  {role.replace("ROLE_", "")}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

/** PropTypes para validar las props del componente
 * @typedef {Object} UserDetailsModalProps
 * @property {boolean} open - Indica si el modal está abierto.
 * @property {function} onClose - Función para cerrar el modal.
 * @property {Object} user - Objeto con los detalles del usuario.
 * @property {string} user.username - Nombre de usuario.
 * @property {string} user.name - Nombre completo del usuario.
 * @property {string} user.email - Email del usuario.
 * @property {string} user.nif - NIF del usuario.
 * @property {number} user.ordersCount - Número de pedidos del usuario.
 * @property {Array<string>} user.roles - Roles del usuario.
 * @author Ángel Aragón
 */
UserDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    nif: PropTypes.string,
    ordersCount: PropTypes.number,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};
