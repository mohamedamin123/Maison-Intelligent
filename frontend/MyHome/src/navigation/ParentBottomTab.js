import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather'; // Utiliser Feather pour correspondre au style de login
import HomeParentScreen from '../screens/parent/HomeParentScreen';
import PiecesScreen from '../screens/parent/PiecesScreen';
import ProfileParentScreen from '../screens/parent/ProfileParentScreen';
import SettingScreen from '../screens/parent/SettingScreen';
import UsersScreen from '../screens/parent/UsersScreen';

const Tab = createBottomTabNavigator();

export default function ParentBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A2E',
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#00ADB5',
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Pieces':
              iconName = 'grid';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            case 'Users':
              iconName = 'users';
              break;
            default:
              iconName = 'circle';
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeParentScreen} />
      {/* <Tab.Screen name="Pieces" component={PiecesScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileParentScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}
