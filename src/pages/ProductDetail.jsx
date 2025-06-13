import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productByIdRequest } from "../services/api";
import ErrorMsg from "../components/ErrorMsg";
import Button from "../components/Button";
import { IoArrowBack } from "react-icons/io5";
import { useAuth } from "../context/useAuth";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * Componente que muestra los detalles de un producto.
 * - Muestra información como nombre, marca, categoría, precio y descripción.
 * - Permite al usuario añadir el producto al carrito si está autenticado.
 * - Muestra un botón para volver a la página anterior.
 * - Si el producto no se encuentra, muestra un mensaje de error.
 *
 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const data = await productByIdRequest(id);
        setProduct(data);
      } catch (e) {
        console.error("Error al obtener el producto:", e);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
        <span className="text-lg text-gray-500 animate-pulse">
          Cargando producto...
        </span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
        <Button
          text={
            <span className="flex items-center gap-2">
              <IoArrowBack /> Volver
            </span>
          }
          onClick={() => navigate(-1)}
          className="mb-8"
        />
        <ErrorMsg message="Producto no encontrado" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <Button
          text={
            <span className="flex items-center gap-2">
              <IoArrowBack /> Volver
            </span>
          }
          onClick={() => navigate(-1)}
          className="mb-8 shadow-lg"
          bgColor="bg-white/80"
          bgColorHover="hover:bg-cyan-100"
          txtColor="text-cyan-700"
        />

        <div className="rounded-3xl bg-white/90 shadow-2xl p-6 md:p-10 backdrop-blur-md flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-shrink-0 w-full md:w-80 flex justify-center items-center">
            <img
              src={
                product.imagePath ||
                "https://placehold.co/800?text=Placeholder+Image&font=playfair-display"
              }
              alt={product.name}
              className="rounded-2xl object-cover min-w-72 min-h-72 max-w-150 max-h-150 bg-gray-100 border border-gray-200 shadow-lg transition-transform transform hover:scale-105"
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-primary mb-2">
              {product.name}
            </h2>
            <div className="flex flex-wrap gap-4 text-lg">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm shadow-sm border border-cyan-200">
                <span className="font-semibold">Marca:</span>&nbsp;
                {product.brand}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm shadow-sm border border-emerald-200">
                <span className="font-semibold">Categoría:</span>&nbsp;
                {product.category}
              </span>
              <span>
                <span className="font-semibold text-gray-700">Precio:</span>{" "}
                <span className="text-2xl text-cyan-700 font-bold">
                  {product.price} €
                </span>
              </span>
            </div>
            <div className="mt-4">
              <Accordion
                sx={{
                  background: "rgba(236, 249, 255, 0.7)",
                  borderRadius: "1rem",
                  boxShadow: "none",
                  "&:before": { display: "none" },
                }}
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    minHeight: "48px",
                    "& .MuiAccordionSummary-content": { marginY: "8px" },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color: "#0891b2",
                      fontSize: "1.1rem",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Descripción del producto
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    component="div"
                    sx={{
                      color: "#334155",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {product.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <label
                htmlFor="quantity"
                className="text-gray-700 font-medium text-base"
              >
                Unidades:
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 px-3 py-2 rounded-lg border border-gray-200 bg-[#eaf6ff] text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary text-lg"
              />
            </div>
            <div className="mt-8">
              <Button
                text={
                  !user ? "Iniciar sesión para comprar" : "Añadir al carrito"
                }
                disabled={!user}
                className="w-full text-lg"
                bgColor="bg-cyan-700"
                bgColorHover="hover:bg-cyan-800"
                txtColor="text-white"
                onClick={() => {
                  if (!user) return;
                  const stored = localStorage.getItem(`cart_${user.sub}`);
                  let cart = stored ? JSON.parse(stored) : [];
                  const idx = cart.findIndex((item) => item.id === product.id);
                  if (idx !== -1) {
                    cart[idx].quantity =
                      Number(cart[idx].quantity) + Number(quantity);
                  } else {
                    cart.push({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      imagePath: product.imagePath,
                      brand: product.brand,
                      quantity: Number(quantity),
                    });
                  }
                  localStorage.setItem(
                    `cart_${user.sub}`,
                    JSON.stringify(cart)
                  );
                  navigate("/cart");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
