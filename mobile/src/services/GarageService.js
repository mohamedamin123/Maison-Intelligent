import axios from 'axios';
import { API_URL } from '@env';
import useAuthStore from '../store/useAuthStore'; // Import du store Zustand

const api = axios.create({
    baseURL: `${API_URL}/garages`,
    headers: { 'Content-Type': 'application/json' },
});

// 📌 Utilisation du token depuis Zustand
const getGarageToken = () => {
    return useAuthStore.getState().token; // Récupère le token depuis Zustand
};

// 📌 Ajout automatique du token dans toutes les requêtes
api.interceptors.request.use(
    (config) => {
        const token = getGarageToken();
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
export const getAllGarages = async () => {
    return api.get("/");
};


// 📌 Exemple d'utilisation pour récupérer un utilisateur
export const getGarage = async (GarageId) => {
    return api.get(`/${GarageId}`);
};

export const getGarageByUserId = async (userId) => {
    return api.get(`/user/${userId}`);
};

// 📌 Exemple d'utilisation pour mettre à jour un utilisateur
export const updateGarage = async (GarageId, GarageData) => {

    return api.patch(`/${GarageId}`, GarageData);
};


// 📌 Ajouter un garage
export const ajouterGarage = async (garageData) => {
        const url = `${api.defaults.baseURL}/`;
    console.log("URL utilisée pour forgot:", url);
  return api.post("", garageData);
};


export const changerPortGarage = async (garageId, estOuvert) => {
    return api.patch(`/${garageId}/port`, null, {
        params: { estOuvert },
    });
};

export const changerLumiereGarage = async (garageId, estOuvert) => {
    return api.patch(`/${garageId}/lumiere`, null, {
        params: { estOuvert },
    });
};
// 📌 Récupérer un utilisateur par email (via RequestParam)


export default api;
