import api from "./apiService"; // Importa la configuración de axios

// Obtener todos los productos
export const getAllProductos = async () => {
  try {
    const response = await api.get("/producto");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    throw error;
  }
};

// Obtener productos por id_ot
export const getProductosByOt = async (id_ot) => {
  try {
    const response = await api.get(`/producto/${id_ot}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos de la OT:", error);
    throw error;
  }
};
