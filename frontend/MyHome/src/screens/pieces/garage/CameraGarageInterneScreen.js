import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';

const CameraGarageInterneScreen = () => {
  const [uri, setUri] = useState('http://192.168.1.125:81/stream');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setUri(`http://192.168.1.125:81/stream?_t=${Date.now()}`);
      setLoading(true); // active le loader à chaque rafraîchissement
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📹 Caméra Garage Interne</Text>

      <View style={styles.cameraContainer}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#00ADB5"
            style={styles.loader}
          />
        )}
        <Image
          source={{ uri }}
          style={styles.cameraView}
          resizeMode="cover"
          onLoadEnd={() => setLoading(false)}
        />
      </View>

      <Text style={styles.info}>
        Dernière capture : {new Date().toLocaleString()}
      </Text>

      <Text style={styles.description}>
        La caméra enregistre automatiquement lorsqu’un mouvement est détecté. Vous pouvez visualiser le flux en direct ici.
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
    marginVertical: 20,
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#333',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cameraView: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  info: { color: '#aaa', textAlign: 'center', marginBottom: 10 },
  description: { color: '#ddd', fontSize: 16, textAlign: 'center' },
});

export default CameraGarageInterneScreen;
