import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/home/HomeScreen';
import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/home/SettingsScreen';
import ProfileScreen from '../screens/home/ProfileScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E1E1E', // ✅ Fond sombre de la tabBar
          borderTopColor: '#2D2D2D',  // ✅ Ligne de séparation discrète
        },
        tabBarActiveTintColor: '#00ADB5', // ✅ Couleur d’accent pour l’onglet actif
        tabBarInactiveTintColor: '#999999', // ✅ Gris clair pour les onglets inactifs
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" size={size} color={color} />
          ),
        }}
      />
        <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <TabBarIcon name="person" size={size} color={color} />
                    ),
                }}
     />

      <Tab.Screen
        name="Paramètres"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
