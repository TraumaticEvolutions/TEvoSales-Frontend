import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Ruta privada que redirige a la página de inicio de sesión si el usuario no está autenticado.
 *
 * @export
 * @param {{ children: React.ReactNode }} param0
 * @returns {React.ReactNode}
 * @author Ángel Aragón
 */
export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * PropTypes para validar las propiedades del componente PrivateRoute.
 * @typedef {Object} PrivateRouteProps
 * @property {React.ReactNode} children - Elementos hijos que se renderizarán si el usuario está autenticado.
 * @author Ángel Aragón
 */
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
