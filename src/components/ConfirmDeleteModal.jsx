import Modal from "./Modal";
import Button from "./Button";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * Modal genérico de confirmación de borrado.
 * @param {object} props
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {function} props.onConfirm
 * @param {boolean} [props.deleting]
 * @param {string} props.resourceName - Ej: "producto", "usuario"
 * @param {string} props.itemName - Ej: nombre o identificador del recurso
 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  deleting = false,
  resourceName = "elemento",
  itemName = "",
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2 text-red-600">
          <FaTrash /> Eliminar {resourceName}
        </span>
      }
      actions={
        <>
          <Button
            text="Cancelar"
            onClick={onClose}
            bgColor="bg-gray-300"
            bgColorHover="hover:bg-gray-400"
            disabled={deleting}
          />
          <Button
            text={deleting ? "Eliminando..." : "Eliminar"}
            onClick={onConfirm}
            bgColor="bg-red-500"
            bgColorHover="hover:bg-red-600"
            disabled={deleting}
          />
        </>
      }
    >
      <div>
        ¿Estás seguro de que deseas eliminar el {resourceName}{" "}
        <span className="font-semibold">{itemName}</span>?
        <br />
        Esta acción no se puede deshacer.
      </div>
    </Modal>
  );
}

/**
 * PropTypes para ConfirmDeleteModal
 * @typedef {Object} ConfirmDeleteModalProps
 * @property {boolean} open - Si el modal está abierto.
 * @property {function} onClose - Función para cerrar el modal.
 * @property {function} onConfirm - Función a ejecutar al confirmar el borrado.
 * @property {boolean} [deleting] - Si se está realizando la acción de borrado.
 * @property {string} resourceName - Nombre del recurso a eliminar (ej: "producto").
 * @property {string} itemName - Nombre o identificador del recurso a eliminar.
 */
ConfirmDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  deleting: PropTypes.bool,
  resourceName: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
};
