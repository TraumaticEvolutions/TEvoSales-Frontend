import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

/**
 * Componente AuthProvider que proporciona el contexto de autenticación
 *
 * @export
 * @param {{ children: * }} param0
 * @param {*} param0.children
 * @returns {JSX.Element}
 * @description Este componente envuelve a sus hijos con el contexto de autenticación, proporcionando acceso a la información del usuario y funciones de inicio y cierre de sesión.
 * @author Ángel Aragón
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? jwtDecode(storedToken) : null;
  });

  /**
   * Inicia sesión con el usuario y el token proporcionados.
   *
   * @param {Object} userData
   * @param {string} token
   */
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
  };

  /** Cierra la sesión del usuario */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
