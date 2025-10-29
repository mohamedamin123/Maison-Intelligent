import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAuthStore from '../../store/useAuthStore';

const HomeParentScreen = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();

  const handleConsult = () => {
    if (!user?.idHome) {
      Alert.alert("Erreur", "Aucune maison associée trouvée !");
      return;
    }
    navigation.navigate("ConsulterHome", { homeId: user.idHome });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏡 Maison Intelligente</Text>
      <Text style={styles.subtitle}>Gérez votre maison en un seul clic</Text>

      {/* 🔹 Section d’aperçu des fonctionnalités */}
      <View style={styles.section}>
        <View style={styles.card}>
          <Icon name="lightbulb-on-outline" size={40} color="#00ADB5" />
          <Text style={styles.cardText}>Lumières</Text>
        </View>

        <View style={styles.card}>
          <Icon name="thermometer" size={40} color="#00ADB5" />
          <Text style={styles.cardText}>Température</Text>
        </View>

        <View style={styles.card}>
          <Icon name="shield-home-outline" size={40} color="#00ADB5" />
          <Text style={styles.cardText}>Sécurité</Text>
        </View>
      </View>

      {/* 🔹 Bouton principal */}
      <TouchableOpacity style={styles.mainButton} onPress={handleConsult}>
        <Text style={styles.mainButtonText}>Voir toutes les fonctionnalités</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#00ADB5',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  card: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    width: 100,
    height: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  mainButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeParentScreen;
