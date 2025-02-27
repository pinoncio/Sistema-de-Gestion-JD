import api from "./apiService"; // Importa la configuración de axios

// Obtener todos los insumos de una OT
export const getInsumosByOT = async (id_ot) => {
  try {
    const response = await api.get(`/otinsumo/${id_ot}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los insumos de la OT:", error);
    throw error;
  }
};

// Obtener un insumo específico de una OT por la relación (ID_OT, ID_INSUMO)
export const getInsumoById = async (id_ot, id_insumo) => {
  try {
    const response = await api.get(`/otinsumo/${id_ot}/${id_insumo}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el insumo de la OT:", error);
    throw error;
  }
};
