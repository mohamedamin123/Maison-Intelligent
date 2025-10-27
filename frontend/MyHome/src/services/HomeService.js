import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import { useAuthStore } from '../store/useAuthStore'; // Import du store Zustand

// ✅ Création de l’instance axios
const api = axios.create({
  baseURL: `${API_URL}/homes`,
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
// 📌 MÉTHODES API HOME
// ----------------------

// 🏠 Créer un Home
export const createHome = async (homeData) => {
  try {
    const response = await api.post('/', homeData);
    return response.data;
  } catch (error) {
    console.error('Erreur createHome:', error.response?.data || error.message);
    throw error;
  }
};

// 📋 Récupérer tous les Homes
export const getAllHomes = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Erreur getAllHomes:', error.response?.data || error.message);
    throw error;
  }
};

// 🔍 Récupérer un Home par ID
export const getHomeById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getHomeById:', error.response?.data || error.message);
    throw error;
  }
};

// ❌ Supprimer un Home
export const deleteHome = async (id) => {
  try {
    await api.delete(`/${id}`);
    return true;
  } catch (error) {
    console.error('Erreur deleteHome:', error.response?.data || error.message);
    throw error;
  }
};

// (Optionnel) 📦 Récupérer les homes d’un utilisateur
export const getHomesByUserId = async (idUser) => {
  try {
    const response = await api.get(`/user/${idUser}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getHomesByUserId:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
