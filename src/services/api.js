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
