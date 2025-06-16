import Modal from "./Modal";
import Button from "./Button";
import {
  FaTag,
  FaBoxes,
  FaEuroSign,
  FaIndustry,
  FaLayerGroup,
} from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * Muestra los detalles de un producto en un modal.
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Si el modal está abierto.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Object} props.product - Detalles del producto a mostrar.
 * @param {string} [props.product.description] - Descripción del producto.
 * @param {number} props.product.id - ID del producto.
 * @param {string} props.product.name - Nombre del producto.
 * @param {string} props.product.brand - Marca del producto.
 * @param {string} props.product.category - Categoría del producto.
 * @param {number} props.product.price - Precio del producto.
 * @param {number} props.product.stock - Stock del producto.
 * @param {string} [props.product.imagePath] - Ruta de la imagen del producto.
 * @author Ángel Aragón
 * @returns {JSX.Element|null}
 */
export default function ProductDetailsModal({ open, onClose, product }) {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Detalles del producto #${product.id ?? ""}`}
      actions={
        <Button
          text="Cerrar"
          onClick={onClose}
          bgColor="bg-cyan-500"
          bgColorHover="hover:bg-cyan-600"
        />
      }
      className="max-w-lg"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="w-full flex justify-center">
          <img
            src={
              product.imagePath
                ? product.imagePath
                : "https://placehold.co/400?text=Imagen+no+disponible&font=playfair-display"
            }
            alt={product.name}
            className="max-h-48 rounded shadow"
          />
        </div>
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2">
            <FaTag className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Nombre:</span>
            <span>{product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaIndustry className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Marca:</span>
            <span>{product.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLayerGroup className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Categoría:</span>
            <span>{product.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEuroSign className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Precio:</span>
            <span>{product.price?.toFixed(2)} €</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBoxes className="text-cyan-600" />
            <span className="font-semibold text-cyan-700">Stock:</span>
            <span>{product.stock}</span>
          </div>
          {product.description && (
            <div>
              <span className="font-semibold text-cyan-700">Descripción:</span>
              <div className="text-gray-700 mt-1">{product.description}</div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

/**
 * PropTypes para validar las propiedades del componente ProductDetailsModal.
 * @typedef {Object} ProductDetailsModalProps
 * @property {boolean} open - Indica si el modal está abierto.
 * @property {Function} onClose - Función para cerrar el modal.
 * @property {Object} product - Detalles del producto a mostrar.
 * @property {string} [product.description] - Descripción del producto.
 * @property {number} product.id - ID del producto.
 * @property {string} product.name - Nombre del producto.
 * @property {string} product.brand - Marca del producto.
 * @property {string} product.category - Categoría del producto.
 * @property {number} product.price - Precio del producto.
 * @property {number} product.stock - Stock del producto.
 * @property {string} [product.imagePath] - Ruta de la imagen del producto.
 * @author Ángel Aragón
 */
ProductDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imagePath: PropTypes.string,
    description: PropTypes.string,
  }),
};
