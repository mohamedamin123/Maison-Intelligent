import axios from 'axios';
import { API_URL } from '@env';
import useAuthStore from '../store/useAuthStore'; // Import du store Zustand

const api = axios.create({
    baseURL: `${API_URL}/vehicules`,
    headers: { 'Content-Type': 'application/json' },
});

// 📌 Utilisation du token depuis Zustand
const getVehiculeToken = () => {
    return useAuthStore.getState().token; // Récupère le token depuis Zustand
};

// 📌 Ajout automatique du token dans toutes les requêtes
api.interceptors.request.use(
    (config) => {
        const token = getVehiculeToken();
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
export const getAllVehicules = async () => {
    return api.get("/");
};


// 📌 Exemple d'utilisation pour récupérer un utilisateur
export const getVehicule = async (VehiculeId) => {
    return api.get(`/${VehiculeId}`);
};

export const getVehiculeByUserId = async (userId) => {
    return api.get(`/user/${userId}`);
};

export const getVehiculeByGarageId = async (userId) => {
    return api.get(`/garage/${userId}`);
};

// 📌 Exemple d'utilisation pour mettre à jour un utilisateur
export const updateVehicule = async (VehiculeId, VehiculeData) => {

    return api.patch(`/${VehiculeId}`, VehiculeData);
};


// 📌 Ajouter un Vehicule
export const ajouterVehicule = async (VehiculeData) => {

  return api.post("", VehiculeData);
};



export default api;
