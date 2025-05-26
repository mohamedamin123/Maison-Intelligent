import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: `${API_URL}`,  // <- ne pas ajouter /auths ici
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction de login
export const singin = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    console.log(response.data)
    return response.data; // { token: ... }
  } catch (error) {
    console.error("Erreur login:", error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data; // { token: ... }
  } catch (error) {
    console.error("Erreur register:", error.response?.data || error.message);
    throw error;
  }
};

// Fonction pour envoyer l'email de code (forgot password)
export const forgot = async (email) => {
  try {
    const url = `${api.defaults.baseURL}/forgot`;
    console.log("URL utilisée pour forgot:", url);
        const response = await api.post('/forgot', { email });
    return response.data; // { message: "...", code: "123456" }
  } catch (error) {
  setErrorMessage(error.response?.data?.message || "Aucun utilisateur trouvé avec cet email");
    throw error;
  }
};


export const updatePassword = async (userData) => {
  // userData doit contenir : { email: "...", password: "..." }
  return api.patch('/password', userData);
};



// Vérifie l'état d'authentification
export const checkAuthStatus = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) return false;

    const response = await api.get("/checkToken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.valid ? { user: response.data.user, token } : false;
  } catch (error) {
    return false;
  }
};



export default api;
