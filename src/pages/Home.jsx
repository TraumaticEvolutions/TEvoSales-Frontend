import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

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
    <div className="bg-gray-500 min-h-screen flex flex-col items-center justify-center p-4">
      <h1>Bienvenido al Marketplace</h1>
      {user ? (
        <>
          <p>
            Sesión iniciada como: <b>{user.sub || user.username}</b>
          </p>
          <Button
            onClick={handleLogout}
            bgColor="bg-red-500"
            bgColorHover="hover:bg-red-400"
            textColor="text-white"
            textColorHover="hover:text-white"
            className="mt-4"
            text="Cerrar sesión"
          />
        </>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}
