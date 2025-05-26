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
import { ajouterGarage } from '../../../services/GarageService';
import useAuthStore from '../../../store/useAuthStore';

const AjouterGarageScreen = () => {
  const [nomGarage, setNomGarage] = useState('');
  const [nombreVehiculesMax, setNombreVehiculesMax] = useState('');
  const navigation = useNavigation();
    const { user } = useAuthStore();

const handleAjouter = async () => {
  if (nomGarage.trim() === '' || nombreVehiculesMax.trim() === '') {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    return;
  }

  if (isNaN(nombreVehiculesMax) || parseInt(nombreVehiculesMax) <= 0) {
    Alert.alert('Erreur', 'Le nombre de véhicules doit être un entier positif.');
    return;
  }

  try {
    const garageData = {
      name: nomGarage,
      nbrVehicule: parseInt(nombreVehiculesMax),
      idUser:user.idUser
    };
console.log("garageData envoyé :", garageData);

    await ajouterGarage(garageData);

    Alert.alert('Succès', `Garage "${nomGarage}" ajouté avec ${nombreVehiculesMax} véhicules max.`);
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

      <View style={styles.inputContainer}>
        <Icon name="car-multiple" size={24} color="#00ADB5" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre max de véhicules"
          placeholderTextColor="#888"
          value={nombreVehiculesMax}
          onChangeText={setNombreVehiculesMax}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAjouter}>
        <Text style={styles.buttonText}>Ajouter</Text>
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
