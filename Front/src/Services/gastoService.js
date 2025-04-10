import api from "./apiService"; // Importa la configuración de axios

// Obtener todos los gastos
export const getGastos = async () => {
  try {
    const response = await api.get("/gasto/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los gastos:", error);
    throw error;
  }
};

// Obtener un gasto por id
export const getGasto = async (id_gasto) => {
  try {
    const response = await api.get(`/gasto/${id_gasto}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el gasto:", error);
    throw error;
  }
};

// Crear un nuevo gasto
export const createGasto = async (gastoData) => {
  try {
    const response = await api.post("/gasto/", gastoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el gasto:", error);
    throw error;
  }
};

// Actualizar un gasto
export const updateGasto = async (id_gasto, gastoData) => {
  try {
    const response = await api.put(`/gasto/${id_gasto}`, gastoData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el gasto:", error);
    throw error;
  }
};

// Eliminar un gasto
export const deleteGasto = async (id_gasto) => {
  try {
    const response = await api.delete(`/gasto/${id_gasto}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el gasto:", error);
    throw error;
  }
};

export const getGastosMensuales = async (anio, mes, clienteId) => {
  try {
    const response = await api.get("/gasto/gasto/mensuales", {
      params: {
        anio,
        mes,
        ...(clienteId && { clienteId }), 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los gastos mensuales:", error);
    throw error;
  }
};
