import { useEffect, useState } from "react";
import List from "../components/List";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import SuccessMsg from "../components/SuccessMsg";
import ErrorMsg from "../components/ErrorMsg";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import RoleCreateModal from "../components/RoleCreateModal";
import RoleEditModal from "../components/RoleEditModal";
import { getRolesRequestPaged, deleteRole } from "../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function removeRolePrefix(roleName) {
  return roleName.replace(/^ROLE_/, "");
}

/**
 * Componente para la gestión de roles de administrador
 * Permite crear, editar, eliminar y listar roles.
 * Incluye filtros de búsqueda por nombre de rol.
 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function AdminRoles() {
  const [filters, setFilters] = useState({ name: "" });
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    getRolesRequestPaged({ ...filters, page }).then((res) => {
      setRoles(res.content || []);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    });
  }, [filters, page]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, name: e.target.value });
    setPage(0);
  };

  const handleRoleCreated = () => {
    try {
      setSuccessMsg("¡Rol creado correctamente!");
      setCreateModalOpen(false);
      getRolesRequestPaged({ ...filters, page }).then((res) => {
        setRoles(res.content || []);
        setTotalPages(res.totalPages || 1);
      });
      setTimeout(() => setSuccessMsg(""), 4000);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMsg("Error al crear el rol");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const handleRoleEdited = () => {
    try {
      setSuccessMsg("¡Rol editado correctamente!");
      setEditModalOpen(false);
      setRoleToEdit(null);
      getRolesRequestPaged({ ...filters, page }).then((res) => {
        setRoles(res.content || []);
        setTotalPages(res.totalPages || 1);
      });
      setTimeout(() => setSuccessMsg(""), 4000);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMsg("Error al editar el rol");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const handleDeleteRole = async () => {
    if (!roleToDelete) return;
    setDeleting(true);
    try {
      await deleteRole(roleToDelete.id);
      setSuccessMsg("¡Rol eliminado correctamente!");
      setDeleteModalOpen(false);
      setRoleToDelete(null);
      getRolesRequestPaged({ ...filters, page }).then((res) => {
        setRoles(res.content || []);
        setTotalPages(res.totalPages || 1);
      });
      setTimeout(() => setSuccessMsg(""), 4000);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMsg("Error al eliminar el rol");
      setTimeout(() => setSuccessMsg(""), 4000);
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (row) => row.id,
    },
    {
      key: "name",
      label: "Nombre del rol",
      render: (row) => removeRolePrefix(row.name),
    },
    {
      key: "actions",
      label: "",
      render: (row) => {
        const baseName = removeRolePrefix(row.name).toUpperCase();
        const isProtected =
          baseName === "ADMIN" ||
          baseName === "CLIENTE" ||
          baseName === "ENTIDAD";
        return (
          <div className="flex gap-2 justify-end">
            <Button
              text={<FaEdit size={14} />}
              ariaLabel="Editar rol"
              bgColor="bg-cyan-500"
              bgColorHover="hover:bg-cyan-600"
              className="flex items-center justify-center"
              onClick={(e) => {
                if (isProtected) return;
                e.stopPropagation();
                setRoleToEdit(row);
                setEditModalOpen(true);
              }}
              disabled={isProtected}
            />
            <Button
              text={<FaTrash size={14} />}
              ariaLabel="Eliminar rol"
              bgColor="bg-red-500"
              bgColorHover="hover:bg-red-600"
              className="flex items-center justify-center"
              onClick={(e) => {
                if (isProtected) return;
                e.stopPropagation();
                setRoleToDelete(row);
                setDeleteModalOpen(true);
              }}
              disabled={isProtected}
            />
          </div>
        );
      },
    },
  ];

  return (
    <section className="min-h-screen py-8 px-2 flex flex-col items-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
      <h2 className="text-2xl font-bold text-cyan-700 mb-6 text-center">
        Gestión de roles
      </h2>
      {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      <div className="mb-6 w-full max-w-3xl bg-white rounded-2xl p-4 shadow-md flex flex-col items-center justify-center">
        <form
          className="flex flex-col sm:flex-row gap-2 items-center w-full justify-around"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="roleFilter"
              className="block text-sm font-semibold text-cyan-700 mb-1 sm:mb-0"
            >
              Filtrar por nombre de rol
            </label>
            <input
              id="roleFilter"
              type="text"
              name="name"
              placeholder="Buscar por nombre de rol"
              value={filters.name}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2 w-full sm:w-64"
            />
          </div>
          <Button
            text={
              <span className="flex items-center gap-2">
                <FaPlus /> Crear rol
              </span>
            }
            ariaLabel="Crear rol"
            bgColor="bg-green-500"
            bgColorHover="hover:bg-green-600"
            onClick={() => setCreateModalOpen(true)}
          />
        </form>
      </div>
      {loading ? (
        <div className="text-cyan-700 font-semibold my-10">Cargando...</div>
      ) : (
        <>
          <List columns={columns} data={roles} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <RoleCreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleRoleCreated}
      />

      <RoleEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        role={roleToEdit}
        onSuccess={handleRoleEdited}
      />

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteRole}
        deleting={deleting}
        resourceName="rol"
        itemName={roleToDelete?.name ? removeRolePrefix(roleToDelete.name) : ""}
      />
    </section>
  );
}
