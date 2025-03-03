import api from "./apiService"; // Importamos la configuración de la API

const getOtData = async (id_ot) => {
  try {
    // Log de los datos que estás enviando
    console.log("Datos enviados al servidor:", { id_ot });

    const response = await api.get(`/ots/pdf/${id_ot}`);

    // Retorna los datos de la respuesta
    return response.data;
  } catch (err) {
    // Si el error tiene respuesta y el código de estado está disponible
    if (err.response) {
      // Maneja errores específicos del backend
      switch (err.response.status) {
        case 404:
          throw new Error("Orden de trabajo no encontrada.");
        case 500:
          throw new Error("Error en el servidor. Intenta más tarde.");
        default:
          // Si es otro código de error, puedes manejarlo como un error genérico
          throw new Error(err.response.data?.msg || "Error al obtener los datos de la OT.");
      }
    }
    // Si no hay respuesta (posible error de red o servidor no accesible)
    else if (err.request) {
      throw new Error("Error de conexión. Intenta más tarde.");
    }
    // Si hay un error desconocido
    else {
      throw new Error("Hubo un error inesperado. Intenta nuevamente.");
    }
  }
};

export default getOtData;
