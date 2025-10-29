import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createHistoryEvent, getHistoryEventsByRoomId } from '../../../services/HistoryService';

const screenWidth = Dimensions.get('window').width;

const ConsulterGarageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idGarage, homeId, nomGarage } = route.params || {};
  

  const [garageOpen, setGarageOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idGarage) return;

    const fetchHistory = async () => {
      try {
        const events = await getHistoryEventsByRoomId(idGarage);
        setHistory(events);

        const lastGarageEvent = events
          .filter(e => e.action.toLowerCase().includes('port'))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        if (lastGarageEvent) setGarageOpen(lastGarageEvent.action.toLowerCase().includes('ouvert'));

        const lastLightEvent = events
          .filter(e => e.action.toLowerCase().includes('lumière'))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        if (lastLightEvent) setLightOn(lastLightEvent.action.toLowerCase().includes('allumée'));
      } catch (error) {
        console.error('Erreur récupération historique:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [idGarage]);

  const addHistory = async (message) => {
    const timestamp = new Date().toISOString();
    const newEntry = { action: message, createdAt: timestamp, homeId: homeId };
    setHistory(prev => [newEntry, ...prev]);

    try {
      await createHistoryEvent({
        roomId: idGarage,
        roomName: 'Garage',
        action: message,
        homeId: homeId,
      });
    } catch (error) {
      console.error('Erreur sauvegarde historique:', error.response?.data || error.message);
    }
  };

  const toggleGarage = () => {
    const newState = !garageOpen;
    setGarageOpen(newState);
    addHistory(`Port ${newState ? 'ouvert' : 'fermé'}`);
  };

  const toggleLight = () => {
    const newState = !lightOn;
    setLightOn(newState);
    addHistory(`Lumière ${newState ? 'allumée' : 'éteinte'}`);
  };

  if (!idGarage) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff', fontSize: 18 }}>ID Garage manquant !</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00ADB5" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Chargement de l'état du garage...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🚗Contrôle du {nomGarage ? nomGarage : 'Garage'}</Text>

      <View style={styles.row}>
        {/* Garage */}
        <View style={styles.card}>
          <Icon
            name={garageOpen ? 'garage-open' : 'garage'}
            size={64}
            color={garageOpen ? '#00ff88' : '#aaa'}
          />
          <Text style={[styles.statusText, { color: garageOpen ? '#00ff88' : '#aaa' }]}>
            {garageOpen ? 'Port ouvert' : 'Port fermé'}
          </Text>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleGarage}>
            <Text style={styles.toggleButtonText}>{garageOpen ? 'Fermer' : 'Ouvrir'}</Text>
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

      {/* 🔹 Caméras : Interne + Externe */}
      <View style={[styles.row, { marginBottom: 30 }]}>
        {/* Caméra interne */}
        <View style={styles.card}>
          <Icon name="cctv" size={64} color="#00ADB5" />
          <Text style={[styles.statusText, { color: '#00ADB5' }]}>Caméra interne</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => navigation.navigate('CameraGarageInterne', { idGarage })}
          >
            <Text style={styles.toggleButtonText}>Visualiser</Text>
          </TouchableOpacity>
        </View>

        {/* Caméra externe */}
        <View style={styles.card}>
          <Icon name="video-wireless-outline" size={64} color="#00ADB5" />
          <Text style={[styles.statusText, { color: '#00ADB5' }]}>Caméra externe</Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => navigation.navigate('CameraGarageExterne', { idGarage, homeId, nomGarage })}
          >
            <Text style={styles.toggleButtonText}>Visualiser</Text>
          </TouchableOpacity>
        </View>
      </View>

    {/* Historique */}
    <TouchableOpacity
      style={[styles.toggleButton, { marginBottom: 16 }]}
      onPress={() => navigation.navigate('HistoriqueGarage', { homeId, idGarage, nomGarage })}
    >
      <Text style={styles.toggleButtonText}>Voir l'historique complet</Text>
    </TouchableOpacity>

    {/* 🔹 Nouveau bouton pour les données/statistiques */}
<TouchableOpacity
  style={[styles.toggleButton, { marginBottom: 20 }]}
  onPress={() =>
    navigation.navigate('DonneesGarage', {
      idGarage,
      homeId,
      nomGarage,
      garageOpen, // 🔹 envoi état du port
      lightOn,    // 🔹 envoi état lumière
    })
  }
>
  <Text style={styles.toggleButtonText}>Voir les données du garage</Text>
</TouchableOpacity>



    {/* Retour */}
    <View style={styles.bottomButtonContainer}>
      <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
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
