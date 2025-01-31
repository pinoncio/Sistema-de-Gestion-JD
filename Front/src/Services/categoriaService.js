import api from './apiService'; 

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await api.get('/categoria/list');
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías", error);
    throw error;
  }
};

// Crear una nueva categoría
export const createCategoria = async (nombre_categoria) => {
  try {
    const response = await api.post('/categoria/', nombre_categoria);
    return response.data;
  } catch (error) {
    console.error("Error al crear categoría", error);
    throw error;
  }
};

// Actualizar una categoría
export const updateCategoria = async (id_categoria, nombre_categoria) => {
  try {
    const response = await api.put(`/categoria/${id_categoria}`, nombre_categoria);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar categoría", error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategoria = async (id_categoria) => {
  try {
    const response = await api.delete(`/categoria/${id_categoria}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar categoría", error);
    throw error;
  }
};

// Obtener una categoría específica
export const getCategoria = async (id_categoria) => {
  try {
    const response = await api.get(`/categoria/${id_categoria}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categoría", error);
    throw error;
  }
};
