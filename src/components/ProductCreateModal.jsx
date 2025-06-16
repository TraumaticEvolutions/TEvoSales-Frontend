import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { createProduct } from "../services/api";
import PropTypes from "prop-types";

const initialForm = {
  imagePath: "",
  name: "",
  description: "",
  price: "",
  stock: "",
  brand: "",
  category: "",
};

/**
 * Componente para crear un nuevo producto.
 * Permite al usuario ingresar los detalles del producto y enviarlos para su creación.
 * @param {Object} props - Props del componente.
 * @param {boolean} props.open - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {function} props.onSuccess - Función a llamar al crear el producto.
 * @returns {JSX.Element} - Componente modal para crear un producto.
 * @author Ángel Aragón
 */
export default function ProductCreateModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!form.description.trim())
      newErrors.description = "La descripción es obligatoria";
    if (!form.price || isNaN(form.price) || Number(form.price) < 1)
      newErrors.price = "El precio debe ser mayor que 0";
    if (form.stock === "" || isNaN(form.stock) || Number(form.stock) < 0)
      newErrors.stock = "El stock no puede ser negativo";
    if (!form.brand.trim()) newErrors.brand = "La marca es obligatoria";
    if (!form.category.trim())
      newErrors.category = "La categoría es obligatoria";
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
      await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setForm(initialForm);
      setErrors({});
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setErrors({
        general: err?.response?.data?.message || "Error al crear el producto",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Crear nuevo producto"
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
            text={saving ? "Guardando..." : "Crear"}
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
            Nombre *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.name && (
            <div className="text-red-600 text-xs">{errors.name}</div>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="description"
          >
            Descripción *
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.description && (
            <div className="text-red-600 text-xs">{errors.description}</div>
          )}
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1" htmlFor="price">
              Precio (€) *
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
              required
            />
            {errors.price && (
              <div className="text-red-600 text-xs">{errors.price}</div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1" htmlFor="stock">
              Stock *
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
              required
            />
            {errors.stock && (
              <div className="text-red-600 text-xs">{errors.stock}</div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1" htmlFor="brand">
            Marca *
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            value={form.brand}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.brand && (
            <div className="text-red-600 text-xs">{errors.brand}</div>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="category"
          >
            Categoría *
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.category && (
            <div className="text-red-600 text-xs">{errors.category}</div>
          )}
        </div>
      </form>
    </Modal>
  );
}

/**
 * PropTypes para ProductCreateModal
 * @type {Object}
 * @property {boolean} open - Indica si el modal está abierto.
 * @property {function} onClose - Función para cerrar el modal.
 * @property {function} [onSuccess] - Función a llamar al crear el producto exitosamente.
 * @author Ángel Aragón
 */
ProductCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};
