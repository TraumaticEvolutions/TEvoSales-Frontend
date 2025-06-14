import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "../components/Button";
import { FaBoxOpen } from "react-icons/fa";
import { TbMoodSad } from "react-icons/tb";
import OrderDateFilter from "../components/OrderDateFilter";
import OrderStatusBadge from "../components/OrderStatusBadge";
import Pagination from "../components/Pagination";
import { ordersRequest } from "../services/api";

/**
 * Componente que muestra los pedidos del usuario.
 * Permite filtrar por fecha y paginar los resultados.
 * Muestra un mensaje si no hay pedidos en el rango de fechas seleccionado.
 * 

 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function MyOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({ start: "", to: "" });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true);
    ordersRequest({
      page,
      startDate: dateFilter.from || undefined,
      endDate: dateFilter.to || undefined,
    })
      .then((data) => {
        setOrders(data.content);
        setTotalPages(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [user, navigate, page, dateFilter]);

  const handleDateFilter = (filter) => {
    setDateFilter(filter);
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white py-10 px-2">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center drop-shadow">
        <FaBoxOpen className="inline-block mr-2 mb-1" />
        Mis pedidos
      </h1>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <OrderDateFilter onFilter={handleDateFilter} />
        </div>
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="text-lg text-gray-500 animate-pulse">
                Cargando pedidos...
              </span>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white/80 rounded-2xl shadow-lg p-10 text-center">
              <p className="text-lg text-gray-500 mb-6">
                <TbMoodSad className="inline-block text-4xl text-gray-500 mb-2" />
                <br />
                No tienes pedidos realizados en este rango de fechas.
              </p>
              <Button
                text="Ver productos"
                className="text-lg"
                onClick={() => navigate("/market")}
                bgColor="bg-cyan-700"
                bgColorHover="hover:bg-cyan-800"
                txtColor="text-white"
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6">
                {orders.map((order) => (
                  <Accordion
                    key={order.id}
                    sx={{
                      background: "#eafcff",
                      border: "1px solid #ccecf6",
                      borderRadius: "1rem",
                      boxShadow: "none",
                      overflow: "visible",
                      "&:before": { display: "none" },
                      "&.MuiAccordion-root": { margin: 0 },
                    }}
                    disableGutters
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel-content-${order.id}`}
                      id={`panel-header-${order.id}`}
                      sx={{
                        minHeight: "48px",
                        "& .MuiAccordionSummary-content": { marginY: "8px" },
                      }}
                    >
                      <div className="flex flex-col gap-1 w-full sm:flex-row sm:items-center sm:gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1">
                          <span className="font-semibold text-cyan-700 text-base sm:text-lg">
                            Pedido #{order.id}
                          </span>
                          <span className="text-gray-600 text-xs sm:text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-2 sm:mt-0">
                          <span className="text-emerald-700 font-bold text-base sm:text-lg">
                            {order.total.toFixed(2)} €
                          </span>
                          <OrderStatusBadge status={order.status} />
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="bg-white rounded-xl p-4 shadow flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-700 text-sm mb-2">
                          <div>
                            <span className="font-semibold">Dirección:</span>{" "}
                            {order.address}, Nº {order.number}
                            {order.floor && `, Piso ${order.floor}`}, CP{" "}
                            {order.postalCode}
                          </div>
                        </div>
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-cyan-700 border-b">
                              <th className="py-1">Producto</th>
                              <th className="py-1">Cantidad</th>
                              <th className="py-1">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, idx) => (
                              <tr
                                key={idx}
                                className="border-b last:border-b-0"
                              >
                                <td className="py-1 flex items-center gap-2">
                                  <img
                                    src={
                                      item.imagePath ||
                                      "https://placehold.co/50?text=Image&font=playfair-display"
                                    }
                                    alt={item.productName}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <span className="block text-gray-800 font-medium">
                                    {item.productName}
                                  </span>
                                </td>
                                <td className="py-1">{item.quantity}</td>
                                <td className="py-1">
                                  {item.subtotal.toFixed(2)} €
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
              <div className="mt-4">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
