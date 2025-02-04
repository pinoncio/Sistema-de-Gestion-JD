import api from "./apiService"; // Importa la configuración de axios

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await api.get("/usuarios/list");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Obtener un usuario por id
export const getUsuario = async (id_usuario) => {
  try {
    const response = await api.get(`/usuarios/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
  try {
    const response = await api.post("/usuarios/", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUsuario = async (id_usuario, usuarioData) => {
  try {
    const response = await api.put(`/usuarios/${id_usuario}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUsuario = async (id_usuario) => {
  try {
    const response = await api.delete(`/usuarios/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

// Activar o desactivar un usuario
export const toggleUsuarioStatus = async (id_usuario, trigger) => {
  try {
    const response = await api.put(`/usuarios/activar/${id_usuario}`, {
      trigger,
    });
    return response.data;
  } catch (error) {
    console.error("Error al activar/desactivar el usuario:", error);
    throw error;
  }
};
