import React, { useEffect,useRef } from "react";
import { View, Text ,AppState} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { checkAuthStatus } from "../services/AuthService";
import useAuthStore from "../store/useAuthStore";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { isAuthenticated, user, login, logout } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await checkAuthStatus();
            if (authStatus) {
                login(authStatus);
            } else {
                logout();
            }
        };

        checkAuth();
    }, []);



    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {isAuthenticated ? (
                <Stack.Screen
                    name="Main"
                    component={MainNavigator}
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen
                    name="AuthNavigator"
                    component={AuthNavigator}
                    options={{ headerShown: false }}
                />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
