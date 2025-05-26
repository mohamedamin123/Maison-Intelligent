import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getVehicule, updateVehicule } from '../../../services/VehiculeService';

const ConsulterVehiculeScreen = () => {
  const route = useRoute();
  const { idVehicule } = route.params;
  const navigation = useNavigation();

  const [vehicule, setVehicule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchVehicule = async () => {
      try {
        const response = await getVehicule(idVehicule);
        setVehicule(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du véhicule :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicule();
  }, [idVehicule]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    try {
      await updateVehicule(idVehicule, formData);
      Alert.alert("Succès", "Véhicule mis à jour avec succès !", [
        { text: 'OK', onPress: () => navigation.navigate('ListeVehicule') },
      ]);
      setVehicule(formData);
      setIsEditing(false);
      
    } catch (error) {
      Alert.alert("Erreur", "Échec de la mise à jour du véhicule.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ADB5" />
      </View>
    );
  }

  if (!vehicule) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Véhicule non trouvé.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚘 Détails du Véhicule</Text>

      <View style={styles.card}>
        <Icon name="car-info" size={60} color="#00ADB5" style={styles.icon} />

        {[
          { label: 'Matricule', key: 'matricule' },
          { label: 'Marque', key: 'marque' },
          { label: 'Modèle', key: 'modele' },

        ].map(({ label, key }) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>{label} :</Text>
            <TextInput
              style={styles.input}
              editable={isEditing}
              value={formData[key]?.toString()}
              onChangeText={(text) => handleChange(key, text)}
              keyboardType={key === 'annee' || key === 'kilometrage' ? 'numeric' : 'default'}
              placeholder={`Entrez ${label.toLowerCase()}`}
              placeholderTextColor="#666"
            />
          </View>
        ))}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isEditing ? '#4CAF50' : '#00ADB5' }]}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Icon name={isEditing ? 'content-save' : 'pencil'} size={18} color="#fff" />
          <Text style={styles.buttonText}>{isEditing ? 'Enregistrer' : 'Modifier'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    elevation: 5,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 18,
  },
});

export default ConsulterVehiculeScreen;
