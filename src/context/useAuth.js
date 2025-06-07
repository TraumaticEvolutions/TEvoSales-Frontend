import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/** * Hook personalizado para acceder al contexto de autenticación
 * @returns {Object} El contexto de autenticación que incluye el usuario, token, login y logout
 * @description Este hook permite a los componentes acceder fácilmente al contexto de autenticación sin necesidad de importar el contexto directamente.
 */
export function useAuth() {
  return useContext(AuthContext);
}
