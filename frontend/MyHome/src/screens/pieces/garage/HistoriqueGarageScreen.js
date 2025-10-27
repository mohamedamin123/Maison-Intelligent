import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { format, parseISO, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formatte une date ISO en date lisible complète
const formatDate = (isoString) => {
  try {
    if (!isoString) return 'Date inconnue';
    const date = parseISO(isoString);
    if (!isValid(date)) return 'Date inconnue';
    return format(date, "eeee dd MMMM yyyy 'à' HH:mm", { locale: fr });
  } catch {
    return 'Date inconnue';
  }
};

// Formatte juste la date pour grouper par jour (sans heure)
const getDateKey = (isoString) => {
  try {
    if (!isoString) return 'Date inconnue';
    const date = parseISO(isoString);
    if (!isValid(date)) return 'Date inconnue';
    return format(date, "eeee dd MMMM yyyy", { locale: fr });
  } catch {
    return 'Date inconnue';
  }
};

// Groupe l'historique par date (au format ISO)
const groupHistoryByDay = (history) => {
  const grouped = {};

  history.forEach((entry) => {
    const dateKey = getDateKey(entry.dateAction);
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(entry);
  });

  return Object.keys(grouped).map((key) => ({
    title: key,
    data: grouped[key],
  }));
};

const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const HistoriqueGarageScreen = ({ route }) => {
  // On récupère l'historique passé depuis ConsulterGarageScreen
  const { history: initialHistory } = route.params || { history: [] };
  const [history, setHistory] = useState(initialHistory);

  // Optionnel : générer un historique factice si aucun n’est passé
  useEffect(() => {
    if (!initialHistory || initialHistory.length === 0) {
      const fakeHistory = [
        { element: 'PORT', action: 'OUVRIR', dateAction: new Date().toISOString() },
        { element: 'LUMIERE', action: 'FERMER', dateAction: new Date().toISOString() },
      ];
      setHistory(fakeHistory);
    }
  }, [initialHistory]);

  const sections = groupHistoryByDay(history);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.action + item.dateAction + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.bullet} />
            <Text style={styles.item}>
              {capitalizeFirstLetter(item.element)} du garage a été{' '}
              {item.action === 'OUVRIR' ? 'ouvert 🔓' : 'fermé 🔒'} le {formatDate(item.dateAction)}.
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune action enregistrée.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  itemContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ADB5',
    marginTop: 8,
    marginRight: 10,
  },
  item: { color: '#E0E0E0', fontSize: 16, lineHeight: 22, flex: 1 },
  empty: { color: '#888', fontSize: 16, textAlign: 'center', marginTop: 30 },
});

export default HistoriqueGarageScreen;
