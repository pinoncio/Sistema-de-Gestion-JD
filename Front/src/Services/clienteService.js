import api from "./apiService";

// Obtener todos los clientes
export const getClientes = async () => {
  try {
    const response = await api.get("/clientes/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    throw error;
  }
};

// Obtener un cliente por id
export const getCliente = async (id_cliente) => {
  try {
    const response = await api.get(`/clientes/${id_cliente}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    throw error;
  }
};

// Crear un nuevo cliente
export const createCliente = async (formData) => {
  try {
    const response = await api.post("/clientes/", formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error en la respuesta del backend:", error.response.data);
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error(
        "Error en la configuración de la solicitud:",
        error.message
      );
    }
    throw error;
  }
};

// Actualizar un cliente
export const updateCliente = async (id_cliente, clienteData) => {
  try {
    const response = await api.put(`/clientes/${id_cliente}`, clienteData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    throw error;
  }
};

// Eliminar un cliente
export const deleteCliente = async (id_cliente) => {
  try {
    const response = await api.delete(`/clientes/${id_cliente}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw error;
  }
};

// Activar o desactivar un cliente
export const toggleClienteStatus = async (id_cliente, trigger) => {
  try {
    const response = await api.put(`/clientes/activar/${id_cliente}`, {
      trigger,
    });
    return response.data;
  } catch (error) {
    console.error("Error al activar/desactivar el cliente:", error);
    throw error;
  }
};
