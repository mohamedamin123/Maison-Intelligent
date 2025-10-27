import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 
import { updatePassword } from '../../services/AuthService';

const NewPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;

    const validatePassword = (password) => password.length >= 8;

    const handleUpdatePassword = async () => {
        if (!validatePassword(newPassword)) {
            setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        setErrorMessage("");
        setLoading(true);

        try {
            await updatePassword({ email, newPassword: newPassword });
            Alert.alert("Succès", "Mot de passe mis à jour avec succès !");
            navigation.navigate("Login");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Erreur lors de la mise à jour du mot de passe.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#121212" }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Image source={require('../../../assets/security.png')} style={styles.image} />
                <Text style={styles.header}>Nouveau mot de passe</Text>
                <Text style={styles.label}>Entrez un mot de passe sécurisé</Text>

                {/* Nouveau mot de passe */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Nouveau mot de passe"
                        placeholderTextColor="gray"
                        secureTextEntry={!showNewPassword}
                    />
                    <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                        <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                {/* Confirmation */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirmez le mot de passe"
                        placeholderTextColor="gray"
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleUpdatePassword} disabled={loading}>
                    {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Valider</Text>}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        color: '#00ADB5',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#AAAAAA',
        marginBottom: 28,
        textAlign: 'center',
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#1E1E2F',
        borderRadius: 8,
        paddingHorizontal: 10,
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: '#30336b',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
    },
    button: {
        backgroundColor: '#00ADB5',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
    },
    image: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 20 },
});

export default NewPasswordScreen;
