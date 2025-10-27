import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  idHome: null,

  login: async (data) => {
    const { token, user } = data; // user = { idUser, idHome, email, role }
    set({ token, user, isAuthenticated: true });
    await AsyncStorage.setItem('auth', JSON.stringify({ token, user }));
  },

  logout: async () => {
    set({ token: null, user: null, isAuthenticated: false });
    await AsyncStorage.removeItem('auth');
  },

  loadAuthFromStorage: async () => {
    try {
      const storedAuth = await AsyncStorage.getItem('auth');
      if (storedAuth) {
        const { token, user } = JSON.parse(storedAuth);
        set({ token, user, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'auth depuis le stockage :", error);
    }
  },
}));

export default useAuthStore;
