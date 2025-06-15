import { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import TransferList from "./TransferList";
import PropTypes from "prop-types";

const ROLE_CLIENTE = "ROLE_CLIENTE";
const ROLE_ADMIN = "ROLE_ADMIN";

/**
 * Componente Modal para editar los roles de un usuario.
 * @param {Object} param0
 * @param {boolean} param0.open - Si el modal está abierto.
 * @param {Function} param0.onClose - Función para cerrar el modal.
 * @param {Object} param0.user - Usuario a editar.
 * @param {Array} param0.allRoles - Todos los roles disponibles.
 * @param {Function} param0.onSave - Función para guardar los cambios.
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function EditUserRolesModal({
  open,
  onClose,
  user,
  allRoles,
  onSave,
}) {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const fixedRoles = [];
  if (user?.roles?.includes(ROLE_CLIENTE)) fixedRoles.push(ROLE_CLIENTE);
  const isMainAdmin = user?.username === "admin";
  if (isMainAdmin && user?.roles?.includes(ROLE_ADMIN))
    fixedRoles.push(ROLE_ADMIN);

  useEffect(() => {
    if (user && allRoles.length) {
      setRight(
        (user.roles || []).filter(
          (role) =>
            ![ROLE_CLIENTE, ...(isMainAdmin ? [ROLE_ADMIN] : [])].includes(role)
        )
      );
      setLeft(
        allRoles
          .map((r) => r.name)
          .filter(
            (role) =>
              !user.roles.includes(role) &&
              ![ROLE_CLIENTE, ...(isMainAdmin ? [ROLE_ADMIN] : [])].includes(
                role
              )
          )
      );
    }
  }, [user, allRoles, isMainAdmin]);

  const handleSave = () => {
    onSave([...fixedRoles, ...right]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Editar roles de ${user?.username || ""}`}
      actions={
        <div className="flex gap-2">
          <Button
            text="Cancelar"
            onClick={onClose}
            bgColor="bg-gray-300"
            bgColorHover="hover:bg-gray-400"
          />
          <Button
            text="Guardar"
            onClick={handleSave}
            bgColor="bg-cyan-500"
            bgColorHover="hover:bg-cyan-600"
          />
        </div>
      }
    >
      <div className="mb-4 flex flex-col gap-4">
        {fixedRoles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {fixedRoles.map((role) => (
              <span
                key={role}
                className="bg-cyan-200 text-cyan-800 px-3 py-1 rounded-full text-xs font-semibold"
                title="Este rol no se puede modificar"
              >
                {role.replace("ROLE_", "")} (fijo)
              </span>
            ))}
          </div>
        )}
        <TransferList
          left={left}
          right={right}
          setLeft={setLeft}
          setRight={setRight}
          leftTitle="Roles disponibles"
          rightTitle="Roles asignados"
          renderItem={(role) => role.replace("ROLE_", "")}
        />
      </div>
    </Modal>
  );
}

/**
 * PropTypes para el componente EditUserRolesModal.
 * @type {Object}
 * @param {boolean} open - Si el modal está abierto.
 * @param {Function} onClose - Función para cerrar el modal.
 * @param {Object} user - Usuario a editar.
 * @param {Array} allRoles - Todos los roles disponibles.
 * @param {Function} onSave - Función para guardar los cambios.
 * @author Ángel Aragón
 */
EditUserRolesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allRoles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSave: PropTypes.func.isRequired,
};
