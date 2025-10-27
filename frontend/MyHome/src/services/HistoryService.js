import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import { useAuthStore } from '../store/useAuthStore'; // Zustand

// ✅ Création de l’instance axios
const api = axios.create({
  baseURL: `${API_URL}/history`, // endpoint history-service
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
// 📌 MÉTHODES API History
// ----------------------

// 📝 Créer un historique
export const createHistoryEvent = async (historyData) => {
  try {
    const response = await api.post('', historyData);
    return response.data;
  } catch (error) {
    console.error('Erreur createHistoryEvent:', error.response?.data || error.message);
    throw error;
  }
};

// 📋 Récupérer tous les historiques
export const getAllHistoryEvents = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Erreur getAllHistoryEvents:', error.response?.data || error.message);
    throw error;
  }
};

// 🔍 Récupérer les historiques par roomId
export const getHistoryEventsByRoomId = async (roomId) => {
  try {
    const response = await api.get(`/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getHistoryEventsByRoomId:', error.response?.data || error.message);
    throw error;
  }
};

export const getHistoryEventsByHomeId = async (homeId) => {
  try {
    const response = await api.get(`/home/${homeId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getHistoryEventsByHomeId:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
