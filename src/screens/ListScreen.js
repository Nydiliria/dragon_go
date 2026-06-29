import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

export default function ListScreen({navigation}) {
    // Dit komt straks uit je online JSON bron
    const dummyHotspots = [
        {id: 1, title: "Hotspot A", latitude: 52.3702, longitude: 4.8952, description: "Mooie locatie"}
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyHotspots}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    // Klikken navigeert naar het Map scherm én stuurt de hotspot mee
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Kaart', {focusHotspot: item})}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16},
    card: {padding: 16, backgroundColor: '#fff', marginBottom: 12, borderRadius: 8, elevation: 2},
    title: {fontSize: 18, fontWeight: 'bold'}
});