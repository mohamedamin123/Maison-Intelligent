import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import { useAuthStore } from '../store/useAuthStore'; // Import du store Zustand

// ✅ Création de l’instance axios
const api = axios.create({
  baseURL: `${API_URL}/rooms`,
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Récupération du token depuis Zustand
const getUserToken = () => {
  return useAuthStore.getState().token;
};

// ✅ Intercepteur : ajoute le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------
// 📌 MÉTHODES API Room
// ----------------------

// 🏠 Créer un Room
export const createRoom = async (roomData) => {
  try {
    const response = await api.post('', roomData);
    return response.data;
  } catch (error) {
    console.error('Erreur createRoom:', error.response?.data || error.message);
    throw error;
  }
};

// ✏️ Mettre à jour un Room
export const updateRoom = async (id, roomData) => {
  try {
    const response = await api.put(`/${id}`, roomData);
    return response.data;
  } catch (error) {
    console.error('Erreur updateRoom:', error.response?.data || error.message);
    throw error;
  }
};

// 📋 Récupérer tous les Rooms
export const getAllRooms = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Erreur getAllRooms:', error.response?.data || error.message);
    throw error;
  }
};

// 🔍 Récupérer un Room par ID
export const getRoomById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getRoomById:', error.response?.data || error.message);
    throw error;
  }
};

// ❌ Supprimer un Room
export const deleteRoom = async (id) => {
  try {
    await api.delete(`/${id}`);
    return true;
  } catch (error) {
    console.error('Erreur deleteRoom:', error.response?.data || error.message);
    throw error;
  }
};

// 🏡 Récupérer les Rooms d’une maison
export const getRoomsByHomeId = async (idHome) => {
  try {
    const response = await api.get(`/home/${idHome}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getRoomsByHomeId:', error.response?.data || error.message);
    throw error;
  }
};

// 🧩 Récupérer un Room précis d’une maison
export const getRoomsByHomeIdAndRoomId = async (idHome, idRoom) => {
  try {
    const response = await api.get(`/home/${idHome}/room/${idRoom}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getRoomsByHomeIdAndRoomId:', error.response?.data || error.message);
    throw error;
  }
};

// 🔍 Nouvelle méthode : Récupérer les Rooms d’un type donné dans une maison
export const getRoomsByTypeAndHomeId = async (typeRoom, homeId) => {
  try {
    const response = await api.get(`/home/${homeId}/type/${typeRoom}`); // GARAGE, CHAMBRE etc.
    return response.data;
  } catch (error) {
    console.error('Erreur getRoomsByTypeAndHomeId:', error.response?.data || error.message);
    throw error;
  }
};


export default api;
