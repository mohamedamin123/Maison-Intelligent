import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const tempData = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  datasets: [{ data: [21.2, 22.5, 23, 22.8, 21.7, 22] }],
};

const humidityData = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  datasets: [{ data: [40, 42, 43, 45, 44, 46] }],
};

const SmartHomeDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏠 Maison intelligente</Text>

      {/* Statut */}
      <View style={styles.statusBar}>
        <Icon name="wifi" size={18} color="#00ff88" />
        <Text style={styles.statusText}>Connectée</Text>
        <Icon name="clock-outline" size={16} color="#aaa" style={{ marginLeft: 12 }} />
        <Text style={styles.updateText}>Maj : il y a 2 min</Text>
      </View>

      {/* Groupe 1 : Température + Humidité */}
      <View style={styles.row}>
        <View style={styles.cardHalf}>
          <Icon name="thermometer" size={28} color="#00ADB5" style={styles.icon} />
          <View>
            <Text style={styles.cardLabel}>Température</Text>
            <Text style={styles.cardValue}>22°C</Text>
          </View>
        </View>

        <View style={styles.cardHalf}>
          <Icon name="water-percent" size={28} color="#00ADB5" style={styles.icon} />
          <View>
            <Text style={styles.cardLabel}>Humidité</Text>
            <Text style={styles.cardValue}>45%</Text>
          </View>
        </View>
      </View>

      {/* Groupe 2 : Énergie + Sécurité */}
      <View style={styles.row}>
        <View style={styles.cardHalf}>
          <Icon name="flash" size={28} color="#00ADB5" style={styles.icon} />
          <View>
            <Text style={styles.cardLabel}>Énergie</Text>
            <Text style={styles.cardValue}>350W</Text>
          </View>
        </View>

        <View style={styles.cardHalf}>
          <Icon name="shield-lock-outline" size={28} color="#00ADB5" style={styles.icon} />
          <View>
            <Text style={styles.cardLabel}>Sécurité</Text>
            <Text style={styles.cardValue}>Active</Text>
          </View>
        </View>
      </View>

      {/* Graphique Température */}
      <Text style={styles.chartTitle}>🌡️ Température (semaine)</Text>
      <LineChart
        data={tempData}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="°C"
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Graphique Humidité */}
      <Text style={styles.chartTitle}>💧 Humidité (semaine)</Text>
      <LineChart
        data={humidityData}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="%"
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#121212',
  backgroundGradientTo: '#121212',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 173, 181, ${opacity})`,
  labelColor: () => '#aaa',
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#00ADB5',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 16,
         textAlign: 'center'

  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    color: '#00ff88',
    marginLeft: 6,
    fontSize: 14,
  },
  updateText: {
    color: '#aaa',
    marginLeft: 6,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardHalf: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  cardLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  cardValue: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  chartTitle: {
    marginTop: 24,
    marginBottom: 10,
    color: '#ccc',
    fontSize: 18,
    fontWeight: '500',
  },
  chart: {
    borderRadius: 12,
  },
});

export default SmartHomeDashboard;
