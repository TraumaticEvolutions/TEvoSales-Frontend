import { useEffect, useState } from "react";
import ProductFilters from "../components/ProductFilters";
import List from "../components/List";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import { allProductsRequest, deleteProduct } from "../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ProductDetailsModal from "../components/ProductDetailsModal";
import ProductCreateModal from "../components/ProductCreateModal";
import ProductEditModal from "../components/ProductEditModal";
import ProductDeleteModal from "../components/ProductDeleteModal";
import SuccessMsg from "../components/SuccessMsg";

/**
 * Página de administración de productos.
 * Permite filtrar y listar productos.
 * @author Ángel Aragón
 */
export default function AdminProducts() {
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    category: "",
    sort: "id,asc",
  });
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    allProductsRequest({ ...filters, page }).then((res) => {
      setProducts(res.content || []);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    });
  }, [filters, page]);

  const columns = [
    { key: "name", label: "Nombre" },
    { key: "brand", label: "Marca", className: "hidden sm:table-cell" },
    { key: "category", label: "Categoría", className: "hidden sm:table-cell" },
    {
      key: "price",
      label: "Precio (€)",
      render: (row) => row.price?.toFixed(2),
    },
    { key: "stock", label: "Stock" },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <div className="flex gap-2 justify-end">
          <Button
            text={<FaEdit size={14} />}
            ariaLabel="Editar producto"
            bgColor="bg-cyan-500"
            bgColorHover="hover:bg-cyan-600"
            className="flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setProductToEdit(row);
              setEditModalOpen(true);
            }}
          />
          <Button
            text={<FaTrash size={14} />}
            ariaLabel="Eliminar producto"
            bgColor="bg-red-500"
            bgColorHover="hover:bg-red-600"
            className="flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setProductToDelete(row);
              setDeleteModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  // Añade rowProps para List:
  const rowProps = (row) => ({
    className: "cursor-pointer transition hover:bg-cyan-50",
    onClick: () => {
      setSelectedProduct(row);
      setModalOpen(true);
    },
  });

  // Refresca productos tras crear uno nuevo
  const handleProductCreated = () => {
    setSuccessMsg("¡Producto creado correctamente!");
    setCreateModalOpen(false);
    // Refresca la lista
    allProductsRequest({ ...filters, page }).then((res) => {
      setProducts(res.content || []);
      setTotalPages(res.totalPages || 1);
    });
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Al guardar edición, refresca productos y muestra mensaje de éxito
  const handleProductEdited = () => {
    setSuccessMsg("¡Producto editado correctamente!");
    setEditModalOpen(false);
    setProductToEdit(null);
    allProductsRequest({ ...filters, page }).then((res) => {
      setProducts(res.content || []);
      setTotalPages(res.totalPages || 1);
    });
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleProductDeleted = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      setSuccessMsg("¡Producto eliminado correctamente!");
      setDeleteModalOpen(false);
      setProductToDelete(null);
      // Refresca la lista
      allProductsRequest({ ...filters, page }).then((res) => {
        setProducts(res.content || []);
        setTotalPages(res.totalPages || 1);
      });
      setTimeout(() => setSuccessMsg(""), 4000);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setSuccessMsg("Error al eliminar el producto");
      setTimeout(() => setSuccessMsg(""), 4000);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="min-h-screen py-8 px-2 flex flex-col items-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
      <h2 className="text-2xl font-bold text-cyan-700 mb-6 text-center">
        Gestión de productos
      </h2>
      {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
      <div className="mb-6 w-full max-w-3xl">
        <ProductFilters
          filters={filters}
          onChange={(e) => {
            if (e.target) {
              const { name, value } = e.target;
              setFilters((prev) => ({ ...prev, [name]: value }));
            } else {
              setFilters(e);
            }
          }}
        />
        <div className="flex justify-end mt-6">
          <Button
            text={
              <span className="flex items-center gap-2">
                <FaPlus /> Crear producto
              </span>
            }
            ariaLabel="Crear producto"
            bgColor="bg-green-500"
            bgColorHover="hover:bg-green-600"
            onClick={() => setCreateModalOpen(true)}
          />
        </div>
      </div>
      {loading ? (
        <div className="text-cyan-700 font-semibold my-10">Cargando...</div>
      ) : (
        <>
          <List columns={columns} data={products} rowProps={rowProps} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
      {modalOpen && (
        <ProductDetailsModal
          open={modalOpen}
          product={selectedProduct}
          onClose={() => setModalOpen(false)}
        />
      )}
      <ProductCreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleProductCreated}
      />
      <ProductEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={productToEdit}
        onSuccess={handleProductEdited}
      />
      <ProductDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        product={productToDelete}
        onConfirm={handleProductDeleted}
        deleting={deleting}
      />
    </section>
  );
}
