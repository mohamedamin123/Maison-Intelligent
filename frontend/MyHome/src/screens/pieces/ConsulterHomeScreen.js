import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CARD_WIDTH = (Dimensions.get('window').width - 60) / 2;
const CARD_HEIGHT = 120;

const rooms = [
  { name: 'Salon', icon: 'sofa' },
  { name: 'Chambre', icon: 'bed-king-outline' },
  { name: 'Salle de bain', icon: 'shower-head' },
  { name: 'Jardin', icon: 'flower' },
  { name: 'Garage', icon: 'garage' },
  { name: 'Cave', icon: 'warehouse' },
];

const ConsulterHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { homeId } = route.params; // ✅ on reçoit l'id de la maison
  console.log('ConsulterHomeScreen - idHome reçu :', homeId);
  const handleRoomPress = (roomName) => {
    if (roomName === 'Garage') {
      navigation.navigate('ListeGarage', { homeId }); // ✅ on passe l’idHome
    } else if (roomName === 'Chambre') {
      navigation.navigate('ListeChambre', { homeId }); // ✅ on passe l’idHome
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🏠 Maison Intelligente</Text>
      <Text style={styles.subtitle}>Accédez aux pièces de la maison</Text>

      <View style={styles.grid}>
        {rooms.map((room, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleRoomPress(room.name)}
          >
            <Icon name={room.icon} size={32} color="#00ADB5" />
            <Text style={styles.cardText}>{room.name}</Text>
          </TouchableOpacity>
        ))}
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20, paddingBottom: 80 },
  title: {
    fontSize: 28, color: '#00ADB5', fontWeight: 'bold', textAlign: 'center', marginVertical: 20,
  },
  subtitle: {
    fontSize: 16, color: '#ccc', textAlign: 'center', marginBottom: 20,
  },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH, height: CARD_HEIGHT, backgroundColor: '#1e1e1e',
    borderRadius: 16, marginBottom: 16, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 3 }, elevation: 5,
  },
  cardText: {
    marginTop: 10, color: '#fff', fontSize: 14, fontWeight: '600',
  },
  mainButton: {
    backgroundColor: '#00ADB5', paddingVertical: 14, borderRadius: 25,
    marginTop: 24, alignSelf: 'center', paddingHorizontal: 32,
  },
  mainButtonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold',
  },
});

export default ConsulterHomeScreen;
