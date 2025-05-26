import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getVehiculeByUserId } from '../../../services/VehiculeService';
import useAuthStore from '../../../store/useAuthStore';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = (screenWidth - 60) / 2;
const CARD_HEIGHT = 120;

const ListeVehiculeScreen = () => {
  const navigation = useNavigation();
  const [vehicules, setVehicules] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const response = await getVehiculeByUserId(user.idUser);
        const vehiculesData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setVehicules(vehiculesData);
      } catch (error) {
        console.error('Erreur lors du chargement des véhicules :', error);
      }
    };

    fetchVehicules();
  }, []);

  const handleVehiculePress = (idVehicule) => {
    navigation.navigate('ConsulterVehicule', { idVehicule });
  };

  const renderVehicule = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleVehiculePress(item.idVehicule)}
    >
      <Icon name="car" size={32} color="#00ADB5" />
      <Text style={styles.cardText}>{item.matricule}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Liste des Véhicules</Text>
      <Text style={styles.subtitle}>Visualisez vos véhicules enregistrés</Text>

      <FlatList
        data={vehicules}
        renderItem={renderVehicule}
        keyExtractor={(item) => item.idVehicule?.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
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
    marginBottom: 20,
  },
  list: {
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#00ADB5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 24,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListeVehiculeScreen;
