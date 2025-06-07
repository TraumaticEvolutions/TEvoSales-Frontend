import { createContext, useState } from "react";

const AuthContext = createContext();

/**
 * Componente AuthProvider que proporciona el contexto de autenticación
 *
 * @export
 * @param {{ children: * }} param0
 * @param {*} param0.children
 * @returns {JSX.Element}
 * @description Este componente envuelve a sus hijos con el contexto de autenticación, proporcionando acceso a la información del usuario y funciones de inicio y cierre de sesión.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  /**
   * Inicia sesión con el usuario y el token proporcionados.
   *
   * @param {Object} userData
   * @param {string} token
   */
  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  /** Cierra la sesión del usuario */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
