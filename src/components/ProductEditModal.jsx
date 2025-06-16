import { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { FaEdit } from "react-icons/fa";
import { updateProduct } from "../services/api";
import PropTypes from "prop-types";

/**
 * Componente modal para editar un producto.
 * @param {Object} param0 - Props del componente
 * @param {boolean} param0.open - Indica si el modal está abierto.
 * @param {function} param0.onClose - Función para cerrar el modal.
 * @param {object} param0.product - Objeto con los detalles del producto a editar.
 * @param {function} param0.onSuccess - Función a llamar al guardar el producto.
 * @param {string} param0.product.imagePath - URL o ruta de la imagen del producto.
 * @param {string} param0.product.name - Nombre del producto.
 * @param {string} param0.product.description - Descripción del producto.
 * @param {number} param0.product.price - Precio del producto.
 * @param {number} param0.product.stock - Stock del producto.
 * @param {string} param0.product.brand - Marca del producto.
 * @param {string} param0.product.category - Categoría del producto.
 * @returns {JSX.Element} - Componente modal para editar un producto.
 * @author Ángel Aragón
 */
export default function ProductEditModal({
  open,
  onClose,
  product,
  onSuccess,
}) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        imagePath: product.imagePath || "",
        name: product.name || "",
        description: product.description || "",
        price: product.price !== undefined ? product.price : "",
        stock: product.stock !== undefined ? product.stock : "",
        brand: product.brand || "",
        category: product.category || "",
      });
      setErrors({});
    }
  }, [product, open]);

  const validate = () => {
    const newErrors = {};
    if (form.imagePath.trim()) {
      const validUrl = /^https?:\/\/.+/i;
      const validExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;
      if (!validUrl.test(form.imagePath.trim())) {
        newErrors.imagePath = "Debe empezar por http:// o https://";
      } else if (!validExtensions.test(form.imagePath.trim())) {
        newErrors.imagePath =
          "Debe terminar en una extensión de imagen válida (.jpg, .png, .webp, etc.)";
      }
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSaving(true);
    try {
      await updateProduct(product.id, {
        ...form,
        price: form.price === "" ? "" : Number(form.price),
        stock: form.stock === "" ? "" : Number(form.stock),
      });
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setErrors({
        general: err?.response?.data?.message || "Error al editar el producto",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <FaEdit /> Editar producto
        </span>
      }
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
            onClick={handleSubmit}
            bgColor="bg-cyan-500"
            bgColorHover="hover:bg-cyan-600"
            disabled={saving}
          />
        </>
      }
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="text-red-600 text-sm mb-2">{errors.general}</div>
        )}
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="imagePath"
          >
            Imagen (URL o ruta)
          </label>
          <input
            id="imagePath"
            name="imagePath"
            type="text"
            value={form.imagePath}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://..."
          />
          {errors.imagePath && (
            <div className="text-red-600 text-xs">{errors.imagePath}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1" htmlFor="price">
              Precio (€)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={1}
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min={0}
              step="1"
              value={form.stock}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="brand">
            Marca
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            value={form.brand}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="category"
          >
            Categoría
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </form>
    </Modal>
  );
}

/**
 * PropTypes para validar las props del componente ProductEditModal.
 * @property {boolean} open - Indica si el modal está abierto.
 * @property {function} onClose - Función para cerrar el modal.
 * @property {object} product - Objeto con los detalles del producto a editar.
 * @property {string} product.imagePath - URL o ruta de la imagen del producto.
 * @property {string} product.name - Nombre del producto.
 * @property {string} product.description - Descripción del producto.
 * @property {number} product.price - Precio del producto.
 * @property {number} product.stock - Stock del producto.
 * @property {string} product.brand - Marca del producto.
 * @property {string} product.category - Categoría del producto.
 * @author Ángel Aragón
 */
ProductEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imagePath: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
    brand: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onSuccess: PropTypes.func,
};
