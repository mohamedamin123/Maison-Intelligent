import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';

import useAuthStore from '../store/useAuthStore'; // Ajouté pour récupérer parentId
import { NativeEventEmitter, NativeModules, Platform, PermissionsAndroid } from 'react-native';
import ConsulterHomeScreen from '../screens/maison/ConsulterHomeScreen';
import DashboardScreen from '../screens/maison/DashboardScreen';
import ConsulterGarageScreen from '../screens/maison/garage/ConsulterGarageScreen';
import HistoriqueGarageScreen from '../screens/maison/garage/HistoriqueGarageScreen';
import ListeGarageScreen from '../screens/maison/garage/ListeGarageScreen';
import AjouterGarageScreen from '../screens/maison/garage/AjouterGarageScreen';
import CameraGarageScreen from '../screens/maison/garage/CameraGarageScreen';

import GererVehiculeScreen from '../screens/maison/vehicule/GererVehiculeScreen';
import AjouterVehiculeScreen from '../screens/maison/vehicule/AjouterVehiculeScreen';
import ListeVehiculeScreen from '../screens/maison/vehicule/ListeVehiculeScreen';
import ConsulterVehiculeScreen from '../screens/maison/vehicule/ConsulterVehiculeScreen';

//react-native-push-notification. biblio pour envoyer les notifications


const Stack = createNativeStackNavigator();

const MainNavigator = () => {


    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ConsulterHome" component={ConsulterHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
                  {/* Garage*/}
            <Stack.Screen name="ConsulterGarage" component={ConsulterGarageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HistoriqueGarage" component={HistoriqueGarageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ListeGarage" component={ListeGarageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AjouterGarage" component={AjouterGarageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CameraGarage" component={CameraGarageScreen} options={{ headerShown: false }} />
                  {/* Vehicule*/}
            <Stack.Screen name="GererVehicule" component={GererVehiculeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AjouterVehicule" component={AjouterVehiculeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ListeVehicule" component={ListeVehiculeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ConsulterVehicule" component={ConsulterVehiculeScreen} options={{ headerShown: false }} />


        </Stack.Navigator>
    );
};

export default MainNavigator;
