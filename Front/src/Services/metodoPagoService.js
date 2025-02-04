import api from "./apiService";

// Obtener todos los métodos de pago
export const getMetodosPago = async () => {
  try {
    const response = await api.get("/metodo/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los métodos de pago:", error);
    throw error;
  }
};

// Obtener un método de pago por id
export const getMetodoPago = async (id_metodo_pago) => {
  try {
    const response = await api.get(`/metodo/${id_metodo_pago}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el método de pago:", error);
    throw error;
  }
};

// Crear un nuevo método de pago
export const createMetodoPago = async (metodoPagoData) => {
  try {
    const response = await api.post("/metodo/", metodoPagoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el método de pago:", error);
    throw error;
  }
};

// Actualizar un método de pago
export const updateMetodoPago = async (id_metodo_pago, metodoPagoData) => {
  try {
    const response = await api.put(`/metodo/${id_metodo_pago}`, metodoPagoData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el método de pago:", error);
    throw error;
  }
};

// Eliminar un método de pago
export const deleteMetodoPago = async (id_metodo_pago) => {
  try {
    const response = await api.delete(`/metodo/${id_metodo_pago}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el método de pago:", error);
    throw error;
  }
};
