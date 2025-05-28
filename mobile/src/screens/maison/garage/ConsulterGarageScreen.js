import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { changerPortGarage,changerLumiereGarage,getGarage   } from '../../../services/GarageService'; // ajuste le chemin selon ton projet
import { ajouterhistoriqueEvenement } from '../../../services/HistoriqueEvenementService'; // importe la fonction
import useAuthStore from '../../../store/useAuthStore';

const screenWidth = Dimensions.get('window').width;

const ConsulterGarageScreen = () => {
  const navigation = useNavigation();

  const [garageOpen, setGarageOpen] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [motionSensorActive, setMotionSensorActive] = useState(true);
  const [history, setHistory] = useState([]);
  const [lightOn, setLightOn] = useState(false);
  const route = useRoute();
  const { idGarage } = route.params;
    const { user } = useAuthStore();


  
useEffect(() => {
  const fetchGarageData = async () => {
    try {
      const response = await getGarage(idGarage);
      const garage = response.data;



      setGarageOpen(garage.etat);         // ← Champ à ajuster selon ton backend
      setLightOn(garage.lumiere);       // ← Champ à ajuster selon ton backend

      // Ajoute des historiques initiaux si tu veux :
      addHistory(`État initial - Garage ${garage.estOuvert ? 'ouvert' : 'fermé'}`);
      addHistory(`État initial - Lumière ${garage.lumiereAllumee ? 'allumée' : 'éteinte'}`);
    } catch (error) {
      console.error('Erreur lors du chargement du garage:', error);
      Alert.alert('Erreur', 'Impossible de récupérer l’état du garage.');
    }
  };

  fetchGarageData();
}, [idGarage]);

  const addHistory = (message) => {
    const timestamp = new Date().toISOString(); // date complète ISO
    setHistory((prev) => [`${message} à ${timestamp}`, ...prev]);
  };


const toggleGarage = async () => {
  try {
    const newState = !garageOpen;
    
    // Appelle l'API avec le nouvel état (true = ouvrir, false = fermer)
    await changerPortGarage(idGarage, newState);

    setGarageOpen(newState);

    Alert.alert('Succès', `Garage ${newState ? 'ouvert' : 'fermé'}`);
        // ✅ Enregistrement dans la base
    // ✅ Préparation des données pour l'historique
    const data = {
      action: newState ? "OUVRIR" : "FERMER", // ⚠️ correspond à l'enum Commande
      type: "GARAGE",   
      element:"PORT",                       // ⚠️ correspond à l'enum TypePiece
      idUser: user.idUser                         // ⚠️ identifiant de l'utilisateur connecté
    };
    await ajouterhistoriqueEvenement(data);
  } catch (error) {
    console.error("Erreur de commande du port :", error);
    Alert.alert("Erreur", "Impossible de changer l’état  du port.");
  }
};

  const toggleLight = async () => {
    try {
        const newState = !lightOn;
    await changerLumiereGarage(idGarage, newState);
  setLightOn(newState);
  Alert.alert('Lumière', newState ? 'Lumière allumée' : 'Lumière éteinte');
    const data = {
      action: newState ? "OUVRIR" : "FERMER", // ⚠️ correspond à l'enum Commande
      type: "GARAGE",   
      element:"LUMIERE",                       // ⚠️ correspond à l'enum TypePiece
      idUser: user.idUser                         // ⚠️ identifiant de l'utilisateur connecté
    };
    await ajouterhistoriqueEvenement(data);    } catch (error) {
    console.error("Erreur de commande du lumiere :", error);
    Alert.alert("Erreur", "Impossible de changer l’état  du lumiere.");
    }



};


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🚗 Contrôle du Garage</Text>

      {/* Ligne garage + capteur */}
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

        {/* Contrôle Vehicule */}
        <View style={styles.card}>
            <Icon
              name="car-multiple"
              size={64}
              color="#ffcb05"
            />
            <Text style={[styles.statusText, { color: '#ffcb05' }]}>
              Gérer Véhicule
            </Text>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => navigation.navigate('GererVehicule', { idGarage })}
            >
              <Text style={styles.toggleButtonText}>
                Aller à la gestion
              </Text>
            </TouchableOpacity>
          </View>

      </View>

      {/* Contrôle caméra en dessous */}
{/* Conteneur ligne pour caméra + lumière */}
<View style={[styles.row, { marginBottom: 30 }]}>
  {/* Caméra */}
 <View style={styles.card}>
    <Icon
      name="cctv"
      size={64}
      color="#00ADB5"
    />
    <Text style={[styles.statusText, { color: '#00ADB5' }]}>
      Visualisation
    </Text>
    <TouchableOpacity
      style={styles.toggleButton}
      onPress={() => navigation.navigate('CameraGarage')}
    >
      <Text style={styles.toggleButtonText}>
        Visualiser données
      </Text>
    </TouchableOpacity>
  </View>

  {/* Lumière */}
  <View style={styles.card}>
    <Icon
      name={lightOn ? "lightbulb-on-outline" : "lightbulb-off-outline"}
      size={64}
      color={lightOn ? '#00ff88' : '#555'}
    />
    <Text style={[styles.statusText, { color: lightOn ? '#00ff88' : '#555' }]}>
      {lightOn ? 'Lumière activée' : 'Lumière désactivée'}
    </Text>
    <TouchableOpacity style={styles.toggleButton} onPress={toggleLight}>
      <Text style={styles.toggleButtonText}>
        {lightOn ? 'Éteindre' : 'Allumer'}
      </Text>
    </TouchableOpacity>
  </View>
</View>


      {/* Bouton pour ouvrir l'historique */}
      <TouchableOpacity
        style={[styles.toggleButton, { marginBottom: 20 }]}
        onPress={() => navigation.navigate('HistoriqueGarage', { history })}
      >
        <Text style={styles.toggleButtonText}>Voir l'historique complet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 26,
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    width: (screenWidth - 60) / 2, // 20 padding left + 20 right + 20 between
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 30,
  },
  statusText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
        textAlign: 'center',

  },
  toggleButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 16,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
        textAlign: 'center',

  },
});

export default ConsulterGarageScreen;
