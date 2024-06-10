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

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

export default function ScreenPaymentSuccess({ navigation }) {
  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <Image source={require("../assets/gitar.png")} style={styles.image} />
        <Text style={styles.yourPayment}>Your payment has been made</Text>
        <Text style={styles.thankYou}>
          Thank you for using <Text style={styles.angkotin}>Angkotin</Text>
        </Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.replace("mapScreen")}
        >
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 0.08 * screenWidth,
    alignItems: "center",
    paddingTop: 0.22 * screenHeight,
  },
  image: {
    height: 0.3 * screenHeight,
    width: 0.65 * screenWidth,
  },
  yourPayment: {
    paddingTop: 0.03 * screenHeight,
    fontSize: 23,
    fontWeight: "600",
  },
  thankYou: {
    paddingTop: 0.03 * screenHeight,
    fontSize: 20,
    fontWeight: "500",
  },
  angkotin: {
    fontWeight: "600",
    color: "#FBCC4B",
  },
  doneButton: {
    marginTop: 0.17 * screenHeight,
    height: 0.08 * screenHeight,
    backgroundColor: "#FBCC4B",
    borderRadius: 10,
    justifyContent: "center",
    width: "100%",
  },
  done: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
