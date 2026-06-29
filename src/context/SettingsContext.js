import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Maak de Context aan
export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
    // Standaard layout-modus is 'default' (Eis 4)
    const [layoutMode, setLayoutMode] = useState('default');

    // Laad de opgeslagen layout-modus zodra de app opstart
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedLayout = await AsyncStorage.getItem('@layout_mode');
                if (savedLayout !== null) {
                    setLayoutMode(savedLayout);
                }
            } catch (error) {
                console.log('Fout bij het laden van instellingen:', error);
            }
        };
        loadSettings();
    }, []);

    // Sla de nieuwe layout-modus op en pas hem direct toe
    const changeLayoutMode = async (mode) => {
        try {
            setLayoutMode(mode);
            await AsyncStorage.setItem('@layout_mode', mode);
        } catch (error) {
            console.log('Fout bij het opslaan van instellingen:', error);
        }
    };

    return (
        <SettingsContext.Provider value={{layoutMode, changeLayoutMode}}>
            {children}
        </SettingsContext.Provider>
    );
};