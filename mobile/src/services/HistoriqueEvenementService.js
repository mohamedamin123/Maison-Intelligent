import axios from 'axios';
import { API_URL } from '@env';
import useAuthStore from '../store/useAuthStore'; // Import du store Zustand

const api = axios.create({
    baseURL: `${API_URL}/historiqueEvenements`,
    headers: { 'Content-Type': 'application/json' },
});

// 📌 Utilisation du token depuis Zustand
const gethistoriqueEvenementToken = () => {
    return useAuthStore.getState().token; // Récupère le token depuis Zustand
};

// 📌 Ajout automatique du token dans toutes les requêtes
api.interceptors.request.use(
    (config) => {
        const token = gethistoriqueEvenementToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 📌 Exemple d'utilisation pour récupérer tous les utilisateurs
export const getAllhistoriqueEvenements = async () => {
    return api.get("/");
};

export const getAllhistoriqueEvenementsByUser = async () => {
    return api.get("/user");
};


// 📌 Exemple d'utilisation pour récupérer un utilisateur
export const gethistoriqueEvenement = async (historiqueEvenementId) => {
    return api.get(`/${historiqueEvenementId}`);
};

export const gethistoriqueEvenementByUserId = async (userId) => {
    return api.get(`/user/${userId}`);
};

// 📌 Exemple d'utilisation pour mettre à jour un utilisateur
export const updatehistoriqueEvenement = async (historiqueEvenementId, historiqueEvenementData) => {

    return api.patch(`/${historiqueEvenementId}`, historiqueEvenementData);
};


// 📌 Ajouter un historiqueEvenement
export const ajouterhistoriqueEvenement = async (historiqueEvenementData) => {

  return api.post("", historiqueEvenementData);
};



export default api;
