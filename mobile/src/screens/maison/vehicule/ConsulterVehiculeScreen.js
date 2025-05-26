import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getVehicule } from '../../../services/VehiculeService';

const ConsulterVehiculeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { idVehicule } = route.params;

  const [vehicule, setVehicule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicule = async () => {
      try {
        const response = await getVehicule(idVehicule);
        setVehicule(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du véhicule :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicule();
  }, [idVehicule]);

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

        <Text style={styles.label}>Matricule :</Text>
        <Text style={styles.value}>{vehicule.matricule}</Text>

        <Text style={styles.label}>Marque :</Text>
        <Text style={styles.value}>{vehicule.marque}</Text>

        <Text style={styles.label}>Modèle :</Text>
        <Text style={styles.value}>{vehicule.modele}</Text>

        <Text style={styles.label}>Année :</Text>
        <Text style={styles.value}>{vehicule.annee}</Text>

        <Text style={styles.label}>Kilométrage :</Text>
        <Text style={styles.value}>{vehicule.kilometrage} km</Text>

        <Text style={styles.label}>Type :</Text>
        <Text style={styles.value}>{vehicule.type}</Text>

        {/* Si tu veux ajouter un bouton modifier */}
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={() =>
            navigation.navigate('ModifierVehicule', { idVehicule: vehicule.idVehicule })
          }
        >
          <Icon name="pencil" size={18} color="#fff" />
          <Text style={styles.modifyText}>Modifier</Text>
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
  label: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
  modifyButton: {
    flexDirection: 'row',
    backgroundColor: '#00ADB5',
    padding: 12,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifyText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default ConsulterVehiculeScreen;
