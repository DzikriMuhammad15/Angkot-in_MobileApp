import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { db, app } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";

const logsRef = collection(db, "logs");

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const imagePaths = {
  "Institut Teknologi Bandung": require("../assets/maps/ITBSMA3/start.png"),
  "SMAN 3 Bandung": require("../assets/maps/SMA3ITB/start.png"),
  "SMAN 8 Bandung": require("../assets/maps/SMA8ITB/start.png"),
  "Institut Teknologi Bandung - SMAN 3 Bandung": require("../assets/maps/ITBSMA3/finish.jpg"),
  "Institut Teknologi Bandung - SMAN 8 Bandung": require("../assets/maps/ITBSMA8/finish.jpg"),
  "SMAN 3 Bandung - Institut Teknologi Bandung": require("../assets/maps/SMA3ITB/finish.jpg"),
  "SMAN 3 Bandung - SMAN 8 Bandung": require("../assets/maps/SMA3SMA8/finish.jpg"),
  "SMAN 8 Bandung - Institut Teknologi Bandung": require("../assets/maps/SMA8ITB/finish.jpg"),
  "SMAN 8 Bandung - SMAN 3 Bandung": require("../assets/maps/SMA8SMA3/finish.jpg"),
};

export default function PickUpScreen({ navigation }) {
  const [titikAwal, setTitikAwal] = useState("");
  const [titikDestinasi, setTitikDestinasi] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [loading, setLoading] = useState(true);

  // click awal
  const clickAwalITB = () => {
    setTitikAwal("Institut Teknologi Bandung");
    setTitikDestinasi("");
    setImagePath("Institut Teknologi Bandung");
  };
  const clickAwalSMAN3 = () => {
    setTitikAwal("SMAN 3 Bandung");
    setTitikDestinasi("");
    setImagePath("SMAN 3 Bandung");
  };
  const clickAwalSMAN8 = () => {
    setTitikAwal("SMAN 8 Bandung");
    setTitikDestinasi("");
    setImagePath("SMAN 8 Bandung");
  };

  // click akhir
  const clickAkhirSMA3 = () => {
    setTitikDestinasi("SMAN 3 Bandung");
    if (titikAwal == "Institut Teknologi Bandung") {
      setImagePath("Institut Teknologi Bandung - SMAN 3 Bandung");
    } else {
      setImagePath("SMAN 8 Bandung - SMAN 3 Bandung");
    }
  };
  const clickAkhirSMA8 = () => {
    setTitikDestinasi("SMAN 8 Bandung");
    if (titikAwal == "Institut Teknologi Bandung") {
      setImagePath("Institut Teknologi Bandung - SMAN 8 Bandung");
    } else {
      setImagePath("SMAN 3 Bandung - SMAN 8 Bandung");
    }
  };

  const clickAkhirITB = () => {
    setTitikDestinasi("Institut Teknologi Bandung");
    if (titikAwal == "SMAN 3 Bandung") {
      setImagePath("SMAN 3 Bandung - Institut Teknologi Bandung");
    } else {
      setImagePath("SMAN 8 Bandung - Institut Teknologi Bandung");
    }
  };

  const addDocToFirestore = async () => {
    if (titikAwal.length > 0 && titikDestinasi.length > 0) {
      const response = await AsyncStorage.getItem("currentUser");
      const email = JSON.parse(response).email;
      const logCreate = {
        email: email,
        departurePoint: titikAwal,
        destinationPoint: titikDestinasi,
        date: new Date(),
      };
      try {
        await AsyncStorage.setItem("currentLog", imagePath);
        const docRef = await addDoc(logsRef, logCreate);
        navigation.replace("step1Screen");
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const setMapRegionLocation = async () => {
    const storedRegion = await AsyncStorage.getItem("mapRegion");
    if (storedRegion) {
      const parsedRegion = JSON.parse(storedRegion);
      console.log("parsed region : ", parsedRegion);
      setMapRegion(parsedRegion);
    } else {
      console.log("No mapRegion stored");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchMapRegion = async () => {
      await setMapRegionLocation();
    };
    fetchMapRegion();
  }, []);

  if (loading) {
    return <ScrollView style={styles.screenContainer}></ScrollView>;
  } else {
    return (
      <MenuProvider>
        <ScrollView style={styles.screenContainer}>
          <View style={styles.kuningContainer}>
            <TouchableOpacity
              style={styles.logoBackContainer}
              onPress={() => navigation.replace("home1")}
            >
              <Image
                source={require("../assets/logoBack.png")}
                style={styles.logoBack}
              />
            </TouchableOpacity>
            <View style={styles.containerInputan}>
              <Image
                source={require("../assets/garisAwalDes.png")}
                style={styles.garisAwalDes}
              />
              <View style={styles.containerInputanDalam}>
                <Menu style={styles.menuAwal}>
                  <MenuTrigger style={styles.triggerAwal}>
                    <Text style={styles.textTriggerAwal}>
                      {titikAwal ? titikAwal : "Open menu"}
                    </Text>
                  </MenuTrigger>
                  <MenuOptions style={styles.menuOptions}>
                    <MenuOption
                      style={styles.menuOption}
                      onSelect={clickAwalITB}
                    >
                      <Text style={styles.menuOptionText}>
                        Institut Teknologi Bandung
                      </Text>
                    </MenuOption>
                    <MenuOption
                      style={styles.menuOption}
                      onSelect={clickAwalSMAN3}
                    >
                      <Text style={styles.menuOptionText}>SMAN 3 Bandung</Text>
                    </MenuOption>
                    <MenuOption
                      style={styles.menuOption}
                      onSelect={clickAwalSMAN8}
                    >
                      <Text style={styles.menuOptionText}>SMAN 8 Bandung</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
                {titikAwal ? (
                  <Menu style={styles.menuAwal}>
                    <MenuTrigger style={styles.triggerAkhir}>
                      <Text style={styles.textTriggerAwal}>
                        {titikDestinasi ? titikDestinasi : "Open menu"}
                      </Text>
                    </MenuTrigger>
                    <MenuOptions style={styles.menuOptions}>
                      {titikAwal == "Institut Teknologi Bandung" ? null : (
                        <MenuOption
                          style={styles.menuOption}
                          onSelect={clickAkhirITB}
                        >
                          <Text style={styles.menuOptionText}>
                            Institut Teknologi Bandung
                          </Text>
                        </MenuOption>
                      )}
                      {titikAwal == "SMAN 3 Bandung" ? null : (
                        <MenuOption
                          style={styles.menuOption}
                          onSelect={clickAkhirSMA3}
                        >
                          <Text style={styles.menuOptionText}>
                            SMAN 3 Bandung
                          </Text>
                        </MenuOption>
                      )}
                      {titikAwal == "SMAN 8 Bandung" ? null : (
                        <MenuOption
                          style={styles.menuOption}
                          onSelect={clickAkhirSMA8}
                        >
                          <Text style={styles.menuOptionText}>
                            SMAN 8 Bandung
                          </Text>
                        </MenuOption>
                      )}
                    </MenuOptions>
                  </Menu>
                ) : (
                  <View style={styles.triggerAkhir}>
                    <Text style={styles.textTriggerAwal}>Open menu</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          {titikAwal ? (
            <ImageBackground
              style={styles.putihContainer}
              source={imagePaths[imagePath]}
            >
              {titikDestinasi ? (
                <TouchableOpacity
                  style={styles.confirmOrderButton}
                  onPress={addDocToFirestore}
                >
                  <Text style={styles.confirmOrder}>Confirm order</Text>
                </TouchableOpacity>
              ) : null}
            </ImageBackground>
          ) : (
            <View style={styles.putihContainer}>
              <MapView style={styles.mapView} region={mapRegion}></MapView>
            </View>
          )}
        </ScrollView>
      </MenuProvider>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  kuningContainer: {
    height: 0.25 * screenHeight,
    backgroundColor: "#FBCC4B",
  },
  logoBack: {
    height: 16,
    width: 16,
  },
  logoBackContainer: {
    paddingTop: 48,
    paddingLeft: 24,
  },
  containerInputan: {
    marginTop: 0.005 * screenHeight,
    height: 0.15 * screenHeight,
    paddingHorizontal: 0.1 * screenWidth,
    alignItems: "center",
    flexDirection: "row",
  },
  garisAwalDes: {
    height: 0.1 * screenHeight,
    width: 0.03 * screenWidth,
  },
  containerInputanDalam: {
    height: 0.12 * screenHeight,
    width: 0.7 * screenWidth,
    marginLeft: 0.07 * screenWidth,
    padding: 10, // Added padding to avoid cutting off content
    borderRadius: 5,
  },
  menuAwal: {
    textAlign: "center",
  },
  textTriggerAwal: {
    paddingLeft: 0.03 * screenWidth,
    color: "black", // Ensure text color is visible on red background
  },
  triggerAwal: {
    backgroundColor: "white",
    justifyContent: "center",
    height: 0.045 * screenHeight,
    borderRadius: 5,
    paddingHorizontal: 10, // Added horizontal padding
  },
  triggerAkhir: {
    backgroundColor: "white",
    justifyContent: "center",
    height: 0.045 * screenHeight,
    borderRadius: 5,
    paddingHorizontal: 10, // Added horizontal padding
    marginTop: 10, // Add some margin between triggers
  },
  menuOptions: {
    padding: 5, // Ensure there is padding in the menu options
  },
  menuOption: {
    padding: 10,
    borderBottomWidth: 1,
  },
  menuOptionText: {
    fontSize: 18,
    color: "#333",
  },
  putihContainer: {
    height: 0.75 * screenHeight,
  },
  confirmOrder: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 28,
    borderRadius: 5,
  },
  confirmOrderButton: {
    backgroundColor: "#FBCC4B",
    marginTop: 0.61 * screenHeight,
    height: 0.07 * screenHeight,
    justifyContent: "center",
    marginHorizontal: 0.07 * screenWidth,
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
});
