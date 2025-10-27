import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PiecesScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Gestion des pièces</Text>
      <Text style={styles.subtitle}>Aucune pièce ajoutée pour le moment</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AjouterPiece')} // 👈 Vers un autre écran
      >
        <Text style={styles.addButtonText}>+ Ajouter une pièce</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#00ADB5',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 30,
  },
  addButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PiecesScreen;
