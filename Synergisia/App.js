import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import WidgetsScreen from './src/screens/WidgetsScreen';
import TrombinoscopeScreen from './src/screens/TrombinoscopeScreen';
import NewsScreen from './src/screens/NewsScreen';
import ClockScreen from './src/screens/ClockScreen';
import AgendaScreen from './src/screens/AgendaScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import JobCaptureScreen from './src/screens/JobCaptureScreen';
import ProfilsScreen from './src/screens/ProfilsScreen';
import ProfilScreen from './src/screens/ProfilScreen';
import MessagesScreen from './src/screens/MessagesScreen';

import { Ionicons } from '@expo/vector-icons'; // Importer les icônes

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Accueil"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline';
            color = focused ? '#4762AE' : '#909090';
          } else if (route.name === 'Widgets') {
            iconName = focused ? 'apps' : 'apps-outline';
            color = focused ? '#4762AE' : '#909090';
          } else if (route.name === 'Trombinoscope') {
            iconName = focused ? 'people' : 'people-outline';
            color = focused ? '#4762AE' : '#909090';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            color = focused ? '#4762AE' : '#909090';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Trombinoscope" component={TrombinoscopeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Widgets" component={WidgetsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="JobCapture" component={JobCaptureScreen} options={{ headerShown: false }} />
        <Stack.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Clock" component={ClockScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Agenda" component={AgendaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Weather" component={WeatherScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profils" component={ProfilsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profil" component={ProfilScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
