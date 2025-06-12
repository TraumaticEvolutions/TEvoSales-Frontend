import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { BsCart4 } from "react-icons/bs";
import { GrUserNew } from "react-icons/gr";
import { FaUserInjured, FaShoppingCart } from "react-icons/fa";
import Sidebar from "./Sidebar";
import logo from "../assets/TEvoLogo.svg";
import { useAuth } from "../context/useAuth";

/**
 * Componente Header del marketplace TEvoSales
 * Muestra el logo, enlaces de navegación y opciones de usuario.
 * Incluye un menú lateral para pantallas pequeñas.
 *
 * @component
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const [count, setCount] = useState(0);
  const isActive = (path) => location.pathname === path;
  useEffect(() => {
    const cartCount = localStorage.getItem(`cart_${user?.sub}`);
    setCount(cartCount ? JSON.parse(cartCount).length : 0);
    const onStorageChange = (e) => {
      if (e.key === `cart_${user?.sub}`) {
        setCount(e.newValue ? JSON.parse(e.newValue).length : 0);
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, [user, location]);
  return (
    <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center md:px-8 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="TEvoSales Logo" className="h-15 w-auto" />
      </Link>

      <nav className="hidden md:flex gap-8 text-gray-700 text-md font-medium tracking-wide">
        {!isActive("/") && (
          <Link
            to="/"
            className={`relative text-gray-700 hover:text-black font-semibold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-600 hover:after:w-full flex items-center gap-2`}
          >
            <IoHome /> Inicio
          </Link>
        )}
        {!isActive("/market") && (
          <Link
            to="/market"
            className={`relative text-gray-700 hover:text-black font-semibold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-600 hover:after:w-full flex items-center gap-2`}
          >
            <FaShoppingCart /> Mercado
          </Link>
        )}
        {user ? (
          <>
            <button
              onClick={logout}
              className="relative text-gray-700 hover:text-black font-semibold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-black after:transition-all after:duration-600 hover:after:w-full flex items-center gap-2"
            >
              <ImExit /> Cerrar sesión
            </button>
            <Link
              to="/cart"
              className={`relative text-gray-700 hover:text-black font-semibold flex items-center gap-2`}
            >
              <BsCart4 className="w-6 h-6 hover:w-6.5 hover:h-6.5 transition-all duration-600" />
              {count > 0 && (
                <span className="absolute -bottom-3 -right-4 bg-cyan-600 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow">
                  {count}
                </span>
              )}
            </Link>
          </>
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
        cartCount={count}
      />
    </header>
  );
};

export default Header;
