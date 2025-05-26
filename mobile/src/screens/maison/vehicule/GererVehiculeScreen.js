import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getVehiculeByGarageId } from '../../../services/VehiculeService';

const GererVehiculeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idGarage } = route.params;

  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(true);

  const chargerVehicules = async () => {
    try {
      console.log("id garage dans gerer ",idGarage)
      const response = await getVehiculeByGarageId(idGarage);
      setVehicules(response.data);
      console.log("Véhicules chargés :", vehicules);

    } catch (error) {
      console.error('Erreur lors du chargement des véhicules :', error);
      Alert.alert('Erreur', "Impossible de charger les véhicules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chargerVehicules();
  }, []);

  const renderVehicule = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nom}>🚘 {item.matricule}</Text>
      <Text style={styles.status}>Marque : {item.marque || 'N/A'}</Text>
      <Text style={styles.status}>Modèle : {item.modele || 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gérer les Véhicules</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00ADB5" />
      ) : (
        <FlatList
          data={vehicules}
          renderItem={renderVehicule}
          keyExtractor={(item) => item.idVehicule?.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('AjouterVehicule', { idGarage })
        }
      >
        <Text style={styles.buttonText}>➕ Ajouter un véhicule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: {
    fontSize: 24,
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  nom: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    color: '#aaa',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#00ADB5',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default GererVehiculeScreen;
