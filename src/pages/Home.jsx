import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * Página principal del Marketplace
 *
 * @returns {JSX.Element} Componente de la página principal
 * @author Ángel Aragón
 */
export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Bienvenido al Marketplace</h1>
      {user ? (
        <>
          <p>
            Sesión iniciada como: <b>{user.sub || user.username}</b>
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}
