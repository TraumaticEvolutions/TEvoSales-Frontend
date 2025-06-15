import { useState, useEffect } from "react";

export default function Filters({
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
