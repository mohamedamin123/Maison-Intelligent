import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../services/AuthService';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Oui',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutUser();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              Alert.alert('Erreur', "La déconnexion a échoué.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Paramètres</Text>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.optionLeft}>
            <Icon name="user" size={22} color="#555" />
            <Text style={styles.optionText}>Mon Profil</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Pieces')}
        >
          <View style={styles.optionLeft}>
            <Icon name="grid" size={22} color="#555" />
            <Text style={styles.optionText}>Mes Piéces</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

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

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ADB5',
    marginBottom: 25,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#1E1E1E',
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
    borderBottomColor: '#2D2D2D',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 17,
    marginLeft: 12,
    color: '#EEEEEE',
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4B5C',
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
