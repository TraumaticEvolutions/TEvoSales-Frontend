import { useState, useEffect } from "react";
import OrderFilter from "../components/OrderFilter";
import List from "../components/List";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import OrderStatusBadge from "../components/OrderStatusBadge";
import { allOrdersRequest, updateOrderStatus } from "../services/api";
import { FaBoxOpen } from "react-icons/fa";
import OrderDetailsModal from "../components/OrderDetailsModal";
import OrderEditStatusModal from "../components/OrderEditStatusModal";
import SuccessMsg from "../components/SuccessMsg";
import ErrorMsg from "../components/ErrorMsg";

/**
 * Página de administración de pedidos.
 * Permite filtrar, listar y editar el estado de los pedidos.
 * Muestra detalles del pedido seleccionado en un modal.
 *
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function AdminOrders() {
  const [filters, setFilters] = useState({
    username: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    allOrdersRequest({ ...filters, page }).then((res) => {
      setOrders(res.content || []);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    });
  }, [filters, page]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "username", label: "Usuario", className: "hidden sm:table-cell" },
    {
      key: "createdAt",
      label: "Fecha",
      render: (row) =>
        new Date(row.createdAt).toLocaleString("es-ES", {
          dateStyle: "short",
        }),
    },
    {
      key: "address",
      label: "Dirección",
      className: "hidden sm:table-cell",
      render: (row) =>
        `${row.address || ""} ${row.number || ""}${
          row.floor ? ", " + row.floor : ""
        }`,
    },
    {
      key: "status",
      label: "Estado",
      render: (row) => <OrderStatusBadge status={row.status} />,
    },
    {
      key: "total",
      label: "Total (€)",
      className: "hidden sm:table-cell",
      render: (row) => row.total?.toFixed(2),
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <Button
          text={<FaBoxOpen size={14} />}
          ariaLabel="Editar estado"
          bgColor="bg-cyan-500"
          bgColorHover="hover:bg-cyan-600"
          className="flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            handleEditStatusClick(row);
          }}
        />
      ),
    },
  ];

  const rowProps = (row) => ({
    className: "cursor-pointer transition hover:bg-cyan-50",
    onClick: () => {
      setSelectedOrder(row);
      setModalOpen(true);
    },
  });

  const ORDER_STATUS_OPTIONS = [
    { value: "PENDIENTE", label: "Pendiente" },
    { value: "CONFIRMADO", label: "Confirmado" },
    { value: "ENVIADO", label: "Enviado" },
    { value: "ENTREGADO", label: "Entregado" },
    { value: "CANCELADO", label: "Cancelado" },
  ];

  const handleEditStatusClick = (order) => {
    setOrderToEdit(order);
    setNewStatus(order.status);
    setEditModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!orderToEdit) return;
    setSaving(true);
    try {
      await updateOrderStatus(orderToEdit.id, newStatus);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderToEdit.id ? { ...o, status: newStatus } : o
        )
      );
      setEditModalOpen(false);
      setOrderToEdit(null);
      setSuccessMsg("¡Estado actualizado correctamente!");
      setTimeout(() => setSuccessMsg(""), 4000);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErrorMsg("Error al actualizar el estado del pedido");
      setTimeout(() => setErrorMsg(""), 4000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <section className="min-h-screen py-8 px-2 flex flex-col items-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
        <h2 className="text-2xl font-bold text-cyan-700 mb-6 text-center">
          Gestión de pedidos
        </h2>
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <OrderFilter filters={filters} onChange={setFilters} />
        {loading ? (
          <div className="text-cyan-700 font-semibold my-10">Cargando...</div>
        ) : (
          <>
            <List columns={columns} data={orders} rowProps={rowProps} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
      <OrderDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        order={selectedOrder}
      />
      <OrderEditStatusModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        order={orderToEdit}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        onSave={handleSaveStatus}
        saving={saving}
      />
    </>
  );
}
