import {
  FaUsers,
  FaShoppingCart,
  FaChartBar,
  FaWarehouse,
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import AdminDashboardCard from "../components/AdminDashboardCard";
import { LuScrollText } from "react-icons/lu";

/**
 * Componente del panel de administración.
 * Muestra tarjetas con enlaces a diferentes secciones administrativas.
 * Incluye estadísticas, gestión de usuarios, pedidos, productos, roles y proveedores.
 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function AdminDashboard() {
  return (
    <section className="min-h-[100vh] py-10 px-2 bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-cyan-700 mb-8 drop-shadow text-center">
        Panel de administración
      </h1>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AdminDashboardCard
          icon={<FaChartBar className="text-4xl text-cyan-600 mb-2" />}
          title="Estadísticas"
          description="Visualiza gráficas y datos clave del sistema."
          disabled
          to="/admin/statistics"
        />
        <AdminDashboardCard
          icon={<FaUsers className="text-4xl text-cyan-600 mb-2" />}
          title="Usuarios"
          description="Gestiona los usuarios registrados y sus roles."
          to="/admin/users"
        />
        <AdminDashboardCard
          icon={<FaShoppingCart className="text-4xl text-cyan-600 mb-2" />}
          title="Pedidos"
          description="Consulta y administra los pedidos realizados."
        />
        <AdminDashboardCard
          icon={<AiFillProduct className="text-4xl text-cyan-600 mb-2" />}
          title="Productos"
          description="Consulta y administra los productos disponibles."
        />
        <AdminDashboardCard
          icon={<LuScrollText className="text-4xl text-cyan-600 mb-2" />}
          title="Roles"
          description="Consulta y administra los roles de usuario."
        />
        <AdminDashboardCard
          icon={<FaWarehouse className="text-4xl text-cyan-600 mb-2" />}
          title="Proveedores"
          description="Consulta y administra los proveedores del productos."
          disabled
        />
      </div>
    </section>
  );
}
