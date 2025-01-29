import api from "./apiService";

// Obtener todas las informaciones de pago
export const getInformacionesDePago = async () => {
  try {
    const response = await api.get("/informacion/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las informaciones de pago:", error);
    throw error;
  }
};

// Obtener una información de pago específica por su id_cliente
export const getInformacionDePago = async (id_cliente) => {
  try {
    const response = await api.get(`/informacion/${id_cliente}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de pago:", error);
    throw error;
  }
};

// Agregar una nueva información de pago
export const addInformacionDePago = async (informacionData) => {
  try {
    const response = await api.post("/informacion", informacionData);
    return response.data;
  } catch (error) {
    console.error("Error al agregar la información de pago:", error);
    throw error;
  }
};

// Actualizar una información de pago
export const updateInformacionDePago = async (id_cliente, informacionData) => {
  try {
    const response = await api.put(`/informacion/${id_cliente}`, informacionData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información de pago:", error);
    throw error;
  }
};

// Eliminar una información de pago
export const deleteInformacionDePago = async (id_cliente) => {
  try {
    const response = await api.delete(`/informacion/${id_cliente}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información de pago:", error);
    throw error;
  }
};
