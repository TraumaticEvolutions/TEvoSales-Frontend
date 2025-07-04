import axios from "axios";

/**
 * URL base de la API.
 * Se obtiene de las variables de entorno definidas en el archivo .env.local.
 */
const API_URL = import.meta.env.VITE_API_URL;

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
      if (errorMsg === "TOKEN_EXPIRED" || errorMsg === "TOKEN_INVALID") {
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
  const response = await api.post(`/auth/login`, credentials);
  return response.data;
}

/**
 * Obtiene productos aleatorios.
 *
 * @returns {Promise<Object[]>} Una promesa que resuelve con un array de productos aleatorios.
 * @author Ángel Aragón
 */
export async function randomProductsRequest() {
  const response = await api.get(`/products/random`);
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
  const response = await api.post(`/users/register`, userData);
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
  const response = await api.get(`/products`, { params });
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
  const response = await api.get(`/products/${id}`);
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
  const response = await api.post(`/orders`, orderData);
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
  const response = await api.get(`/orders`, {
    params: { page, startDate, endDate },
  });
  return response.data;
}

/**
 * Obtiene todos los pedidos del sistema con paginación y filtros.
 *
 * @param {Object} params - Parámetros de consulta para la paginación y filtrado.
 * @param {number} params.page - Número de página (0-indexed).
 * @param {string} [params.username] - Filtro por nombre de usuario.
 * @param {string} [params.status] - Filtro por estado del pedido.
 * @param {string} [params.startDate] - Fecha de inicio del filtro (formato ISO).
 * @param {string} [params.endDate] - Fecha de fin del filtro (formato ISO).
 * @returns {Promise<Object>} La respuesta del servidor con los pedidos paginados.
 * @author Ángel Aragón
 */
export async function allOrdersRequest({
  username,
  status,
  startDate,
  endDate,
  page = 0,
} = {}) {
  const response = await api.get(`/orders/all`, {
    params: { username, status, startDate, endDate, page },
  });
  return response.data;
}

/**
 * Obtiene los usuarios del sistema con paginación y filtros.
 *
 * @param {Object} params - Parámetros de consulta para la paginación y filtrado.
 * @param {number} params.page - Número de página (0-indexed).
 * @param {string} [params.username] - Filtro por nombre de usuario.
 * @param {string} [params.email] - Filtro por email.
 * @param {string} [params.nif] - Filtro por NIF.
 * @param {string} [params.role] - Filtro por rol.
 * @returns {Promise<Object>} La respuesta del servidor con los usuarios paginados.
 * @author Ángel Aragón
 */
export async function getUsersRequest(params = {}) {
  const response = await api.get(`/users`, { params });
  return response.data;
}

/**
 * Obtiene los roles disponibles en el sistema.
 *
 * @returns {Promise<Object[]>} Una promesa que resuelve con un array de roles.
 * @author Ángel Aragón
 */
export async function getRolesRequest() {
  const response = await api.get(`/roles`);
  return response.data;
}

/**
 * Obtiene los roles disponibles en el sistema con paginación.
 * @param {Object} params - Parámetros de paginación.
 * @returns {Promise<Object>} La respuesta del servidor con los roles paginados.
 * @author Ángel Aragón
 */
export async function getRolesRequestPaged(params = {}) {
  const response = await api.get(`/roles/paged`, { params });
  return response.data;
}

/**
 * Crea un nuevo rol en el sistema.
 * @param {Object} roleData - Datos del rol a crear.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del rol creado.
 * @author Ángel Aragón
 */
export async function createRole(roleData) {
  const response = await api.post(`/roles`, roleData);
  return response.data;
}

/**
 * Actualiza un rol existente en el sistema.
 * @param {Object} roleData - Datos actualizados del rol.
 * @param {string} roleId - ID del rol a actualizar.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del rol actualizado.
 * @author Ángel Aragón
 */
export async function updateRole(roleId, roleData) {
  const response = await api.put(`/roles/${roleId}`, roleData);
  return response.data;
}

/**
 * Elimina un rol del sistema.
 * @param {string} roleId - ID del rol a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el rol ha sido eliminado.
 * @author Ángel Aragón
 */
export async function deleteRole(roleId) {
  const response = await api.delete(`/roles/${roleId}`);
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

/**
 * Actualiza los roles de un usuario.
 * @param {string} userId - ID del usuario a actualizar.
 * @param {Array<string>} roles - Nuevos roles a asignar al usuario.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del usuario actualizado.
 * @author Ángel Aragón
 */
export async function updateUserRoles(userId, roles) {
  return api.put(`/users/roles/${userId}`, roles, {
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Elimina un usuario del sistema.
 * @param {string} userId - ID del usuario a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el usuario ha sido eliminado.
 * @author Ángel Aragón
 */
export async function deleteUser(userId) {
  return api.delete(`/users/${userId}`);
}

/**
 * Actualiza el estado de un pedido.
 * @param {string} orderId - ID del pedido a actualizar.
 * @param {string} status - Nuevo estado del pedido.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del pedido actualizado.
 * @author Ángel Aragón
 */
export async function updateOrderStatus(orderId, status) {
  const response = await api.put(`/orders/${orderId}`, { status });
  return response.data;
}

/**
 * Elimina un producto del sistema.
 * @param {string} productId - ID del producto a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el producto ha sido eliminado.
 * @author Ángel Aragón
 */
export async function deleteProduct(productId) {
  return api.delete(`/products/${productId}`);
}
/**
 * Actualiza un producto existente.
 * @param {string} productId - ID del producto a actualizar.
 * @param {Object} productData - Datos actualizados del producto.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del producto actualizado.
 * @author Ángel Aragón
 */
export async function updateProduct(productId, productData) {
  const response = await api.put(`/products/${productId}`, productData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
/**
 * Crea un nuevo producto.
 * @param {Object} productData - Datos del producto a crear.
 * @returns {Promise<Object>} La respuesta del servidor con los datos del producto creado.
 * @author Ángel Aragón
 */
export async function createProduct(productData) {
  const response = await api.post(`/products`, productData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

/**
 * Obtiene los 5 productos más vendidos.
 * @returns {Promise<Object[]>} Un array de los 5 productos más vendidos.
 */
export async function get5BestSellersProducts() {
  const response = await api.get(`/products/top-sellers`);
  return response.data;
}

/**
 * Obtiene los 5 usuarios que más han comprado.
 * @returns {Promise<Object[]>} Un array de los 5 usuarios que más han comprado.
 * @author Ángel Aragón
 */
export async function getTop5Users() {
  const response = await api.get(`/users/top-users`);
  return response.data;
}
