import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import ParentBottomTab from './ParentBottomTab';
import OublierScreen from '../screens/auth/OublierScreen';
import VerifyScreen from '../screens/auth/VerifierScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import AddUserScreen from '../screens/parent/AddUserScreen';
import ConsulterHomeScreen from '../screens/pieces/ConsulterHomeScreen';
import ListeGarageScreen from '../screens/pieces/garage/ListeGarageScreen';
import AjouterGarageScreen from '../screens/pieces/garage/AjouterGarageScreen';
import ConsulterGarageScreen from '../screens/pieces/garage/ConsulterGarageScreen';
import HistoriqueGarageScreen from '../screens/pieces/garage/HistoriqueGarageScreen';
import CameraGarageExterneScreen from '../screens/pieces/garage/CameraGarageExterneScreen';
import CameraGarageInterneScreen from '../screens/pieces/garage/CameraGarageInterneScreen';
import DonneesGarageScreen from '../screens/pieces/garage/DonneesGarageScreen';
import ListeChambreScreen from '../screens/pieces/chambre/ListeChambreScreen';
import AjouterChambreScreen from '../screens/pieces/chambre/AjouterChambreScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Oublier" component={OublierScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

      <Stack.Screen name="Home" component={ParentBottomTab} />
      <Stack.Screen name="AddUser" component={AddUserScreen} />
      <Stack.Screen name="ConsulterHome" component={ConsulterHomeScreen} />

      {/* Garages Screens */}
      <Stack.Screen name="ListeGarage" component={ListeGarageScreen} />
      <Stack.Screen name="AjouterGarage" component={AjouterGarageScreen} />
      <Stack.Screen name="ConsulterGarage" component={ConsulterGarageScreen} />
      <Stack.Screen name="HistoriqueGarage" component={HistoriqueGarageScreen} />
      <Stack.Screen name="CameraGarageExterne" component={CameraGarageExterneScreen} />
      <Stack.Screen name="CameraGarageInterne" component={CameraGarageInterneScreen} />
      <Stack.Screen name="DonneesGarage" component={DonneesGarageScreen} />

      {/* Chambres Screens */}
      <Stack.Screen name="ListeChambre" component={ListeChambreScreen} />
      <Stack.Screen name="AjouterChambre" component={AjouterChambreScreen} />


    </Stack.Navigator>
  );
}
