import axios from 'axios';

// URL base de la API (ajusta esto según tu configuración)
const API_URL = 'http://localhost:3001/api/usuarios'; // Cambiar a tu servidor de producción si es necesario

// Función para obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Función para obtener un usuario por id
export const getUsuario = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_URL}/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// Función para crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(API_URL, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Función para actualizar un usuario
export const updateUsuario = async (id_usuario, usuarioData) => {
  try {
    const response = await axios.put(`${API_URL}/${id_usuario}`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUsuario = async (id_usuario) => {
  try {
    const response = await axios.delete(`${API_URL}/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

// Función para activar o desactivar un usuario
export const toggleUsuarioStatus = async (id_usuario, trigger) => {
  try {
    const response = await axios.put(`${API_URL}/activar/${id_usuario}`, { trigger });
    return response.data;
  } catch (error) {
    console.error("Error al activar/desactivar el usuario:", error);
    throw error;
  }
};
