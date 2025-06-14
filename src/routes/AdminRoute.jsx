import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Ruta protegida para el panel de administración
 *
 * @export
 * @param {{ children: React.ReactNode }} param0
 * @param {React.ReactNode} param0.children
 * @returns {React.ReactNode}
 * @author Ángel Aragón
 */
export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || !user.roles?.includes("ROLE_ADMIN")) {
    return <Navigate to="/" replace />;
  }
  return children;
}

/**
 * PropTypes para validar las propiedades del componente AdminRoute.
 * @typedef {Object} AdminRouteProps
 * @property {React.ReactNode} children - Elementos hijos que se renderizarán si el usuario es administrador.
 * @author Ángel Aragón
 */
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
