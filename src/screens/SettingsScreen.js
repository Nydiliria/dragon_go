import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {SettingsContext} from '../context/SettingsContext';

export default function SettingsScreen() {
    const {layoutMode, changeLayoutMode} = useContext(SettingsContext);

    return (
        <View style={[styles.container, layoutMode === 'dark' && styles.darkMode]}>
            <Text style={[styles.text, layoutMode === 'dark' && styles.darkText]}>
                Huidige modus: {layoutMode}
            </Text>
            <Button title="Standaard Layout" onPress={() => changeLayoutMode('default')}/>
            <Button title="Donkere Layout (Dark Mode)" onPress={() => changeLayoutMode('dark')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'},
    darkMode: {backgroundColor: '#1e293b'},
    text: {fontSize: 18, marginBottom: 20, color: '#000'},
    darkText: {color: '#fff'}
});