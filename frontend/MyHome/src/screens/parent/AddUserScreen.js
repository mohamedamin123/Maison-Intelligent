// screens/AddUserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { register } from '../../services/AuthService';
import useAuthStore from '../../store/useAuthStore';
import { useRoute } from '@react-navigation/native';
import { createHomeMember } from '../../services/HomeMemberService';


const AddUserScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ENFANT');
  const [loading, setLoading] = useState(false);

  const route = useRoute();

  const { homeId } = route.params; // ✅ récupéré ici

const handleAddUser = async () => {
  if (!prenom || !nom || !tel || !email || !password) {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    return;
  }

  try {
    setLoading(true);

    // 1️⃣ Déterminer le rôle final
    let finalRole =
      role === 'PARENT_FEMME' || role === 'PARENT_ADULTE' ? 'PARENT' : role;

    // 2️⃣ Préparer l'objet utilisateur
    const newUser = {
      nom,
      prenom,
      tel,
      dateNaissance: '01/01/2015',
      email,
      password,
      role: finalRole,
    };

    // 3️⃣ Appeler le backend pour créer l'utilisateur
    const res = await register(newUser);

    // 4️⃣ Récupérer idUser correctement
    const idUser = res?.idUser;
    if (!idUser) {
      throw new Error('Impossible de récupérer l’ID de l’utilisateur créé');
    }
    console.log('home est :', homeId);

    await createHomeMember({ userId: idUser, homeId });
    

    // 6️⃣ Succès
    Alert.alert('Succès', `${prenom} a été ajouté avec succès !`);
    navigation.navigate('Home');

  } catch (error) {
    console.error('Erreur ajout utilisateur:', error);

    let message = 'Impossible d’ajouter l’utilisateur.';

    if (error.response?.data) {
      const errors = error.response.data;
      const firstKey = Object.keys(errors)[0];
      if (firstKey) message = errors[firstKey];
    } else if (error.message) {
      message = error.message;
    }

    Alert.alert('Erreur', message);

  } finally {
    setLoading(false);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>➕ Ajouter un membre</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          placeholderTextColor="#aaa"
          value={prenom}
          onChangeText={setPrenom}
        />

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#aaa"
          value={nom}
          onChangeText={setNom}
        />

        <Text style={styles.label}>Téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: +33 6 12 34 56 78"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={tel}
          onChangeText={setTel}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="exemple@mail.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Rôle</Text>
        <View style={styles.roleContainer}>
          {['ENFANT', 'PARENT_FEMME', 'PARENT_ADULTE'].map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roleButton, role === r && styles.roleActive]}
              onPress={() => setRole(r)}
            >
              <Text style={styles.roleText}>
                {r === 'ENFANT' ? '👧 Enfant' : r === 'PARENT_FEMME' ? '🤱 Femme' : '👨 Adulte'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddUser} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Ajouter</Text>}
        </TouchableOpacity>

        {/* ✅ Bouton Retour */}
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#121212', padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#CB68DD',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  form: { backgroundColor: '#1E1E2F', borderRadius: 20, padding: 20 },
  label: { color: '#ccc', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: '#222',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  roleButton: {
    backgroundColor: '#1B1B1B',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  roleActive: { backgroundColor: '#CB68DD' },
  roleText: { color: '#fff', fontWeight: '600' },
  button: {
    backgroundColor: '#CB68DD',
    marginTop: 25,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 40,
  },
  backButton: {
    backgroundColor: '#555', // couleur différente pour le retour
    marginTop: 12,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});

export default AddUserScreen;
