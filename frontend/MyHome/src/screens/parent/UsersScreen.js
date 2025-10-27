import React, { useEffect, useState } from 'react'; 
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  ActivityIndicator, Alert, Modal 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserById, updateUserRole } from '../../services/UserService';
import { getAllHomeMembers } from '../../services/HomeMemberService';
import useAuthStore from '../../store/useAuthStore';

const UsersScreen = ({ navigation }) => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  const formatRole = (role) => {
    switch (role) {
      case 'ENFANT': return '👧 Enfant';
      case 'PARENT_FEMME': return '🤱 Femme';
      case 'PARENT_ADULTE': return '👨 Adulte';
      case 'PARENT': return '👩‍👩‍👧 Parent';
      default: return role ? role.replace('_', ' ') : 'Rôle non défini';
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.idUser || !user?.idHome) return;
      setLoading(true);
      try {
        const homeMembers = await getAllHomeMembers();
        const membersInSameHome = homeMembers.filter(m => m.homeId === user.idHome);

        const detailedUsers = await Promise.all(
          membersInSameHome.map(async (member) => {
            try {
              const response = await getUserById(member.userId);
              return { ...response.data, homeId: member.homeId };
            } catch {
              return null;
            }
          })
        );

        setUsers(detailedUsers.filter(Boolean));
      } catch (err) {
        console.error(err);
        Alert.alert('Erreur', 'Impossible de récupérer les membres.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const handleUserPress = (member) => {
    setSelectedUser(member);
    setNewRole(member.role);
    setModalVisible(true);
  };

  const handleChangeRole = async () => {
    if (!selectedUser) return;
    try {
      await updateUserRole(selectedUser.idUser, newRole);
      setUsers(prev => prev.map(u => u.idUser === selectedUser.idUser ? { ...u, role: newRole } : u));
      setModalVisible(false);
      Alert.alert('Succès', `Le rôle de ${selectedUser.prenom} a été mis à jour !`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', "Impossible de changer le rôle.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>👨‍👩‍👧‍👦 Membres de la Maison</Text>

        {loading ? (
          <ActivityIndicator color="#CB68DD" size="large" style={{ marginTop: 20 }} />
        ) : (
          users.map((member, index) => (
            <TouchableOpacity
              key={member.idUser || index}
              style={styles.card}
              onPress={() => handleUserPress(member)}
            >
              <Icon
                name={member.role === 'ENFANT' ? 'child-care' : 'person'}
                size={22}
                color={member.role === 'ENFANT' ? '#FFB6C1' : '#CB68DD'}
              />
              <View>
                <Text style={styles.cardValue}>
                  {`${member.prenom} ${member.nom}`}
                </Text>
                <Text style={{ color: '#aaa' }}>{formatRole(member.role)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (user?.idHome) {
            navigation.navigate('AddUser', { homeId: user.idHome });
          } else {
            Alert.alert("Erreur", "Aucune maison associée trouvée !");
          }
        }}
      >
        <Icon name="person-add" size={22} color="#fff" />
        <Text style={styles.addText}>Ajouter un membre</Text>
      </TouchableOpacity>

      <Modal transparent animationType="slide" visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedUser ? `${selectedUser.prenom} ${selectedUser.nom}` : ''}
            </Text>
            <Text style={{ marginBottom: 20 ,color:'#aaa'}}>
              Rôle actuel : {formatRole(selectedUser?.role)}
            </Text>

            <Picker
              selectedValue={newRole}
              onValueChange={setNewRole}
              style={{ color: '#fff', backgroundColor: '#222', marginBottom: 20 }}
            >
              <Picker.Item label="👧 Enfant" value="ENFANT" />
              <Picker.Item label="🤱 Femme" value="PARENT" />
              <Picker.Item label="👨 Adulte" value="ADULTE" />
              <Picker.Item label="👩‍👩‍👧 Parent" value="PARENT" />
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handleChangeRole}>
              <Text style={styles.buttonText}>Changer le rôle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#555', marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles identiques
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: '800', color: '#CB68DD', marginBottom: 20, textAlign: 'center', marginTop: 30 },
  card: { backgroundColor: '#1E1E2F', borderRadius: 14, padding: 16, marginVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardValue: { fontSize: 18, fontWeight: '700', color: '#fff' },
  addButton: { backgroundColor: '#CB68DD', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 40, margin: 20, gap: 10, position: 'absolute', bottom: 0, left: 20, right: 20 },
  addText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '85%', backgroundColor: '#1E1E2F', padding: 20, borderRadius: 20 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#fff', marginBottom: 10 },
  button: { backgroundColor: '#CB68DD', paddingVertical: 12, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default UsersScreen;
