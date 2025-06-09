import { useAuth } from "../context/useAuth";
import bg1 from "../assets/bg1.png";
import { randomProductsRequest } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Button from "../components/Button";
/**
 * Página principal del Marketplace
 *
 * @returns {JSX.Element} Componente de la página principal
 * @author Ángel Aragón
 */
export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    randomProductsRequest().then(setProducts);
  }, []);
  return (
    <>
      <section className="text-center px-4 py-12 bg-gradient-to-r from-[#a7e8f2] via-[#ebfcff] to-white">
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
          Bienvenido a TEvoSales{user ? ", " + user.sub : ""}
        </h1>
        <p className="text-lg text-gray-600">
          Especialistas en productos de traumatología y ortopedia de confianza.
        </p>
      </section>
      <section
        className="px-4 py-8 relative bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="absolute inset-0 backdrop-blur-xs bg-black/10 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-3xl text-gray-200 font-semibold mb-6 text-center text-secondary">
            Nuestros productos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              to="/products"
              variant="primary"
              className="px-6 py-3 text-lg font-semibold"
              text="Ver todos los productos"
            />
          </div>
        </div>
      </section>
      <section className="px-6 py-12 text-center bg-gradient-to-r from-white via-[#ebfcff] to-[#a7e8f2]">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          ¿Quiénes somos?
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          En Traumatic Evolutions nos comprometemos con la calidad de vida de
          nuestros clientes, proporcionando productos seguros, certificados y
          fabricados con la última tecnología médica. Nuestros valores son
          confianza, accesibilidad e innovación constante.
        </p>
      </section>
    </>
  );
}
