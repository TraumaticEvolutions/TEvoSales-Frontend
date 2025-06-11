import { Link } from "react-router-dom";

/**
 * Componente visual que representa una tarjeta de producto en el marketplace.
 * Muestra el nombre, marca, precio, imagen y la categoría como badge.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.product - Objeto con la información del producto.
 * @param {string} props.product.name - Nombre del producto.
 * @param {string} props.product.brand - Marca del producto.
 * @param {number} props.product.price - Precio del producto.
 * @param {string} props.product.id - ID del producto (para redirección).
 * @param {string} [props.product.image] - Imagen de fondo del producto (base64 o URL).
 * @param {string} [props.product.category] - Categoría del producto.
 *
 * @returns {JSX.Element}
 */
const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
    >
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: product.imagePath
            ? `url(${product.imagePath})`
            : "url('https://placehold.co/800?text=Placeholder+Image&font=playfair-display')",
        }}
      >
        {product.category && (
          <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
            {product.category}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-xl font-bold text-teal-600 mt-2">
          {product.price.toFixed(2)} €
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
