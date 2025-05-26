import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import useAuthStore from '../../store/useAuthStore';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { logout } = useAuthStore();
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Paramètres</Text>

      {/* Section Profil */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Home')}>
          <View style={styles.optionLeft}>
            <Icon name="user" size={22} color="#555" />
            <Text style={styles.optionText}>Mon Profil</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Section Bébés */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Home')}>
          <View style={styles.optionLeft}>
            <Icon name="users" size={22} color="#555" />
            <Text style={styles.optionText}>Mes Bébés</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Préférences */}
      <View style={styles.card}>
        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Icon name="moon" size={22} color="#555" />
            <Text style={styles.optionText}>Mode Sombre (Auto)</Text>
          </View>
          <Switch value={true} disabled style={styles.switch} />
        </View>

        <View style={styles.option}>
          <View style={styles.optionLeft}>
            <Icon name="bell" size={22} color="#555" />
            <Text style={styles.optionText}>Notifications</Text>
          </View>
          <Switch value={true} onValueChange={() => {}} style={styles.switch} />
        </View>
      </View>

      {/* Déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Icon name="log-out" size={22} color="#fff" />
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: '#121212', // ✅ fond sombre
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ADB5', // ✅ accent cyan/bleu visible sur noir
    marginBottom: 25,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#1E1E1E', // ✅ carte légèrement plus claire que le fond
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D', // ✅ ligne subtile pour séparation
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 17,
    marginLeft: 12,
    color: '#EEEEEE', // ✅ texte clair lisible sur fond foncé
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4B5C', // ✅ rouge sur fond sombre
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 30,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SettingsScreen;
