import api from "./apiService"; // Importa la configuración de axios

// Obtener todos los insumos
export const getMaquinas = async () => {
  try {
    const response = await api.get("/maquina/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las maquinas:", error);
    throw error;
  }
};

// Obtener un insumo por id
export const getMaquina = async (id_maquina) => {
  try {
    const response = await api.get(`/maquina/${id_maquina}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la maquina:", error);
    throw error;
  }
};

// Crear un nuevo insumo
export const createMaquina = async (maquinaData) => {
  try {
    const response = await api.post("/maquina/", maquinaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la maquina:", error);
    throw error;
  }
};

// Actualizar un insumo
export const updateMaquina = async (id_maquina, maquinaData) => {
  try {
    const response = await api.put(`/maquina/${id_maquina}`, maquinaData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la maquina:", error);
    throw error;
  }
};

// Eliminar un insumo
export const deleteMaquina = async (id_maquina) => {
  try {
    const response = await api.delete(`/maquina/${id_maquina}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la maquina:", error);
    throw error;
  }
};

