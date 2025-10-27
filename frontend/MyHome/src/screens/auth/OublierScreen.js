import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { forgot } from '../../services/AuthService';

const OublierScreen = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = async () => {
        setLoading(true);
        if (!email.trim()) {
            setErrorMessage("Veuillez entrer votre email.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Veuillez entrer un email valide.");
            return;
        }

       setErrorMessage("");
        setLoading(true);

        try {
          const data=  await forgot(email);
          console.log(data);
            setLoading(false);
            Alert.alert("Succès", "Un code de vérification a été envoyé !");

            // Rediriger vers l'écran de vérification avec l'email en paramètre
            navigation.navigate("Verify", { email, code: data.code });
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.response?.data?.message || "Aucun utilisateur trouvé avec cet email");
        } finally {
            setLoading(false);  // ✅ Assure que `loading` passe à `false` même en cas d'erreur
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="#1A1A2E" barStyle="dark-content" />
            <View style={styles.innerContainer}>
                <Image source={require('../../../assets/security.png')} style={styles.image} />

                <Text style={styles.title}>Réinitialisation 🔐</Text>
                <Text style={styles.subtitle}>Rentre ton email pour réinitialiser ton mot de passe</Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleResetPassword}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Continuer</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.textLink}>Retour à la connexion</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
    },
    innerContainer: {
        padding: 24,
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
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#AAAAAA',
        marginBottom: 28,
        textAlign: 'center',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#1E1E2F',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#fff',
        marginBottom: 16,
        borderColor: '#30336b',
        borderWidth: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#1E1E2F',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
        borderColor: '#30336b',
        borderWidth: 1,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
    },
    eyeIcon: {
        paddingHorizontal: 8,
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
});
export default OublierScreen;
