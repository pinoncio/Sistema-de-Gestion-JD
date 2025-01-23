import api from './api';  // Importa la configuración de axios

// Obtener todos los roles
export const getRoles = async () => {
  try {
    const response = await api.get('/roles/list');
    return response.data;
  } catch (error) {
    console.error("Error al obtener roles", error);
    throw error;
  }
};

// Crear un nuevo rol
export const createRol = async (nombre_rol) => {
  try {
    const response = await api.post('/roles', { nombre_rol });
    return response.data;
  } catch (error) {
    console.error("Error al crear rol", error);
    throw error;
  }
};

// Actualizar un rol
export const updateRol = async (id_rol, nombre_rol) => {
  try {
    const response = await api.put(`/roles/${id_rol}`, { nombre_rol });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar rol", error);
    throw error;
  }
};

// Eliminar un rol
export const deleteRol = async (id_rol) => {
  try {
    const response = await api.delete(`/roles/${id_rol}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar rol", error);
    throw error;
  }
};

// Obtener un rol específico
export const getRol = async (id_rol) => {
  try {
    const response = await api.get(`/roles/${id_rol}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener rol", error);
    throw error;
  }
};
