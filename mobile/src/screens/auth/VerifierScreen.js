import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ConfirmEmail = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    const { email, code: codeFromParams } = route.params; // Récupérer l'email et le code envoyé

    const handleVerifyCode = async () => {
        if (code.length !== 6) {
            Alert.alert("Erreur", "Le code doit contenir 6 chiffres.");
            return;
        }

        if (code !== codeFromParams) {
            Alert.alert("Erreur", "Le code est incorrect.");
            return;
        }

        setLoading(true);
        try {
            // Rediriger vers le nouvel écran de mot de passe
            navigation.navigate("NewPassword", { email });
        } catch (error) {
            Alert.alert("Erreur", "Une erreur est survenue lors de la vérification.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image source={require('../../../assets/security.png')} style={styles.image} />
            <Text style={styles.header}>Vérification Email 🔐</Text>

            <Text style={styles.messageText}>
                Veuillez entrer le code envoyé à votre email.
            </Text>

            <TextInput
                style={styles.pinInput}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="Entrez le code"
                placeholderTextColor="#999"
                value={code}
                onChangeText={setCode}
            />

            <TouchableOpacity disabled={loading} style={styles.continueButton} onPress={handleVerifyCode}>
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Vérifier</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
            alignItems: 'center',

        padding:30
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        color: '#00ADB5',
        marginBottom: 20,
        textAlign: 'center',

    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 24,
    },
    messageText: {
        fontSize: 16,
        color: '#AAAAAA',
        marginBottom: 28,
        textAlign: 'center',
        fontWeight: '500',
    },
    pinInput: {
        width: '80%',
        height: 50,
        backgroundColor: '#1E1E2F',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        borderWidth: 1.5,
        borderColor: '#30336b',
        color: '#fff',
        marginBottom: 20,
    },

    continueButton: {
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
});

export default ConfirmEmail;
