import api from "./apiService"; // Importa la configuración de axios

// Obtener todos los insumos
export const getInsumos = async () => {
  try {
    const response = await api.get("/insumo/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los insumos:", error);
    throw error;
  }
};

// Obtener un insumo por id
export const getInsumo = async (id_insumo) => {
  try {
    const response = await api.get(`/insumo/${id_insumo}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el insumo:", error);
    throw error;
  }
};

// Crear un nuevo insumo
export const createInsumo = async (insumoData) => {
  try {
    const response = await api.post("/insumo/", insumoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el insumo:", error);
    throw error;
  }
};

// Actualizar un insumo
export const updateInsumo = async (id_insumo, insumoData) => {
  try {
    const response = await api.put(`/insumo/${id_insumo}`, insumoData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el insumo:", error);
    throw error;
  }
};

// Eliminar un insumo
export const deleteInsumo = async (id_insumo) => {
  try {
    const response = await api.delete(`/insumo/${id_insumo}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el insumo:", error);
    throw error;
  }
};

// Activar o desactivar un insumo
export const toggleInsumoStatus = async (id_insumo, trigger) => {
  try {
    const response = await api.put(`/insumo/activar/${id_insumo}`, { trigger });
    return response.data;
  } catch (error) {
    console.error("Error al activar/desactivar el insumo:", error);
    throw error;
  }
};
