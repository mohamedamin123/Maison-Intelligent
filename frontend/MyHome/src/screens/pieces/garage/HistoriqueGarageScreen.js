import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {
  getHistoryEventsByHomeIdAndRoomIdAndDate,
} from '../../../services/HistoryService';

// Format complet avec heure
const formatDate = (isoString) => {
  if (!isoString) return 'Date inconnue';
  const date = parseISO(isoString);
  return format(date, "eeee dd MMMM yyyy 'à' HH:mm", { locale: fr });
};

// Format date pour section (jour uniquement)
const getDateKey = (isoString) => {
  if (!isoString) return 'Date inconnue';
  const date = parseISO(isoString);
  return format(date, "eeee dd MMMM yyyy", { locale: fr });
};

// ----- Composant Item -----
const HistoryItem = ({ item, index, nomGarage }) => {
  const getIcon = (action) => {
    const act = action?.toLowerCase() || '';
    if (act.includes('garage')) {
      return act.includes('ouvert') ? 'garage-open' : 'garage';
    } else if (act.includes('lumière')) {
      return act.includes('allumée') ? 'lightbulb-on-outline' : 'lightbulb-off-outline';
    }
    return 'circle';
  };

  return (
    <Animatable.View animation="fadeInUp" delay={index * 60}>
      <Card style={styles.card}>
        <View style={styles.itemRow}>
          <View style={styles.iconWrapper}>
            <Icon name={getIcon(item.action)} size={26} color="#00ADB5" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionText}>
              {nomGarage || 'Garage'} : {item.action.toLowerCase()}
            </Text>
            <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
      </Card>
    </Animatable.View>
  );
};

// ----- Écran principal -----
const HistoriqueGarageScreen = ({ route }) => {
  const { homeId, idGarage, nomGarage } = route.params || {};

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [searchText, setSearchText] = useState('');

  // ----- Récupération de l'historique -----
  useEffect(() => {
    const fetchHistory = async () => {
      console.log('Fetching history for homeId:', homeId, 'idGarage:', idGarage, 'nomGarage:', nomGarage);
      try {
        setLoading(true);

        // Création d'un LocalDateTime pour minuit de la date sélectionnée
        const startOfDay = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2,'0')}-${String(selectedDate.getDate()).padStart(2,'0')}T00:00:00`;

        const events = await getHistoryEventsByHomeIdAndRoomIdAndDate(homeId, idGarage, startOfDay);

        setHistory(events);
      } catch (error) {
        console.error('Erreur récupération historique:', error.message);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [homeId, idGarage, selectedDate]);

  // ----- Grouper par jour -----
  const groupHistoryByDay = (data) => {
    const grouped = {};
    data.forEach((entry) => {
      const dateKey = getDateKey(entry.createdAt);
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(entry);
    });
    return Object.keys(grouped).map((key) => ({
      title: key,
      data: grouped[key],
    }));
  };

  // ----- Filtrage recherche -----
  const filteredHistory = history.filter((item) =>
    item.action.toLowerCase().includes(searchText.toLowerCase())
  );

  const sections = groupHistoryByDay(filteredHistory);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Historique des actions</Text>
        <Text style={styles.headerSubtitle}>
          Consultez toutes les activités du garage et de la maison
        </Text>
      </Animatable.View>

      {/* Filtres */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
          <Icon name="calendar-search" size={22} color="#fff" />
          <Text style={styles.dateButtonText}>
            {selectedDate
              ? format(selectedDate, 'dd MMM yyyy', { locale: fr })
              : 'Filtrer par date'}
          </Text>
        </TouchableOpacity>

        {selectedDate && (
          <TouchableOpacity onPress={() => setSelectedDate(new Date())}>
            <Icon name="close-circle" size={24} color="#E94560" />
          </TouchableOpacity>
        )}
      </View>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="calendar"
          locale="fr-FR"
          onChange={(event, date) => {
            setShowPicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      {/* Liste */}
      {loading ? (
        <ActivityIndicator size="large" color="#00ADB5" style={{ marginTop: 50 }} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.idHistory.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item, index }) => (
            <HistoryItem item={item} index={index} nomGarage={nomGarage} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {history.length === 0
                ? 'Aucune action pour cette date.'
                : 'Aucune action enregistrée.'}
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117', paddingHorizontal: 16, paddingTop: 20 },
  headerContainer: { marginBottom: 16 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#00ADB5', marginVertical: 20 ,textAlign: 'center' },
  headerSubtitle: { color: '#bbb', fontSize: 14 },
  filterContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ADB5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  sectionHeader: { color: '#00ADB5', fontSize: 16, fontWeight: '600', marginVertical: 10, textTransform: 'capitalize' },
  card: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, marginBottom: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(0,173,181,0.3)' },
  iconWrapper: { backgroundColor: 'rgba(0,173,181,0.1)', borderRadius: 8, padding: 6, marginRight: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  actionText: { color: '#E0E0E0', fontSize: 15, fontWeight: '500', marginBottom: 4 },
  dateText: { color: '#999', fontSize: 13 },
  emptyText: { color: '#777', fontSize: 15, textAlign: 'center', marginTop: 40 },
});

export default HistoriqueGarageScreen;
