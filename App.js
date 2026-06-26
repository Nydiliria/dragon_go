import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
    const [location, setLocation] = useState(null);
    const [path, setPath] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        let runner;

        async function startTracking() {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Toegang tot locatie geweigerd');
                return;
            }

            runner = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 0.5,
                    timeInterval: 5000,
                },
                (newLocation) => {
                    const {latitude, longitude} = newLocation.coords;

                    const newCoords = {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121,
                    };


                    setLocation(newCoords);
                    setPath((prevPath) => [...prevPath, {latitude, longitude}]);
                }
            );
        }

        startTracking();

        return () => {
            if (runner) {
                runner.remove();
            }
        };
    }, []);

    if (!location) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={location}
                showsUserLocation={true}
            >
                {path.map((point, index) => (
                    <Marker
                        key={`path-${index}`}
                        coordinate={point}
                        opacity={0.6}
                    />
                ))}
                <Marker
                    coordinate={location}
                    title="Je bent hier"
                    pinColor="red"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});