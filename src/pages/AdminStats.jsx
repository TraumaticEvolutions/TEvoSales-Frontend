import { useEffect, useState } from "react";
import { FaChartBar } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { get5BestSellersProducts, getTop5Users } from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * Page de estadísticas de administración.
 * Muestra gráficos de los productos más vendidos y los usuarios con más pedidos.
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function AdminStats() {
  const [topProducts, setTopProducts] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    async function fetchTopProducts() {
      try {
        const data = await get5BestSellersProducts();
        setTopProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos más vendidos:", error);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchTopProducts();
  }, []);

  useEffect(() => {
    async function fetchTopUsers() {
      try {
        const data = await getTop5Users();
        setTopUsers(data);
      } catch (error) {
        console.error("Error al obtener los usuarios top:", error);
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchTopUsers();
  }, []);

  const chartDataProducts = {
    labels: topProducts.map((prod) => prod.name),
    datasets: [
      {
        label: "Unidades vendidas",
        data: topProducts.map((prod) => prod.quantity),
        backgroundColor: "rgba(6, 182, 212, 0.7)",
        borderColor: "rgba(6, 182, 212, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptionsProducts = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Productos más vendidos",
        color: "#0e7490",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#0e7490",
          font: { weight: "bold" },
          maxRotation: 0,
          minRotation: 0,
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.length > 18 ? label.slice(0, 18) + "…" : label;
          },
        },
      },
      y: { beginAtZero: true, ticks: { color: "#0e7490" } },
    },
  };

  const chartDataUsers = {
    labels: topUsers.map((user) => user.username),
    datasets: [
      {
        label: "Pedidos realizados",
        data: topUsers.map((user) => user.ordersCount),
        backgroundColor: [
          "#06b6d4",
          "#0ea5e9",
          "#818cf8",
          "#fbbf24",
          "#f87171",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptionsUsers = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { color: "#0e7490", font: { weight: "bold" } },
      },
      title: {
        display: true,
        text: "Top 5 usuarios con más pedidos",
        color: "#0e7490",
        font: { size: 18, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed} pedidos`;
          },
        },
      },
    },
  };

  return (
    <section className="min-h-screen py-8 px-2 flex flex-col items-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
      <h2 className="text-2xl font-bold text-cyan-700 mb-6 flex items-center gap-2">
        <FaChartBar /> Estadísticas
      </h2>

      <div className="w-full flex flex-col lg:flex-row flex-wrap gap-8 justify-center items-stretch">
        <div className="w-full lg:w-[50%] bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col items-center">
          {loadingProducts ? (
            <div className="text-cyan-700">Cargando productos...</div>
          ) : topProducts.length === 0 ? (
            <div className="text-gray-500">No hay datos de productos.</div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full h-[350px] flex items-center justify-center">
                <Bar data={chartDataProducts} options={chartOptionsProducts} />
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[25%] bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col items-center">
          {loadingUsers ? (
            <div className="text-cyan-700">Cargando usuarios...</div>
          ) : topUsers.length === 0 ? (
            <div className="text-gray-500">No hay datos de usuarios.</div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-full max-w-[400px] h-[350px] flex items-center justify-center">
                <Doughnut data={chartDataUsers} options={chartOptionsUsers} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
