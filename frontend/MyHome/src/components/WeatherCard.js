import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function WeatherCard({ temperature, humidity, wind }) {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="weather-sunny" size={36} color="#ffb300" />
        <Text style={styles.headerText}>Météo du jour</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="thermometer" size={30} color="#d32f2f" />
          <Text style={styles.statLabel}>Température</Text>
          <Text style={styles.statValue}>{temperature}°C</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="water" size={30} color="#0277bd" />
          <Text style={styles.statLabel}>Humidité</Text>
          <Text style={styles.statValue}>{humidity}%</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="weather-windy" size={30} color="#455a64" />
          <Text style={styles.statLabel}>Vent</Text>
          <Text style={styles.statValue}>{wind} km/h</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 4,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#1b5e20',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
  },
  statLabel: {
    fontSize: 14,
    color: '#616161',
    marginTop: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 5,
  },
});
