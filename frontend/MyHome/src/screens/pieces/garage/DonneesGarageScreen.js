import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

const DonneesGarageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nomGarage, garageOpen, lightOn } = route.params || {};

  const [data, setData] = useState({
    temperature: 25.4,
    humidite: 55,
    lumiere: 300,
    gaz: 0.42,
    garageOpen: garageOpen ?? false,
    lightOn: lightOn ?? false,
  });

  useEffect(() => {
    // 🔹 Tu pourras ajouter un fetch vers ton backend ici plus tard
  }, []);

  return (
    <LinearGradient colors={['#121212', '#1E0A24']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🚗 Données du {nomGarage || 'Garage'}</Text>

        {/* 🔹 Ligne 1 : Température + Humidité */}
        <View style={styles.row}>
          <View style={styles.card}>
            <Icon name="thermometer" size={36} color="#FF7B00" />
            <Text style={styles.label}>Température</Text>
            <Text style={styles.value}>{data.temperature} °C</Text>
          </View>

          <View style={styles.card}>
            <Icon name="water-percent" size={36} color="#00B8D9" />
            <Text style={styles.label}>Humidité</Text>
            <Text style={styles.value}>{data.humidite} %</Text>
          </View>
        </View>

        {/* 🔹 Ligne 2 : Lumière + Gaz */}
        <View style={styles.row}>
          <View style={styles.card}>
            <Icon name="lightbulb-on" size={36} color="#FFD600" />
            <Text style={styles.label}>Lumière (valeur)</Text>
            <Text style={styles.value}>{data.lumiere} lx</Text>
          </View>

          <View style={styles.card}>
            <Icon name="smoke" size={36} color="#E53935" />
            <Text style={styles.label}>Gaz</Text>
            <Text style={styles.value}>{data.gaz} ppm</Text>
          </View>
        </View>

        {/* 🔹 Ligne 3 : États (garage + lumière on/off) */}
        <View style={styles.row}>
          <View style={[styles.card, { flex: 1, marginRight: 6 }]}>
            <Icon
              name={data.garageOpen ? 'garage-open' : 'garage'}
              size={36}
              color={data.garageOpen ? '#4CAF50' : '#FF5252'}
            />
            <Text style={styles.label}>Garage</Text>
            <Text
              style={[
                styles.value,
                { color: data.garageOpen ? '#4CAF50' : '#FF5252' },
              ]}
            >
              {data.garageOpen ? 'Ouvert' : 'Fermé'}
            </Text>
          </View>

          <View style={[styles.card, { flex: 1, marginLeft: 6 }]}>
            <Icon
              name={data.lightOn ? 'lightbulb-on' : 'lightbulb-outline'}
              size={36}
              color={data.lightOn ? '#FFD600' : '#777'}
            />
            <Text style={styles.label}>Lumière</Text>
            <Text
              style={[
                styles.value,
                { color: data.lightOn ? '#FFD600' : '#777' },
              ]}
            >
              {data.lightOn ? 'Allumée' : 'Éteinte'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 🔹 Bouton Retour */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={22} color="#fff" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 26,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  card: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 18,
    paddingVertical: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#00ADB5',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    color: '#B0B0B0',
    fontSize: 14,
    marginTop: 8,
  },
  value: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00ADB5',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 30,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DonneesGarageScreen;
