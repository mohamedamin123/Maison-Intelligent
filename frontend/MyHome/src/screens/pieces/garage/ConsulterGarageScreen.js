import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAuthStore from '../../../store/useAuthStore';

const screenWidth = Dimensions.get('window').width;

const ConsulterGarageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idGarage } = route.params;
  const { user } = useAuthStore();

  const [garageOpen, setGarageOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [history, setHistory] = useState([]);

  const addHistory = (message) => {
    const timestamp = new Date().toISOString();
    setHistory((prev) => [`${message} à ${timestamp}`, ...prev]);
  };

  const toggleGarage = () => {
    const newState = !garageOpen;
    setGarageOpen(newState);
    addHistory(`Garage ${newState ? 'ouvert' : 'fermé'}`);
  };

  const toggleLight = () => {
    const newState = !lightOn;
    setLightOn(newState);
    addHistory(`Lumière ${newState ? 'allumée' : 'éteinte'}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🚗 Contrôle du Garage</Text>

      <View style={styles.row}>
        {/* Contrôle Garage */}
        <View style={styles.card}>
          <Icon
            name={garageOpen ? 'garage-open' : 'garage'}
            size={64}
            color={garageOpen ? '#00ff88' : '#aaa'}
          />
          <Text
            style={[styles.statusText, { color: garageOpen ? '#00ff88' : '#aaa' }]}
          >
            {garageOpen ? 'Garage ouvert' : 'Garage fermé'}
          </Text>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleGarage}>
            <Text style={styles.toggleButtonText}>
              {garageOpen ? 'Fermer' : 'Ouvrir'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Gestion Véhicule */}
        <View style={styles.card}>
          <Icon name="car-multiple" size={64} color="#ffcb05" />
          <Text style={[styles.statusText, { color: '#ffcb05' }]}>Gérer Véhicule</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => navigation.navigate('GererVehicule', { idGarage })}
          >
            <Text style={styles.toggleButtonText}>Aller à la gestion</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.row, { marginBottom: 30 }]}>
        {/* Caméra */}
        <View style={styles.card}>
          <Icon name="cctv" size={64} color="#00ADB5" />
          <Text style={[styles.statusText, { color: '#00ADB5' }]}>Visualisation</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => navigation.navigate('CameraGarage')}
          >
            <Text style={styles.toggleButtonText}>Visualiser données</Text>
          </TouchableOpacity>
        </View>

        {/* Lumière */}
        <View style={styles.card}>
          <Icon
            name={lightOn ? 'lightbulb-on-outline' : 'lightbulb-off-outline'}
            size={64}
            color={lightOn ? '#00ff88' : '#555'}
          />
          <Text style={[styles.statusText, { color: lightOn ? '#00ff88' : '#555' }]}>
            {lightOn ? 'Lumière activée' : 'Lumière désactivée'}
          </Text>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleLight}>
            <Text style={styles.toggleButtonText}>{lightOn ? 'Éteindre' : 'Allumer'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.toggleButton, { marginBottom: 20 }]}
        onPress={() => navigation.navigate('HistoriqueGarage', { history })}
      >
        <Text style={styles.toggleButtonText}>Voir l'historique complet</Text>
      </TouchableOpacity>

      {/* Bouton Retour en bas */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.returnButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, color: '#00ADB5', fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  card: {
    width: (screenWidth - 60) / 2,
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 30,
  },
  statusText: { marginTop: 12, fontSize: 18, fontWeight: '600', textAlign: 'center' },
  toggleButton: { backgroundColor: '#00ADB5', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 30, marginTop: 16 },
  toggleButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  bottomButtonContainer: { marginTop: 20, alignItems: 'center', marginBottom: 20 },
  returnButton: {
    flexDirection: 'row',
    backgroundColor: '#555',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ConsulterGarageScreen;
