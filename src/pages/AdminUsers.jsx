import { useEffect, useState } from "react";
import UserFilter from "../components/UserFilter";
import List from "../components/List";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import {
  getUsersRequest,
  getRolesRequest,
  updateUserRoles,
  deleteUser,
} from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditUserRolesModal from "../components/EditUserRolesModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import UserDetailsModal from "../components/UserDetailsModal";
import SuccessMsg from "../components/SuccessMsg";
import ErrorMsg from "../components/ErrorMsg";

/**
 * Componente para la administración de usuarios.
 * * Permite filtrar, editar y eliminar usuarios.
 * * Utiliza componentes como `Filter`, `List`, `Pagination` y `Modal` para la UI.
 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function AdminUsers() {
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    nif: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getRolesRequest().then(setRoles);
  }, []);

  useEffect(() => {
    setLoading(true);
    getUsersRequest({ ...filters, page }).then((res) => {
      setUsers(res.content || []);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    });
  }, [filters, page]);

  const handleEditClick = (user) => {
    setEditUser(user);
    setEditModalOpen(true);
  };

  const handleSaveRoles = async (newRoles) => {
    if (!editUser) return;
    try {
      await updateUserRoles(editUser.id, newRoles);
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...u, roles: newRoles } : u))
      );
      setSuccessMsg("¡Roles actualizados correctamente!");
      setEditModalOpen(false);
      setEditUser(null);
      setTimeout(() => setSuccessMsg(""), 4000);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMsg("Error al actualizar los roles del usuario");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setSuccessMsg("¡Usuario eliminado correctamente!");
      setDeleteModalOpen(false);
      setUserToDelete(null);
      setTimeout(() => setSuccessMsg(""), 4000);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMsg("Error al eliminar el usuario");
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const columns = [
    { key: "username", label: "Usuario" },
    { key: "name", label: "Nombre" },
    {
      key: "actions",
      render: (row) => (
        <div className="flex gap-2 justify-end">
          <Button
            text={<FaEdit size={12} />}
            ariaLabel="Editar usuario"
            bgColor="bg-cyan-500"
            bgColorHover="hover:bg-cyan-600"
            className="flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(row);
            }}
          />
          <Button
            text={<FaTrash size={12} />}
            ariaLabel="Eliminar usuario"
            bgColor="bg-red-500"
            bgColorHover="hover:bg-red-600"
            className="flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(row);
            }}
            disabled={row.username === "admin"}
          />
        </div>
      ),
    },
  ];

  const rowProps = (row) => ({
    className: `${
      row.roles?.includes("ROLE_ADMIN") ? "bg-teal-200/40" : ""
    } cursor-pointer transition hover:bg-cyan-50`,
    onClick: () => {
      setSelectedUser(row);
      setModalOpen(true);
    },
  });

  return (
    <>
      <section className="min-h-screen py-8 px-2 flex flex-col items-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
        <h2 className="text-2xl font-bold text-cyan-700 mb-6 text-center">
          Gestión de usuarios
        </h2>
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <UserFilter
          filters={filters}
          onChange={setFilters}
          roleOptions={roles}
          showRole
        />
        {loading ? (
          <div className="text-cyan-700 font-semibold my-10">Cargando...</div>
        ) : (
          <>
            <List columns={columns} data={users} rowProps={rowProps} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}

        <UserDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          user={selectedUser}
        />

        <EditUserRolesModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={editUser}
          allRoles={roles}
          onSave={handleSaveRoles}
        />
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          deleting={false}
          resourceName="usuario"
          itemName={userToDelete?.username}
        />
      </section>
    </>
  );
}
