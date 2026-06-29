import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';
import LeafletMap from '../components/LeafletMap';

export default function MapScreen({route}) {
    const [userLocation, setUserLocation] = useState(null);

    // Dit vul je straks met data uit je API service
    const [hotspots] = useState([
        {id: 1, title: "Hotspot A", latitude: 52.3702, longitude: 4.8952, description: "Mooie locatie"}
    ]);

    // Kijken of we zijn doorgestuurd vanuit de lijst met een specifieke hotspot
    const selectedHotspot = route.params?.focusHotspot || null;

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            // Volg de huidige locatie van de gebruiker
            await Location.watchPositionAsync(
                {accuracy: Location.Accuracy.High, distanceInterval: 1},
                (newLocation) => {
                    setUserLocation({
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude,
                    });
                }
            );
        })();
    }, []);

    if (!userLocation) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#3b82f6"/></View>;
    }

    return (
        <View style={styles.container}>
            <LeafletMap
                userLocation={userLocation}
                hotspots={hotspots}
                selectedHotspot={selectedHotspot}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
    center: {flex: 1, justifyContent: 'center', alignItems: 'center'}
});