import { Link, useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { IoHome } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { FaUserInjured, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { GrUserNew } from "react-icons/gr";
import { BsCart4 } from "react-icons/bs";

/**
 * Componente Sidebar para navegación mobile.
 * @param {boolean} isOpen
 * @param {Function} onClose
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
const Sidebar = ({ isOpen, onClose, user, logout, cartCount }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white w-64 shadow-lg`}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-600">
        <h2 className="text-lg font-semibold text-white">Menú</h2>
        <button
          onClick={onClose}
          className="text-2xl text-white cursor-pointer"
        >
          <FiX />
        </button>
      </div>

      <nav className="flex flex-col gap-4 px-5 py-6 text-gray-700 font-medium">
        {!isActive("/") && (
          <Link
            to="/"
            onClick={onClose}
            className="hover:text-white hover:bg-gray-700 pl-5 p-2 transition rounded-xl flex items-center gap-2"
          >
            <IoHome /> Inicio
          </Link>
        )}
        {!isActive("/market") && (
          <Link
            to="/market"
            onClick={onClose}
            className="hover:text-white hover:bg-gray-700 pl-5 p-2 transition rounded-xl flex items-center gap-2"
          >
            <FaShoppingCart /> Mercado
          </Link>
        )}
        {user ? (
          <>
            <Link
              to="/orders"
              onClick={onClose}
              className="hover:text-white hover:bg-gray-700 pl-5 p-2 transition rounded-xl flex items-center gap-2"
            >
              <FaBoxOpen /> Mis órdenes
            </Link>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="hover:text-white hover:bg-gray-700 pl-5 p-2 transition rounded-xl flex items-center gap-2"
            >
              <ImExit /> Cerrar sesión
            </button>
            <Link
              to="/cart"
              onClick={onClose}
              className="hover:text-white hover:bg-gray-700 pl-5 p-2 transition rounded-xl flex items-center gap-2 relative"
            >
              <BsCart4 /> Carrito
              {cartCount > 0 && (
                <span className="bg-cyan-600 text-white text-xs rounded-full  px-5 py-0.5 font-bold shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={onClose}
              className="hover:text-white hover:bg-gray-700 pl-5 p-2 transition rounded-xl flex items-center gap-2"
            >
              <FaUserInjured /> Iniciar sesión
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="hover:text-white hover:bg-gray-700 pl-5 p-2 transition rounded-xl flex items-center gap-2"
            >
              <GrUserNew /> Registrarse
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
