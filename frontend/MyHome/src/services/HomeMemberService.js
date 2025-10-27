import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import { useAuthStore } from '../store/useAuthStore'; // Zustand store pour token

// ✅ Instance Axios
const api = axios.create({
  baseURL: `${API_URL}/homes_members`,
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Intercepteur pour ajouter le token
const getUserToken = () => useAuthStore.getState().token;

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
// 📌 MÉTHODES API HOMES MEMBERS
// ----------------------

// ➕ Créer un HomeMember
export const createHomeMember = async (homeMemberData) => {
  try {
    const response = await api.post('', homeMemberData);
    return response.data;
  } catch (error) {
    console.error('Erreur createHomeMember:', error.response?.data || error.message);
    throw error;
  }
};

// 📋 Récupérer tous les HomeMembers
export const getAllHomeMembers = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Erreur getAllHomeMembers:', error.response?.data || error.message);
    throw error;
  }
};

// 🔍 Récupérer un HomeMember par ID
export const getHomeMemberById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getHomeMemberById:', error.response?.data || error.message);
    throw error;
  }
};

// ❌ Supprimer un HomeMember
export const deleteHomeMember = async (id) => {
  try {
    await api.delete(`/${id}`);
    return true;
  } catch (error) {
    console.error('Erreur deleteHomeMember:', error.response?.data || error.message);
    throw error;
  }
};

// (Optionnel) 📦 Récupérer les HomeMembers par UserId
// 🔹 Trouver tous les HomeMembers d’un utilisateur
export const getHomeMembersByUserId = async (idUser) => {
  try {
    const response = await api.get(`/user/${idUser}`);
    return response.data;
  } catch (error) {
    console.error('Erreur getHomeMembersByUserId:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
