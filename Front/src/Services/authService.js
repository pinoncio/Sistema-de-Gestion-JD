import api from "./apiService"; // Importamos la configuración de la API

const loginUser = async (rut, contrasenia) => {
  try {
    // Log de los datos que estás enviando
    console.log("Datos enviados al servidor:", {
      rut_usuario: rut,
      contrasenia_usuario: contrasenia,
    });

    const response = await api.post("/usuarios/login", {
      rut_usuario: rut,
      contrasenia_usuario: contrasenia,
    });

    // Retorna los datos de la respuesta
    return response.data;
  } catch (err) {
    // Si el error tiene respuesta y el código de estado está disponible
    if (err.response) {
      // Maneja errores específicos del backend
      switch (err.response.status) {
        case 401:
          throw new Error("La contraseña ingresada es incorrecta.");
        case 403:
          throw new Error(
            "La cuenta está deshabilitada temporalmente. Contacta al administrador."
          );
        case 404:
          throw new Error("El RUT ingresado no está registrado.");
        default:
          // Si es otro código de error, puedes manejarlo como un error genérico
          throw new Error(
            err.response.data?.msg || "Error en el inicio de sesión"
          );
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

export default loginUser;
