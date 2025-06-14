import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
/**
 * Componente para abrir un modal con título, contenido y acciones.
 *
 * @export
 * @param {{ open: boolean; onClose: () => void; title: string; children: ReactNode; actions: ReactNode; }} param0
 * @param {boolean} param0.open
 * @param {() => void} param0.onClose
 * @param {string} param0.title
 * @param {ReactNode} param0.children
 * @param {ReactNode} param0.actions
 * @returns {JSX.Element | null}
 * @author Ángel Aragón
 */
export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null;

  return (
    <article className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Cerrar"
        >
          <IoMdClose />
        </button>
        {title && (
          <h2 className="text-xl font-bold text-primary mb-4">{title}</h2>
        )}
        <div className="mb-6">{children}</div>
        {actions && <div className="flex justify-end gap-2">{actions}</div>}
      </div>
    </article>
  );
}

/** PropTypes para el componente Modal
 * @typedef {Object} ModalProps
 * @property {boolean} open - Indica si el modal está abierto.
 * @property {function} onClose - Función para cerrar el modal.
 * @property {string} [title] - Título del modal.
 * @property {React.ReactNode} children - Contenido del modal.
 * @property {React.ReactNode} [actions] - Acciones del modal, como botones.
 * @author Ángel Aragón
 */
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
};
