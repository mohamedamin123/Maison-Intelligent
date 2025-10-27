import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../../store/useAuthStore';
import { createGarage } from '../../../services/GarageService';

const AjouterGarageScreen = () => {
  const [nomGarage, setNomGarage] = useState('');
  const [surface, setSurface] = useState('');
  const navigation = useNavigation();
  const { user } = useAuthStore();

  const handleAjouter = async () => {
    if (nomGarage.trim() === '' || surface.trim() === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (isNaN(surface) || parseFloat(surface) <= 0) {
      Alert.alert('Erreur', 'La surface doit être un nombre positif.');
      return;
    }

    try {
      const garageData = {
        nom: nomGarage,               // ⚠️ correspond au DTO backend
        surface: parseFloat(surface),
        homeId: user.idHome,          // ⚠️ correspond au DTO backend
      };
      console.log("garageData envoyé :", garageData);

      await createGarage(garageData);

      Alert.alert('Succès', `Garage "${nomGarage}" ajouté avec une surface de ${surface} m².`);
      navigation.goBack();
    } catch (error) {
      console.error('Erreur lors de l’ajout du garage:', error);
      Alert.alert('Erreur', 'Impossible d’ajouter le garage. Veuillez réessayer.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>➕ Ajouter un Garage</Text>
      <Text style={styles.subtitle}>Entrez les détails du garage</Text>

      {/* Nom du garage */}
      <View style={styles.inputContainer}>
        <Icon name="garage" size={24} color="#00ADB5" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nom du garage"
          placeholderTextColor="#888"
          value={nomGarage}
          onChangeText={setNomGarage}
        />
      </View>

      {/* Surface du garage */}
      <View style={styles.inputContainer}>
        <Icon name="ruler-square" size={24} color="#00ADB5" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Surface du garage (m²)"
          placeholderTextColor="#888"
          value={surface}
          onChangeText={setSurface}
          keyboardType="numeric"
        />
      </View>

      {/* Bouton Ajouter */}
      <TouchableOpacity style={styles.button} onPress={handleAjouter}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>

      {/* Bouton Retour */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#555', marginTop: 12 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00ADB5',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#00ADB5',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AjouterGarageScreen;
