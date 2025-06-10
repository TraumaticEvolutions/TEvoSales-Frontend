import { useEffect, useState } from "react";
import { allProductsRequest } from "../services/api";
import ProductFilters from "../components/ProductFilters";
import Pagination from "../components/Pagination"; // Asegúrate de tener este componente
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [filters, setFilters] = useState({ name: "", brand: "", category: "" });
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
      };
      const res = await allProductsRequest(params);
      setProducts(res.content);
      setTotalPages(res.totalPages);
    } catch (e) {
      setProducts([]);
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
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800 drop-shadow">
        Catálogo de Productos
      </h1>
      <div className="mb-8">
        <ProductFilters filters={filters} onChange={handleFilterChange} />
      </div>
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
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  );
}
