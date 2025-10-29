import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRoomsByTypeAndHomeId, deleteRoom } from '../../../services/RoomService';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth - 40;
const CARD_HEIGHT = 120;
const ROOM="GARAGE"

const ListeGarageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { homeId } = route.params;
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState(null);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await getRoomsByTypeAndHomeId(ROOM, homeId);
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

  // 🔹 Gestion du clic sur un garage
  const handleGaragePress = (garage) => {
    setSelectedGarage(garage);
    setModalVisible(true);
  };

  // 🔹 Actions Modal
  const handleConsulter = () => {
    setModalVisible(false);
    navigation.navigate('ConsulterGarage', {
      idGarage: selectedGarage.idRoom,
      homeId,
      nomGarage: selectedGarage.nom,
    });
  };

  const handleEdit = () => {
    setModalVisible(false);
    navigation.navigate('AjouterGarage', {
      homeId,
      garageToEdit: selectedGarage, // tu peux envoyer l'objet complet pour pré-remplir le formulaire
    });
  };
  const handleSupprimer = () => {
    Alert.alert(
      'Confirmer la suppression',
      `Voulez-vous vraiment supprimer le garage "${selectedGarage.nom}" ?`,
      [
        {
          text: 'Non',
          style: 'cancel',
        },
        {
          text: 'Oui',
          style: 'destructive',
          onPress: async () => {
            setModalVisible(false);
            try {
              await deleteRoom(selectedGarage.idRoom);
              setGarages((prev) => prev.filter(g => g.idRoom !== selectedGarage.idRoom));
            } catch (error) {
              console.error('Erreur suppression garage :', error);
              Alert.alert('Erreur', 'Impossible de supprimer le garage.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };


  const renderGarage = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleGaragePress(item)}
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
          numColumns={1}
          key={'single-column'}
          contentContainerStyle={[styles.list, { paddingBottom: 200 }]}
        />
      )}

      {/* Modal avec 3 boutons */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedGarage?.nom}</Text>
            <Text style={styles.modalSubtitle}>{selectedGarage?.surface} m²</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleConsulter}>
              <Text style={styles.modalButtonText}>Consulter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
              <Text style={styles.modalButtonText}>Éditer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#FF4C4C' }]} onPress={handleSupprimer}>
              <Text style={styles.modalButtonText}>Supprimer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#555' }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Boutons Ajouter et Retour */}
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
          onPress={() => navigation.navigate('Home')}
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
   modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 8,
  },
  modalSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#00ADB5',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default ListeGarageScreen;
