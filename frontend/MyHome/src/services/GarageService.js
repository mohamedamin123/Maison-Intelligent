import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import { useAuthStore } from '../store/useAuthStore'; // Import du store Zustand

// ✅ Création de l’instance axios
const api = axios.create({
  baseURL: `${API_URL}/garages`,
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
// 📌 MÉTHODES API Garage
// ----------------------

// 🏠 Créer un Garage
export const createGarage = async (GarageData) => {
  try {
    const response = await api.post('', GarageData);
    return response.data;
  } catch (error) {
    console.error('Erreur createGarage:', error.response?.data || error.message);
    throw error;
  }
};

// 📋 Récupérer tous les Garages
export const getAllGarages = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Erreur getAllGarages:', error.response?.data || error.message);
    throw error;
  }
};

// 🔍 Récupérer un Garage par ID
export const getGarageById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getGarageById:', error.response?.data || error.message);
    throw error;
  }
};

// ❌ Supprimer un Garage
export const deleteGarage = async (id) => {
  try {
    await api.delete(`/${id}`);
    return true;
  } catch (error) {
    console.error('Erreur deleteGarage:', error.response?.data || error.message);
    throw error;
  }
};

// (Optionnel) 📦 Récupérer les Garages d’un utilisateur
export const getGaragesByHomeId = async (idHome) => {
  try {
    const response = await api.get(`home/${idHome}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getGaragesByHomeId:', error.response?.data || error.message);
    throw error;
  }
};

export const getGaragesByHomeIdAndRoomId = async (idHome, idRoom) => {
  try {
    const response = await api.get(`home/${idHome}/room/${idRoom}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getGaragesByHomeIdAndRoomId:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
