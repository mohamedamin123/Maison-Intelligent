import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import { useAuthStore } from '../store/useAuthStore'; // <- importer l'objet store

const api = axios.create({
    baseURL: `${API_URL}/users`,
    headers: { 'Content-Type': 'application/json' },
});

// 📌 Utilisation du token depuis Zustand

// Récupération du token depuis Zustand (hors hook)
const getUserToken = () => {
    return useAuthStore.getState().token;
};

// 📌 Ajout automatique du token dans toutes les requêtes
api.interceptors.request.use(
    (config) => {
        const token = getUserToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// 📌 Exemple d'utilisation pour récupérer un utilisateur
export const getUserById = async (idUser) => {
  return api.get(`/${idUser}`);
};


// 📌 Exemple d'utilisation pour mettre à jour un utilisateur
// PATCH /users/update-profile
export const updateProfile = async (profileData) => {
  return api.patch('/update-profile', profileData);
};

// PATCH pour changer le rôle d’un utilisateur
export const updateUserRole = async (id, newRole) => {
  try {
    const response = await api.patch(`/${id}/role`, { role: newRole });
    return response.data; // retourne l'utilisateur mis à jour
  } catch (error) {
    console.error('Erreur updateUserRole:', error.response?.data || error.message);
    throw error;
  }
};


// 📌 Exemple d'utilisation pour récupérer tous les utilisateurs
export const getAllUsers = async () => {
    return api.get("/");
};
// 📌 Récupérer un utilisateur par email (via RequestParam)
export const getUserByEmail = async (email) => {
    return api.get(`/email`, {
        params: { email }
    });
};

export const getUserByIdHome = async (idUser) => {
  return api.get(`/home/${idUser}`);
};


export default api;
