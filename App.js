import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Importeer je eigen Context & Schermen
import {SettingsProvider} from './src/context/SettingsContext';
import MapScreen from './src/screens/MapScreen';
import ListScreen from './src/screens/ListScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Maak de Tab Navigator aan
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        // De Provider zorgt ervoor dat de layout-modus op ELK scherm werkt
        <SettingsProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#3b82f6',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        tabBarActiveTintColor: '#3b82f6',
                        tabBarInactiveTintColor: 'gray',
                    }}
                >
                    {/* Scherm 1: De Lijst met hotspots */}
                    <Tab.Screen
                        name="Lijst"
                        component={ListScreen}
                        options={{title: 'Hotspots'}}
                    />

                    {/* Scherm 2: De Leaflet Kaart */}
                    <Tab.Screen
                        name="Kaart"
                        component={MapScreen}
                        options={{title: 'Interactieve Kaart'}}
                    />

                    {/* Scherm 3: Instellingen voor de lay-out */}
                    <Tab.Screen
                        name="Instellingen"
                        component={SettingsScreen}
                        options={{title: 'Instellingen'}}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SettingsProvider>
    );
}