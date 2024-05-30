import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer"; // Ensure the correct path

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

export default function MapScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true)
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const setMapRegionLocation = async () => {
    const storedRegion = await AsyncStorage.getItem("mapRegion");
    if (storedRegion) {
      const parsedRegion = JSON.parse(storedRegion);
      setMapRegion(parsedRegion);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchMapRegion = async () => {
      await setMapRegionLocation();
    };
    fetchMapRegion();
    setIsLoading(false)
  }, []);

  if (loading) {
    return <View style={styles.screenContainer}></View>;
  }

  return (
    <View style={styles.screenContainer}>
      <CustomDrawer
        navigation={navigation}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <TouchableOpacity style={styles.header} onPress={toggleDrawer}>
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>
      <MapView style={styles.mapView} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <View style={styles.putihContainer}>
        <TouchableOpacity
          style={styles.buttonEnter}
          onPress={() => navigation.replace("pickUpScreen")}
        >
          <Text style={styles.enter}>Enter pickup point</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 10,
  },
  mapView: {
    width: "100%",
    height: "85%",
  },
  putihContainer: {
    height: "22%",
    paddingTop: "10%",
    paddingHorizontal: "8%",
    backgroundColor: "white",
  },
  buttonEnter: {
    borderColor: "black",
    borderWidth: 1,
    height: "30%",
    justifyContent: "center",
    borderRadius: 10,
  },
  enter: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});
