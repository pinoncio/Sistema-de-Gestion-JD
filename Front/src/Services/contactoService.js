import api from "./apiService";

// Obtener todos los contactos comerciales
export const getContactosComerciales = async () => {
  try {
    const response = await api.get("/contacto/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los contactos comerciales:", error);
    throw error;
  }
};

// Obtener un contacto comercial específico por su id
export const getContactoComercial = async (id_cliente) => {
  try {
    const response = await api.get(`/contacto/${id_cliente}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el contacto comercial:", error);
    throw error;
  }
};

// Agregar un nuevo contacto comercial
export const addContactoComercial = async (contactoData) => {
  try {
    const response = await api.post("/contacto", contactoData);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el contacto comercial:", error);
    throw error;
  }
};

// Actualizar un contacto comercial
export const updateContactoComercial = async (
  id_contacto_comercial,
  contactoData
) => {
  try {
    const response = await api.put(
      `/contacto/${id_contacto_comercial}`,
      contactoData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el contacto comercial:", error);
    throw error;
  }
};

// Eliminar un contacto comercial
export const deleteContactoComercial = async (id_contacto_comercial) => {
  try {
    const response = await api.delete(`/contacto/${id_contacto_comercial}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el contacto comercial:", error);
    throw error;
  }
};
