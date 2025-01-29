import api from "./apiService";

// Obtener todos los métodos de pago de un cliente
export const getMetodosPagoCliente = async (id_cliente) => {
  try {
    const response = await api.get(`/Pago/${id_cliente}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los métodos de pago del cliente:", error);
    throw error;
  }
};

// Obtener un método de pago específico de un cliente
export const getMetodoPagoCliente = async (id_cliente, id_metodo_pago) => {
  try {
    const response = await api.get(
      `/clienteMetodoPago/${id_cliente}/pago/${id_metodo_pago}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el método de pago del cliente:", error);
    throw error;
  }
};

// Agregar un nuevo método de pago a un cliente
export const addMetodoPagoCliente = async (metodoPagoData) => {
  try {
    const response = await api.post("/Pago/metodospago", metodoPagoData);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el método de pago al cliente:", error);
    throw error;
  }
};

// Actualizar un método de pago de un cliente
export const updateMetodoPagoCliente = async (
  id_cliente,
  id_metodo_pago,
  metodoPagoData
) => {
  try {
    const response = await api.put(
      `/clienteMetodoPago/${id_cliente}/pago/${id_metodo_pago}`,
      metodoPagoData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el método de pago del cliente:", error);
    throw error;
  }
};

// Eliminar un método de pago de un cliente
export const deleteMetodoPagoCliente = async (id_cliente, id_metodo_pago) => {
  try {
    const response = await api.delete(
      `/clienteMetodoPago/${id_cliente}/pago/${id_metodo_pago}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el método de pago del cliente:", error);
    throw error;
  }
};

