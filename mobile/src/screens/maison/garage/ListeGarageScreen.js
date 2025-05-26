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
import { getGarageByUserId } from '../../../services/GarageService';
import useAuthStore from '../../../store/useAuthStore';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = (screenWidth - 60) / 2;
const CARD_HEIGHT = 120;

const ListeGarageScreen = () => {
  const navigation = useNavigation();
  const [garages, setGarages] = useState([]);
  const { user } = useAuthStore();

useEffect(() => {
  const fetchGarages = async () => {
    try {
      const response = await getGarageByUserId(user.idUser);
      console.log('Garages récupérés :', response.data);
      
      // S'assurer que c'est un tableau
      const garagesData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setGarages(garagesData);
    } catch (error) {
      console.error('Erreur lors du chargement des garages :', error);
    }
  };

  fetchGarages();
}, []);

  const handleGaragePress = (garageId) => {
    navigation.navigate('ConsulterGarage', { idGarage: garageId });
  };


  const renderGarage = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleGaragePress(item.idGarage)}>
      <Icon name="garage" size={32} color="#00ADB5" />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Liste des Garages</Text>
      <Text style={styles.subtitle}>Visualisez et ajoutez des garages</Text>

      <FlatList
        data={garages}
        renderItem={renderGarage}
        keyExtractor={(item) => item.idGarage?.toString() || item.id?.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AjouterGarage')}
      >
        <Icon name="plus-circle" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.addButtonText}>Ajouter un garage</Text>
      </TouchableOpacity>
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

export default ListeGarageScreen;
