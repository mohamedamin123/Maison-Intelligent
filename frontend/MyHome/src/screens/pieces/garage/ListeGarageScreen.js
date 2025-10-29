import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getGaragesByHomeId } from '../../../services/GarageService';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth - 40; // un garage par ligne
const CARD_HEIGHT = 120;

const ListeGarageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { homeId } = route.params;
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        console.log('Chargement des garages pour la maison ID :', homeId);
        const response = await getGaragesByHomeId(homeId);
        console.log('Garages récupérés :', response);

        const garagesData = Array.isArray(response) ? response : [response];
        setGarages(garagesData);
      } catch (error) {
        console.error('Erreur lors du chargement des garages :', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (homeId) fetchGarages();
  }, [homeId]);

  // 🔹 Correction de handleGaragePress pour envoyer homeId + nomGarage
  const handleGaragePress = (idRoom, nomGarage) => {
    navigation.navigate('ConsulterGarage', { 
      idGarage: idRoom, 
      homeId, 
      nomGarage // ➕ on envoie aussi le nom du garage
    });
  };

  // 🔹 Dans renderGarage, on passe aussi le nom
  const renderGarage = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleGaragePress(item.idRoom, item.nom)} // ➕ ajout du nom
    >
      <Icon name="garage" size={32} color="#00ADB5" />
      <Text style={styles.cardText}>{item.nom}</Text>
      <Text style={styles.surfaceText}>{item.surface} m²</Text>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Liste des Garages</Text>
      <Text style={styles.subtitle}>Visualisez et ajoutez des garages</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00ADB5" style={{ marginTop: 20 }} />
      ) : garages.length === 0 ? (
        <Text style={styles.emptyText}>Aucun garage trouvé pour cette maison.</Text>
      ) : (
        <FlatList
          data={garages}
          renderItem={renderGarage}
          keyExtractor={(item) => item.idRoom.toString()}
          numColumns={1} // un garage par ligne
          key={'single-column'} // 🔑 clé fixe pour forcer le rendu en 1 colonne
          contentContainerStyle={[styles.list, { paddingBottom: 200 }]}
        />

      )}

      {/* Conteneur des boutons en bas */}
      <View style={styles.bottomButtons}>


        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('AjouterGarage', { homeId })}
        >
          <Icon name="plus-circle" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.bottomButtonText}>Ajouter un garage</Text>
        </TouchableOpacity>

                <TouchableOpacity
          style={[styles.bottomButton, { backgroundColor: '#555' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.bottomButtonText}>⬅ Retour</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 30,
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
    marginBottom: 16,
  },
  cardText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  surfaceText: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 4,
  },
  bottomButtons: {
    marginTop: 20,
  },
  bottomButton: {
    flexDirection: 'row',
    backgroundColor: '#00ADB5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 12,
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ListeGarageScreen;
