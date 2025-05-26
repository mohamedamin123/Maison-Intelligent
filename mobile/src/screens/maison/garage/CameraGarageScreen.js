import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const CameraGarageScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📹 Données de la Caméra</Text>

      {/* Exemple image simulée */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300x200.png?text=Flux+Caméra' }}
        style={styles.cameraView}
        resizeMode="cover"
      />

      <Text style={styles.info}>
        Dernière capture : {new Date().toLocaleString()}
      </Text>

      <Text style={styles.description}>
        La caméra enregistre automatiquement lorsqu’un mouvement est détecté. Vous pouvez visualiser les données ici.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20 },
  title: {
    fontSize: 24,
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraView: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  info: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#ddd',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CameraGarageScreen;
