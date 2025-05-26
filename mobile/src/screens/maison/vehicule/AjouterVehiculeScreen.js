import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ajouterVehicule } from '../../../services/VehiculeService';
import useAuthStore from '../../../store/useAuthStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AjouterVehiculeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { idGarage } = route.params;
  const { user } = useAuthStore();

  const [matricule, setMatricule] = useState('');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');

  const handleAjoutVehicule = async () => {
    if (!matricule.trim()) {
      Alert.alert('Erreur', 'Le matricule est obligatoire.');
      return;
    }

    const vehicule = {
      matricule,
      marque,
      modele,
      idGarage,
      idUser: user.idUser,
    };

    try {
      await ajouterVehicule(vehicule);
      Alert.alert('Succès', 'Véhicule ajouté avec succès !', [
        { text: 'OK', onPress: () => navigation.navigate('GererVehicule', { idGarage }) },
      ]);
    } catch (error) {
      console.error('Erreur lors de l’ajout du véhicule :', error);
      Alert.alert('Erreur', 'Impossible d’ajouter le véhicule.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#121212' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Ajouter un Véhicule</Text>
        <Icon name="car-info" size={60} color="#00ADB5" style={styles.icon} />

          <TextInput
            style={styles.input}
            placeholder="Matricule (Obligatoire)"
            value={matricule}
            onChangeText={setMatricule}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Marque (facultatif)"
            value={marque}
            onChangeText={setMarque}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Modèle (facultatif)"
            value={modele}
            onChangeText={setModele}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.button} onPress={handleAjoutVehicule}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#121212',
    marginTop:20
  },
  title: {
    fontSize: 26,
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#1E1E2F',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    borderColor: '#2c2c54',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#00ADB5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
    icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default AjouterVehiculeScreen;
