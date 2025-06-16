import Modal from "./Modal";
import Button from "./Button";
import { FaTrash } from "react-icons/fa";

export default function ProductDeleteModal({ open, onClose, product, onConfirm, deleting }) {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2 text-red-600">
          <FaTrash /> Eliminar producto
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
        ¿Estás seguro de que deseas eliminar el producto{" "}
        <span className="font-semibold">{product.name}</span>?
        <br />
        Esta acción no se puede deshacer.
      </div>
    </Modal>
  );
}