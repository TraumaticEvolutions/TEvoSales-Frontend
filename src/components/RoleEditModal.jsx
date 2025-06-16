import { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { updateRole } from "../services/api";
import PropTypes from "prop-types";
/** * Componente para editar un rol existente.
 * Permite modificar el nombre del rol.
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {Object} props.role - Objeto con los datos del rol a editar.
 * @param {function} props.onSuccess - Callback que se ejecuta al guardar correctamente.
 * @returns {JSX.Element}
 */
export default function RoleEditModal({ open, onClose, role, onSuccess }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(role ? role.name.replace(/^ROLE_/, "") : "");
    setError("");
  }, [role, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (name && !name.trim()) {
      setError("El nombre no puede ser solo espacios");
      return;
    }
    setSaving(true);
    try {
      await updateRole(role.id, name ? { name: name.trim() } : {});
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Error al editar el rol. ¿Ya existe ese nombre?"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Editar rol"
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
        <div>
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="editRoleName"
          >
            Nombre del rol
          </label>
          <input
            id="editRoleName"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Dejar vacío para no modificar"
          />
          {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
        </div>
      </form>
    </Modal>
  );
}

/** * PropTypes para validar las propiedades del componente RoleEditModal.
 * @typedef {Object} RoleEditModalProps
 * @property {boolean} open - Indica si el modal está abierto.
 * @property {function} onClose - Función para cerrar el modal.
 * @property {Object} role - Objeto con los datos del rol a editar.
 * @property {function} [onSuccess] - Callback que se ejecuta al guardar correctamente.
 */
RoleEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  role: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};
