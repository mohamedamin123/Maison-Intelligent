import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Image,
  ScrollView, ActivityIndicator, Alert, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getUserById, updateProfile  } from './../../services/UserService';
import useAuthStore from '../../store/useAuthStore';

const ProfileParentScreen = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [dateNaissance, setDateNaissance] = useState('');
  const [age, setAge] = useState(null);

  // 🧮 Fonction de calcul de l'âge
  const calculerAge = (dateString) => {
    if (!dateString) return null;
    const birthDate = new Date(dateString);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  // 🔹 Chargement des infos utilisateur
  useEffect(() => {
    if (user && user.idUser) {
      const fetchUserData = async () => {
        try {
          console.log("user id:", user.idUser);
          const response = await getUserById(user.idUser);
          const data = response.data;

          if (!data) {
            console.log(data);
            throw new Error("Aucune donnée utilisateur trouvée");
          }

          const { prenom, nom, dateNaissance,tel } = data;
          setPrenom(prenom || '');
          setTel(tel || '');

          setNom(nom || '');
          setEmail(user.email || '');
          setDateNaissance(dateNaissance || '');
          setAge(calculerAge(dateNaissance));
          setFullName(`${prenom || ''} ${nom || ''}`.trim());
        } catch (error) {
          console.error("Erreur récupération profil:", error);
          Alert.alert('Erreur', "Impossible de récupérer les données du profil.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);


  const formatDateForBackend = (dateString) => {
  const [year, month, day] = dateString.split('-'); // "2001-06-13"
  return `${day}/${month}/${year}`; // "13/06/2001"
};

  // 🔹 Mise à jour du profil
  const handleUpdate = async () => {
    try {
      const updatedData = { prenom, nom,   dateNaissance: formatDateForBackend(dateNaissance), }; // inclure les champs nécessaires
      const response = await updateProfile(updatedData);
      const data = response.data;

      setFullName(`${data.prenom} ${data.nom}`);
      Alert.alert("Succès", "Profil mis à jour !");
    } catch (error) {
      if (error.response) {
        console.error("Erreur update:", error.response.data);
        Alert.alert('Erreur', `La mise à jour a échoué: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Erreur update:", error);
        Alert.alert('Erreur', 'La mise à jour du profil a échoué.');
      }
    }
  };


  // 🔹 Gestion affichage
  if (!user) {
    return <Text style={styles.errorText}>Utilisateur non authentifié</Text>;
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#CB68DD" />
      </View>
    );
  }

  // 🔹 Interface
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('./../../../assets/family.png')} style={styles.avatar} />
        <Text style={styles.username}>{fullName || "Mon Profil"}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>👨‍👩‍👧‍👦 Mon Profil</Text>

        <View style={styles.row}>
          <View style={styles.inputGroupSmall}>
            <Text style={styles.inputLabel}>Prénom</Text>
            <TextInput
              style={styles.input}
              value={prenom}
              onChangeText={setPrenom}
              placeholder="Prénom"
              placeholderTextColor="#777"
            />
          </View>

          <View style={styles.inputGroupSmall}>
            <Text style={styles.inputLabel}>Nom</Text>
            <TextInput
              style={styles.input}
              value={nom}
              onChangeText={setNom}
              placeholder="Nom"
              placeholderTextColor="#777"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Âge</Text>
          <TextInput
            style={styles.inputDisabled}
            value={age !== null ? age.toString() : ''}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Télephone</Text>
          <TextInput
            style={styles.inputDisabled}
            value={tel}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.inputDisabled}
            value={email}
            editable={false}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Icon name="save" size={24} color="#fff" />
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#CB68DD',
    backgroundColor: "#1E1E1E",
    shadowColor: '#CB68DD',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: '800',
    color: '#CB68DD',
    marginTop: 15,
    textShadowColor: 'rgba(203,104,221,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  form: {
    backgroundColor: '#1B1B1B',
    width: '100%',
    padding: 20,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF69B4',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputGroupSmall: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 15,
    color: '#aaa',
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#222',
    shadowColor: '#CB68DD',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 10,
  },
  inputDisabled: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#888',
    backgroundColor: '#1E1E1E',
  },
  button: {
    backgroundColor: '#CB68DD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 40,
    gap: 10,
    marginTop: 25,
    shadowColor: '#CB68DD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
    marginTop: 50,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileParentScreen;
