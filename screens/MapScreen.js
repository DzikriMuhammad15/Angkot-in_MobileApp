import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export default function MapScreen({ navigation }) {

    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [loading, setLoading] = useState(true);

    const setMapRegionLocation = async () => {
        const storedRegion = await AsyncStorage.getItem('mapRegion');
        if (storedRegion) {
            const parsedRegion = JSON.parse(storedRegion);
            console.log("parsed region : ", parsedRegion);
            setMapRegion(parsedRegion);
        } else {
            console.log('No mapRegion stored');
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchMapRegion = async () => {
            await setMapRegionLocation();
        };
        fetchMapRegion();
    }, []);

    useEffect(() => {
        console.log('mapRegion has been set:', mapRegion);
    }, [mapRegion]);

    if (loading) {
        return (
            <ScrollView style={styles.screenContainer}>
            </ScrollView>
        );
    } else {
        return (
            <ScrollView style={styles.screenContainer}>
                <View style={styles.map}>
                    <MapView style={styles.mapView} region={mapRegion}>
                        <Marker coordinate={mapRegion} title='Marker' />
                    </MapView>
                </View>
                <View style={styles.putihContainer}>
                    <TouchableOpacity style={styles.buttonEnter} onPress={() => navigation.replace('pickUpScreen')}>
                        <Text style={styles.enter}>Enter pickup point</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        height: screenHeight,
    },
    map: {
        height: 0.78 * screenHeight,
        backgroundColor: 'black',
    },
    putihContainer: {
        height: 0.22 * screenHeight,
        paddingTop: '10%',
        paddingHorizontal: '8%',
    },
    buttonEnter: {
        borderColor: 'black',
        borderWidth: 1,
        height: 0.08 * screenHeight,
        justifyContent: 'center',
        borderRadius: 10,
    },
    enter: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
    },
    mapView: {
        width: '100%',
        height: '100%',
    },
});
