import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ajouterVehicule } from '../../../services/VehiculeService'; // Assure-toi que ce service existe
import useAuthStore from '../../../store/useAuthStore';

const AjouterVehiculeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { idGarage } = route.params;
  const { user } = useAuthStore();

  const [matricule, setMatricule] = useState('');
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');

  const handleAjoutVehicule = async () => {
    console.log("id : "+idGarage);
    if (!matricule.trim()) {
      Alert.alert('Erreur', 'Le matricule est obligatoire.');
      return;
    }

    const vehicule = {
      matricule,
      marque,
      modele,
      idGarage,
      idUser:user.idUser
    };

    try {
      await ajouterVehicule(vehicule);
      Alert.alert('Succès', 'Véhicule ajouté avec succès !', [
        { text: 'OK', onPress: () => navigation.navigate("GererVehicule", { idGarage }) },
      ]);
    } catch (error) {
      console.error('Erreur lors de l’ajout du véhicule :', error);
      Alert.alert('Erreur', 'Impossible d’ajouter le véhicule.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajouter un Véhicule</Text>

      <TextInput
        style={styles.input}
        placeholder="Matricule (Obligatoire)"
        value={matricule}
        onChangeText={setMatricule}
        placeholderTextColor="#ccc"

      />
      <TextInput
        style={styles.input}
        placeholder="Marque (facultatif)"
        value={marque}
        onChangeText={setMarque}
        placeholderTextColor="#ccc"

      />
      <TextInput
        style={styles.input}
        placeholder="Modèle (facultatif)"
        value={modele}
        onChangeText={setModele}
        placeholderTextColor="#ccc"
      />

      <TouchableOpacity style={styles.button} onPress={handleAjoutVehicule}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
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
  button: {
    backgroundColor: '#00ADB5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AjouterVehiculeScreen;
