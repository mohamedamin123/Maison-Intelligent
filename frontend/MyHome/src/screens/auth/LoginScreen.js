import React, { useState } from 'react';
import {
  ScrollView, View, Text, TextInput, Image,
  TouchableOpacity, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { StatusBar } from 'react-native';

import useAuthStore from '../../store/useAuthStore';
import { singin } from '../../services/AuthService';
import { getHomeMembersByUserId } from '../../services/HomeMemberService'; // ✅ Import ajouté

const LoginScreen = () => {
  const navigation = useNavigation();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleLogin = async () => {
    if (buttonDisabled) {
      Alert.alert('Trop de tentatives', 'Veuillez attendre 1 minute avant de réessayer.');
      return;
    }

    setLoading(true);
    try {
      const response = await singin(email, password);

      if (response.token && response.idUser) {
        let homeId = response.idHome; // 🔹 peut venir du backend directement

        // 🔸 Si non présent, on le récupère via HomeMemberService
        if (!homeId) {
          try {
            const userHomeMembers = await getHomeMembersByUserId(response.idUser);
            if (userHomeMembers.length > 0) {
              homeId = userHomeMembers[0].homeId; // ✅ même logique que UsersScreen
              console.log('HomeId trouvé dynamiquement:', homeId);
            }
          } catch (e) {
            console.warn("Impossible de récupérer le homeId :", e);
          }
        }

        const userData = {
          token: response.token,
          user: {
            idUser: response.idUser,
            email: email,
            role: response.role,
            idHome: homeId || null, // ✅ toujours défini (même null)
          },
        };

        await login(userData); // 🔥 enregistre dans Zustand + AsyncStorage

        setErrorMessage('');
        setFailedAttempts(0);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        setErrorMessage('Réponse invalide du serveur');
        incrementFailedAttempts();
      }

    } catch (error) {
      console.log("Erreur de connexion :", error);
      setErrorMessage(error.response?.data?.message || "Identifiants incorrects");
      incrementFailedAttempts();
    } finally {
      setLoading(false);
    }
  };

  const incrementFailedAttempts = () => {
    setFailedAttempts((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setButtonDisabled(true);
        Alert.alert('Trop de tentatives', 'Veuillez attendre 1 minute avant de réessayer.');
        setTimeout(() => {
          setButtonDisabled(false);
          setFailedAttempts(0);
        }, 60000);
      }
      return newCount;
    });
  };

  const togglePasswordVisibility = () => setSecureTextEntry(!secureTextEntry);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />

      <View style={styles.innerContainer}>
        <Image source={require('../../../assets/smart-home.png')} style={styles.image} />

        <Text style={styles.title}>Maison Connectée 🏠</Text>
        <Text style={styles.subtitle}>Connectez-vous pour contrôler et surveiller votre maison</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Adresse e-mail"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            placeholderTextColor="#ccc"
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={22} color="#aaa" />
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading || buttonDisabled}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Connexion</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Oublier')}>
          <Text style={styles.textLink}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 24,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#00ADB5',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E1E2F',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    borderColor: '#30336b',
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#1E1E2F',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderColor: '#30336b',
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  eyeIcon: {
    paddingHorizontal: 8,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ADB5',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  textLink: {
    fontSize: 15,
    color: '#00ADB5',
    marginTop: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
