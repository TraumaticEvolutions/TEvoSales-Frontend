import axios from "axios";

const API_URL = "http://localhost:8080/api";

/**
 * Realiza una solicitud de inicio de sesión tipo POST.
 *
 *
 * @param {Object} credentials
 * @returns {JWT} La respuesta del servidor con el token.
 * @author Ángel Aragón
 */
export async function loginRequest(credentials) {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
}

/**
 * Obtiene productos aleatorios.
 *
 * @returns {Promise<Object[]>} Una promesa que resuelve con un array de productos aleatorios.
 * @author Ángel Aragón
 */
export async function randomProductsRequest() {
  const response = await axios.get(`${API_URL}/products/random`);
  return response.data;
}

/**
 * Registra un nuevo usuario.
 *
 * @param {Object} userData - Datos del usuario a registrar.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del usuario registrado.
 * @author Ángel Aragón
 */
export async function registerRequest(userData) {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
}
