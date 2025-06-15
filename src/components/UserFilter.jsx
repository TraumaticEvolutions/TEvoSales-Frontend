import { useState, useEffect } from "react";
import PropTypes from "prop-types";
/**
 * Componente para filtrar usuarios por diferentes criterios.
 * Permite filtrar por nombre de usuario, email, NIF y rol.
 * @param {Object} props
 * @param {Object} props.filters - Filtros actuales.
 * @param {Function} props.onChange - Función que se llama al cambiar los filtros.
 * @param {Array} [props.roleOptions] - Opciones de roles para el filtro de rol.
 * @param {boolean} [props.showRole=false] - Si se muestra el filtro de rol.
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function UserFilter({
  filters,
  onChange,
  roleOptions = [],
  showRole = false,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...localFilters, [name]: value };
    setLocalFilters(updated);
    onChange(updated);
  };

  return (
    <form className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-6 w-full max-w-3xl">
      <div className="font-semibold text-primary text-lg mb-2">
        Filtrar usuarios
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={localFilters.username || ""}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={localFilters.email || ""}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
        />
        <input
          type="text"
          name="nif"
          placeholder="NIF"
          value={localFilters.nif || ""}
          onChange={handleChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
        />
        {showRole && (
          <select
            name="role"
            value={localFilters.role || ""}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-1 border-gray-300"
          >
            <option value="">Todos los roles</option>
            {roleOptions.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name.replace("ROLE_", "")}
              </option>
            ))}
          </select>
        )}
      </div>
    </form>
  );
}

/**
 * PropTypes para UserFilter
 * @typedef {Object} UserFilterProps
 * @property {Object} filters - Filtros actuales.
 * @property {Function} onChange - Función que se llama al cambiar los filtros.
 * @property {Array<{ id: number, name: string }>} [roleOptions] - Opciones de roles para el filtro de rol.
 * @property {boolean} [showRole=false] - Si se muestra el filtro de rol.
 * @author Ángel Aragón
 */
UserFilter.propTypes = {
  filters: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    nif: PropTypes.string,
    role: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  showRole: PropTypes.bool,
};
