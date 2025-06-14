import axios from "axios";

const API_URL = "http://localhost:8080/api";

/**
 * Crea una instancia de Axios para realizar solicitudes a la API.
 * @type {import('axios').AxiosInstance}
 * @param {string} baseURL - La URL base de la API.
 * @author Ángel Aragón
 */
const api = axios.create({
  baseURL: API_URL,
});

/**
 * Interceptor de solicitud para agregar el token de autenticación.
 *
 * Este interceptor se ejecuta antes de cada solicitud y agrega el token de autenticación
 * al encabezado de la solicitud si está disponible en el almacenamiento local.
 *
 * @author Ángel Aragón
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuesta para manejar errores globales.
 *
 * Este interceptor se ejecuta después de cada respuesta y verifica si hay errores.
 * Si el error es una respuesta 401 o 403, se realiza un logout global.
 *
 * @author Ángel Aragón
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const errorMsg =
        error.response.data?.error || error.response.data?.message || "";
      if (
        errorMsg === "TOKEN_EXPIRED" ||
        errorMsg === "TOKEN_INVALID"
      ) {
        globalLogout();
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Realiza una solicitud de inicio de sesión tipo POST.
 *
 *
 * @param {Object} credentials
 * @returns {JWT} La respuesta del servidor con el token.
 * @author Ángel Aragón
 */
export async function loginRequest(credentials) {
  const response = await api.post(`${API_URL}/auth/login`, credentials);
  return response.data;
}

/**
 * Obtiene productos aleatorios.
 *
 * @returns {Promise<Object[]>} Una promesa que resuelve con un array de productos aleatorios.
 * @author Ángel Aragón
 */
export async function randomProductsRequest() {
  const response = await api.get(`${API_URL}/products/random`);
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
  const response = await api.post(`${API_URL}/users/register`, userData);
  return response.data;
}

/**
 * Obtiene todos los productos con paginación.
 *
 * @param {Object} params - Parámetros de consulta para la paginación y filtrado.
 * @param {number} params.page - Número de página (0-indexed).
 * @returns {Promise<Object>} La respuesta del servidor con los productos paginados.
 * @author Ángel Aragón
 */
export async function allProductsRequest(params = {}) {
  const response = await api.get(`${API_URL}/products/paged`, { params });
  return response.data;
}

/**
 * Obtiene un producto por su ID.
 *
 * @param {string} id - ID del producto a obtener.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del producto.
 * @author Ángel Aragón
 */
export async function productByIdRequest(id) {
  const response = await api.get(`${API_URL}/products/${id}`);
  return response.data;
}

/**
 * Crea un nuevo pedido.
 *
 * @param {Object} orderData - Datos del pedido a crear.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del pedido creado.
 * @author Ángel Aragón
 */
export async function newOrder(orderData) {
  const response = await api.post(`${API_URL}/orders`, orderData);
  return response.data;
}

/**
 * Obtiene los pedidos del usuario autenticado con paginación y filtros de fecha.
 *
 * @param {Object} params - Parámetros de consulta para la paginación y filtrado.
 * @param {number} params.page - Número de página (0-indexed).
 * @param {string} [params.from] - Fecha de inicio del filtro (formato ISO).
 * @param {string} [params.to] - Fecha de fin del filtro (formato ISO).
 * @returns {Promise<Object>} La respuesta del servidor con los pedidos paginados.
 * @author Ángel Aragón
 */
export async function ordersRequest({ page = 0, startDate, endDate } = {}) {
  const response = await api.get(`${API_URL}/orders/paged`, {
    params: { page, startDate, endDate },
  });
  return response.data;
}

/**
 * Realiza un logout global.
 * Elimina el token del almacenamiento local y redirige al usuario a la página de inicio de sesión.
 * @author Ángel Aragón
 */
function globalLogout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
