import api from "./apiService"; // Importa la configuración de axios

// Obtener todas las órdenes de trabajo
export const getOts = async () => {
  try {
    const response = await api.get("/ots/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las órdenes de trabajo:", error);
    throw error;
  }
};

// Obtener una orden de trabajo por id_ot
export const getOt = async (id_ot) => {
  try {
    const response = await api.get(`/ots/${id_ot}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la orden de trabajo:", error);
    throw error;
  }
};

// Crear una nueva orden de trabajo
export const createOt = async (otData) => {
  try {
    const response = await api.post("/ots/", otData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la orden de trabajo:", error);
    throw error;
  }
};

// Actualizar una orden de trabajo
export const updateOt = async (id_ot, otData) => {
  try {
    const response = await api.put(`/ots/${id_ot}`, otData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la orden de trabajo:", error);
    throw error;
  }
};

// Eliminar una orden de trabajo
export const deleteOt = async (id_ot) => {
  try {
    const response = await api.delete(`/ots/${id_ot}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la orden de trabajo:", error);
    throw error;
  }
};