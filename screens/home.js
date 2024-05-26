import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

export default function Home({ navigation }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: -6.8857,
    longitude: 107.6103,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      console.log(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      console.log(location.coords.latitude, location.coords.longitude);
      console.log(location);
      await AsyncStorage.setItem(
        "mapRegion",
        JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      );
    } catch (err) {
      console.log(err.message);
    } finally {
      navigation.replace("mapScreen");
    }
  };
  const goToPickUpScreen = async () => {
    await AsyncStorage.setItem("mapRegion", JSON.stringify(mapRegion));
    navigation.replace("pickUpScreen");
  };

  return (
    <View style={styles.container}>
      <CustomDrawer
        navigation={navigation}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <ScrollView style={styles.screenContainer}>
        <View style={styles.kuningContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleDrawer}>
              <FontAwesome name="bars" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.toFind}>
            To find your pickup location automatically, turn on location
            services
          </Text>
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={userLocation}
          >
            <Text style={styles.turnOnLocation}>Turn on location</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.putihContainer}>
          <TouchableOpacity
            style={styles.buttonEnter}
            onPress={goToPickUpScreen}
          >
            <Text style={styles.enter}>Enter pickup point</Text>
          </TouchableOpacity>
          <View style={styles.mapContainer}>
            <Text style={styles.aroundYou}>Around you</Text>
            <View style={styles.mapViewContainer}>
              <MapView style={styles.mapView} region={mapRegion} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    backgroundColor: "#FBCC4B",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 3,
  },
  screenContainer: {
    flex: 1,
  },
  kuningContainer: {
    backgroundColor: "#FBCC4B",
    paddingTop: "8%",
    paddingHorizontal: "8%",
    paddingBottom: "0%",
    height: 0.4 * screenHeight,
  },
  toFind: {
    paddingTop: "2%",
    color: "white",
    fontSize: 28,
    fontWeight: "600",
    paddingRight: "10%",
  },
  touchableButton: {
    backgroundColor: "white",
    marginTop: "5%",
    width: "40%",
    height: "15%",
    borderRadius: 20,
    justifyContent: "center",
  },
  turnOnLocation: {
    textAlign: "center",
  },
  putihContainer: {
    height: 0.8 * screenHeight,
    paddingTop: "5%",
    paddingHorizontal: "8%",
  },
  buttonEnter: {
    borderColor: "black",
    borderWidth: 1,
    height: 0.07 * screenHeight,
    justifyContent: "center",
    borderRadius: 10,
  },
  enter: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  aroundYou: {
    paddingTop: "6%",
    fontSize: 18,
    fontWeight: "500",
  },
  mapContainer: {
    height: "100%",
    width: "100%",
  },
  mapView: {
    height: "100%",
    width: "100%",
  },
  mapViewContainer: {
    height: 10 * screenHeight,
    paddingTop: "10%",
  },
});
