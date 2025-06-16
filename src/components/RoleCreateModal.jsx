import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { createRole } from "../services/api";
import PropTypes from "prop-types";
/**
 * Componente para crear un nuevo rol.
 * @param {Object} param0 - Propiedades del componente.
 * @param {boolean} param0.open - Indica si el modal está abierto.
 * @param {function} param0.onClose - Función para cerrar el modal.
 * @param {function} param0.onSuccess - Callback que se ejecuta al crear el rol correctamente.
 * @description Este componente permite crear un nuevo rol con un nombre único.
 * @returns {JSX.Element}
 */
export default function RoleCreateModal({ open, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    setSaving(true);
    try {
      await createRole({ name: name.trim() });
      setName("");
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Ya existe un rol con ese nombre"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Crear nuevo rol"
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
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="roleName"
          >
            Nombre del rol *
          </label>
          <input
            id="roleName"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
        </div>
      </form>
    </Modal>
  );
}

/**
 * PropTypes para validar las propiedades del componente RoleCreateModal.
 * @type {Object}
 * @param {boolean} open - Indica si el modal está abierto.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {function} [onSuccess] - Callback que se ejecuta al crear el rol correctamente.
 * @typedef {Object} RoleCreateModalProps
 * @property {boolean} open - Indica si el modal está abierto.
 * @property {function} onClose - Función para cerrar el modal.
 * @property {function} [onSuccess] - Callback que se ejecuta al crear el rol correctamente.
 * @returns {void}
 * @author Ángel Aragón
 */
RoleCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};
