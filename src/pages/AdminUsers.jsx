import { useEffect, useState } from "react";
import UserFilter from "../components/UserFilter";
import List from "../components/List";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import Button from "../components/Button";
import {
  getUsersRequest,
  getRolesRequest,
  updateUserRoles,
  deleteUser,
} from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditUserRolesModal from "../components/EditUserRolesModal";

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
    } catch (err) {
      console.error("Error actualizando roles:", err);
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
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Error borrando usuario:", err);
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

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`Detalles de ${selectedUser?.username || ""}`}
          actions={
            <Button
              text="Cerrar"
              onClick={() => setModalOpen(false)}
              bgColor="bg-cyan-500"
              bgColorHover="hover:bg-cyan-600"
            />
          }
        >
          {selectedUser && (
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-cyan-700">Usuario:</span>{" "}
                {selectedUser.username}
              </div>
              <div>
                <span className="font-semibold text-cyan-700">Nombre:</span>{" "}
                {selectedUser.name}
              </div>
              <div>
                <span className="font-semibold text-cyan-700">Email:</span>{" "}
                {selectedUser.email}
              </div>
              <div>
                <span className="font-semibold text-cyan-700">NIF:</span>{" "}
                {selectedUser.nif}
              </div>
              <div>
                <span className="font-semibold text-cyan-700">Pedidos:</span>{" "}
                {selectedUser.ordersCount}
              </div>
              <div>
                <span className="font-semibold text-cyan-700">Roles:</span>{" "}
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedUser.roles?.map((role) => (
                    <span
                      key={role}
                      className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs"
                    >
                      {role.replace("ROLE_", "")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </section>
      <EditUserRolesModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={editUser}
        allRoles={roles}
        onSave={handleSaveRoles}
      />
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirmar eliminación"
        actions={
          <div className="flex justify-end gap-2">
            <Button
              text="Cancelar"
              onClick={() => setDeleteModalOpen(false)}
              bgColor="bg-gray-300"
              bgColorHover="hover:bg-gray-400"
            />
            <Button
              text="Eliminar"
              onClick={handleConfirmDelete}
              bgColor="bg-red-500"
              bgColorHover="hover:bg-red-600"
            />
          </div>
        }
      >
        <div className="text-center py-4">
          <p className="text-sm text-gray-700">
            ¿Estás seguro de que deseas eliminar a{" "}
            <span className="font-semibold text-cyan-700">
              {userToDelete?.username}
            </span>
            ?
          </p>
        </div>
      </Modal>
    </>
  );
}
