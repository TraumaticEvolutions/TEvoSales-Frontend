import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { GrUserNew } from "react-icons/gr";
import { FaUserInjured } from "react-icons/fa";
import Sidebar from "./Sidebar";
import logo from "../assets/TEvoLogo.svg";
import { useAuth } from "../context/useAuth";

/**
 * Componente Header del marketplace TEvoSales
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center md:px-8 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="TEvoSales Logo" className="h-15 w-auto" />
      </Link>

      <nav className="hidden md:flex gap-8 text-gray-700 text-md font-medium tracking-wide">
        <Link
          to="/"
          className="relative text-gray-700 hover:text-black font-semibold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-600 hover:after:w-full flex items-center gap-2"
        >
          <IoHome /> Inicio
        </Link>
        {user ? (
          <button
            onClick={logout}
            className="relative text-gray-700 hover:text-black font-semibold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-600 hover:after:w-full flex items-center gap-2"
          >
            <ImExit /> Cerrar sesión
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="relative text-gray-700 hover:text-black font-semibold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-600 hover:after:w-full flex items-center gap-2"
            >
              <FaUserInjured /> Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="relative text-gray-700 hover:text-black font-semibold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-600 hover:after:w-full flex items-center gap-2"
            >
              <GrUserNew /> Registrarse
            </Link>
          </>
        )}
      </nav>

      <button
        className="md:hidden text-gray-600 text-2xl cursor-pointer"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Abrir menú"
      >
        <FiMenu />
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        logout={logout}
      />
    </header>
  );
};

export default Header;
