import api from "./apiService"; 

export const getIts = async () => {
  try {
    const response = await api.get("/its/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Informes de trabajo:", error);
    throw error;
  }
};

export const getIt = async (id_it) => {
  try {
    const response = await api.get(`/its/${id_it}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el Informe de trabajo:", error);
    throw error;
  }
};

export const createIt = async (itData) => {
  try {
    const response = await api.post("/its/", itData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el Informe de trabajo:", error);
    throw error;
  }
};

export const updateIt = async (id_it, itData) => {
  console.log(id_it);  // Verifica que id_it es el valor esperado
  try {
    const response = await api.put(`/its/${id_it}`, itData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el Informe de trabajo:", error);
    throw error;
  }
};


export const deleteIt = async (id_it) => {
  try {
    const response = await api.delete(`/its/${id_it}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el informe de trabajo:", error);
    throw error;
  }
};