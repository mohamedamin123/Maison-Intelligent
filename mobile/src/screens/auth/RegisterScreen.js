import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Ajouter l'importation de useNavigation
import { register } from '../../services/AuthService';

const RegisterScreen = () => {
    const navigation = useNavigation(); // Utilisation de useNavigation pour accéder à la navigation

    // Définition de l'état pour les champs
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [tel, setTel] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securePassword, setSecurePassword] = useState(true); // Pour masquer/afficher le mot de passe
    const [loading, setLoading] = useState(false); // État pour gérer le chargement

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

const handleDateChange = (text) => {
    // Supprime tout sauf les chiffres
    let cleaned = text.replace(/\D/g, '');

    // Formate selon DD-MM-YYYY
    if (cleaned.length > 2 && cleaned.length <= 4) {
        cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2);
    } else if (cleaned.length > 4 && cleaned.length <= 8) {
        cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2, 4) + '-' + cleaned.slice(4, 8);
    }

    setDateNaissance(cleaned);
};


const formatDateToServer = (input) => {
    const parts = input.split('-');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    }
    return ''; // retourne une chaîne vide si le format est incorrect
};


const check = async () => {
    if (!prenom) {
        Alert.alert('Erreur', 'Le prénom est requis.');
        return;
    }
    if (!nom) {
        Alert.alert('Erreur', 'Le nom est requis.');
        return;
    }
    if (!email) {
        Alert.alert('Erreur', 'L\'email est requis.');
        return;
    }
    if (!tel) {
        Alert.alert('Erreur', 'Le numéro de téléphone est requis.');
        return;
    }
    if (!dateNaissance) {
        Alert.alert('Erreur', 'La date de naissance est requise.');
        return;
    }
    if (!password) {
        Alert.alert('Erreur', 'Le mot de passe est requis.');
        return;
    }

    if (password.length < 8) {
        Alert.alert('Erreur', 'Le mot de passe doit comporter au moins 8 caractères.');
        return;
    }

    if (!validateEmail(email)) {
        Alert.alert('Erreur', 'L\'email est invalide.');
        return;
    }
const validateDate = (date) => {
    // Vérifie le format DD-MM-YYYY
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(date)) return false;

    const [day, month, year] = date.split('-').map(Number);

    // Crée un objet Date (attention : mois commence à 0 en JavaScript)
    const dateObj = new Date(year, month - 1, day);

    // Vérifie que la date est bien celle attendue
    return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getDate() === day
    );
};
const validatePhone = (phone) => /^\d{8}$/.test(phone);

if (!validateDate(dateNaissance)) {
    Alert.alert('Erreur', 'Format de date invalide. Utilisez DD-MM-YYYY.');
    return;
}

    if (!validatePhone(tel)) {
        Alert.alert('Erreur', 'Numéro de téléphone invalide (8 chiffres requis).');
        return;
    }

    // Si toutes les validations passent
    const formattedDate = formatDateToServer(dateNaissance);
    setLoading(true);
    console.log("register")

    const userData = {
        nom,
        prenom,
        email,
        tel,
        dateNaissance: formattedDate,
        password,
    };

   try {
    await register(userData);
    setLoading(false); // Ajoute cette ligne
    Alert.alert('Succès', 'Compte créé avec succès!');
    navigation.navigate('Login');
}
catch (error) {
        setLoading(false);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la création du compte.');
    }
};

    // Fonction pour basculer la visibilité du mot de passe
    const togglePasswordVisibility = () => {
        setSecurePassword(!securePassword);
    };



    return (
        
        <View style={styles.container}>
            <StatusBar backgroundColor="#1A1A2E" barStyle="dark-content" />

            <Text style={styles.title}>Créer un compte</Text>

            <Image
                source={require('../../../assets/add-user.png')}
                style={styles.image}
            />
            <Text style={styles.subtitle}>Inscris-toi pour commencer à contrôler et surveiller votre maison</Text>
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, { marginRight: 10 }]}
                        placeholder="Prénom"
                        value={prenom}
                        onChangeText={setPrenom}
                        keyboardType="default"
                          placeholderTextColor="#FFFFFF"  // <-- ajoute ça
                    />
                    <View style={styles.space} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        value={nom}
                        onChangeText={setNom}
                        keyboardType="default"
                          placeholderTextColor="#FFFFFF"  // <-- ajoute ça
                    />
                </View>

                    <TextInput
                        style={[styles.input2]}
                        placeholder="Téléphone"
                        value={tel}
                        onChangeText={setTel}
                        keyboardType="phone-pad"
                        placeholderTextColor="#FFFFFF"
                    />
                    <View style={styles.space} />

                    <TextInput
                        style={styles.input2}
                        placeholder="Date de naissance (JJ-MM-AAAA)"
                        value={dateNaissance}
                        onChangeText={handleDateChange}
                        keyboardType="number-pad"
                        maxLength={10}
                        placeholderTextColor="#FFFFFF"
                    />

                
                <TextInput
                    style={styles.input2}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                      placeholderTextColor="#FFFFFF"  // <-- ajoute ça
                    autoCapitalize="none"
                />


                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Mot de passe"
                        secureTextEntry={securePassword}
                          placeholderTextColor="#FFFFFF"  // <-- ajoute ça
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon name={securePassword ? 'eye-slash' : 'eye'} size={25} color="gray" />
                    </TouchableOpacity>
                </View>



                {/* Affichage du bouton ou de l'indicateur de chargement */}
                <TouchableOpacity style={styles.button} onPress={check} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Continuer</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textLink}>Déjà un compte ? Se connecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 30,
        alignItems: 'center',
    },

    image: {
        width: 120,
        height: 120,
        marginBottom: 24,
    },
title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#00ADB5',
    marginBottom: 10,
    textAlign: 'center',
},

    subtitle: {
        fontSize: 16,
        color: '#AAAAAA',
        marginBottom: 28,
        textAlign: 'center',
        fontWeight: '500',
    },
    formContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        height: 50,
        flex: 1,
        backgroundColor: '#1E1E2F',
        padding: 10,
        borderRadius: 5,
        color: 'white',
        borderWidth: 1,
        borderColor: '#30336b',
        textTransform: 'capitalize', // Permet d'afficher la première lettre en majuscule
    },
    input2: {
        borderColor: '#FFB6C1',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 8,
        height: 50,
        width: '100%',
        backgroundColor: '#1E1E2F',
        color: 'white',
        borderColor: '#30336b',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#30336b',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
        width: '100%',
        backgroundColor: '#1E1E2F',
        color: 'white',
    },
    passwordInput: {
        flex: 1,
        height: '100%',
                color: 'white',

    },
    eyeIcon: {
        padding: 10,
    },
       errorText: {
        color: '#ff6b6b',
        fontSize: 14,
        marginBottom: 12,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#00ADB5',
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 12,
        marginTop: 10,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },
    textLink: {
        fontSize: 15,
        color: '#00ADB5',
        marginTop: 16,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    textLink: {
        fontSize: 18,
        textAlign: 'center',
        color: '#00ADB5',
        marginTop: 10,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
