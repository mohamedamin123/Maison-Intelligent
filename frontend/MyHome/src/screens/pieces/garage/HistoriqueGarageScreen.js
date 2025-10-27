import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { format, parseISO, isValid, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getHistoryEventsByRoomId, getHistoryEventsByHomeId } from '../../../services/HistoryService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from 'react-native-paper';

// ----- Formatage -----
const formatDate = (isoString) => {
  if (!isoString) return 'Date inconnue';
  const date = parseISO(isoString);
  if (!isValid(date)) return 'Date inconnue';
  return format(date, "eeee dd MMMM yyyy 'à' HH:mm", { locale: fr });
};

const getDateKey = (isoString) => {
  if (!isoString) return 'Date inconnue';
  const date = parseISO(isoString);
  if (!isValid(date)) return 'Date inconnue';
  return format(date, "eeee dd MMMM yyyy", { locale: fr });
};

// ----- Composant Item -----
const HistoryItem = ({ item }) => {
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
    <Card style={styles.card}>
      <View style={styles.itemRow}>
        <Icon name={getIcon(item.action)} size={24} color="#00ADB5" style={{ marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.actionText}>
            {item.roomName || 'Élément'} a été {item.action.toLowerCase()}
          </Text>
          <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
        </View>
      </View>
    </Card>
  );
};

// ----- Fonction principale -----
const HistoriqueGarageScreen = ({ route }) => {
  const { idGarage, homeId } = route.params || {};
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        if (!idGarage && !homeId) return;

        let events = [];
        if (idGarage) {
          events = await getHistoryEventsByRoomId(idGarage);
        } else if (homeId) {
          events = await getHistoryEventsByHomeId(homeId);
        }

        setHistory(events);
      } catch (error) {
        console.error('Erreur récupération historique:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [idGarage, homeId]);

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

  // ----- Filtrage par date -----
  const filteredHistory = selectedDate
    ? history.filter((item) =>
        isSameDay(parseISO(item.createdAt), selectedDate)
      )
    : history;

  const sections = groupHistoryByDay(filteredHistory);

  return (
    <View style={styles.container}>
      {/* Barre de recherche par date */}
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Icon name="calendar-search" size={22} color="#fff" />
          <Text style={styles.dateButtonText}>
            {selectedDate
              ? format(selectedDate, 'dd MMMM yyyy', { locale: fr })
              : 'Filtrer par date'}
          </Text>
        </TouchableOpacity>

        {selectedDate && (
          <TouchableOpacity onPress={() => setSelectedDate(null)}>
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

      {/* Liste de l'historique */}
      {loading ? (
        <ActivityIndicator size="large" color="#00ADB5" style={{ marginTop: 50 }} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.idHistory.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          renderItem={({ item }) => <HistoryItem item={item} />}
          ListEmptyComponent={
            <Text style={styles.empty}>
              {selectedDate
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
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginVertical: 10,
    textTransform: 'capitalize',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,173,181,0.2)',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#E0E0E0',
    fontSize: 15,
    marginBottom: 4,
  },
  dateText: {
    color: '#999',
    fontSize: 13,
  },
  empty: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default HistoriqueGarageScreen;
