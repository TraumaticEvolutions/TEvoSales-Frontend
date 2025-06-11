import { useEffect, useState } from "react";
import { allProductsRequest } from "../services/api";
import ProductFilters from "../components/ProductFilters";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import bg2 from "../assets/bg2.png"; // Ajusta la ruta si es necesario

export default function ProductsPage() {
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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        name: filters.name,
        brand: filters.brand,
        category: filters.category,
        sort: filters.sort,
      };
      const res = await allProductsRequest(params);
      setProducts(res.content);
      setTotalPages(res.totalPages);
    } catch (e) {
      setProducts([]);
      console.error("Error al obtener los productos:", e);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [page, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(0);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Fondo con blur */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg2})`,
          filter: "blur(6px) brightness(0.85)",
        }}
        aria-hidden="true"
      />
      {/* Capa de oscurecimiento sutil */}
      <div className="fixed inset-0 -z-10 bg-white/40" aria-hidden="true" />

      <div className="max-w-7xl mx-auto py-10 px-2">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-primary drop-shadow-lg">
          Catálogo de Productos
        </h1>
        <div className="mb-10">
          <ProductFilters filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="rounded-3xl bg-white/80 shadow-2xl p-6 md:p-10 backdrop-blur-md">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="text-lg text-gray-500 animate-pulse">
                Cargando productos...
              </span>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <span className="text-lg text-gray-400">
                No se encontraron productos.
              </span>
            </div>
          ) : (
            <>
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
