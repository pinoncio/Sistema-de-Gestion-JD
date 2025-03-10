import api from "./apiService";

export const getAllTiempos = async () => {
  try {
    const response = await api.get("/tiempo");
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la lista de tiempos:",
      error.response?.data || error.message
    );
    throw new Error("No se pudo obtener la lista de tiempos.");
  }
};

export const getTiempoByIt = async (id_it) => {
  try {
    const response = await api.get(`/tiempo/${id_it}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener los tiempos para id_it ${id_it}:`,
      error.response?.data || error.message
    );
    throw new Error(`No se pudo obtener los tiempos para id_it ${id_it}.`);
  }
};
