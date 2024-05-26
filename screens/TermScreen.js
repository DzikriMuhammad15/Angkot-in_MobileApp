import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("screen").height;
const screenHeight = Dimensions.get("screen").width;

import { db, app } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
const usersRef = collection(db, "users");
// ! auth
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

export default function TermScreen({ navigation }) {
  const backToEmailScreen = () => {
    navigation.replace("emailScreen");
  };
  const addDocToFirestore = async () => {
    const userCreate = JSON.parse(await AsyncStorage.getItem("createUser"));
    try {
      const docRef = await addDoc(usersRef, userCreate);
    } catch (err) {
      console.log(err.message);
    }
  };
  const goToPaymentMethodScreen = async () => {
    await addDocToFirestore();
    const email = JSON.parse(await AsyncStorage.getItem("createUser")).email;
    const password = await AsyncStorage.getItem("createUserPassword");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    console.log(cred.user);
    await AsyncStorage.setItem("currentUser", JSON.stringify(cred.user));
    await AsyncStorage.setItem("token", JSON.stringify(cred._tokenResponse));
    navigation.replace("paymentMethodScreen");
  };
  return (
    <ScrollView style={styles.screenContainer}>
      <TouchableOpacity
        style={styles.logoBackContainer}
        onPress={backToEmailScreen}
      >
        <Image
          source={require("../assets/logoBack.png")}
          style={styles.logoBack}
        />
      </TouchableOpacity>
      <View style={styles.contentBesarContainer}>
        <Image
          source={require("../assets/logoProfile.png")}
          style={styles.logoProfile}
        />
        <View style={styles.byTappingContainer}>
          <Text style={styles.byTapping}>
            By tapping the arrow below, you agree to Angkotin’s Terms of Use and
            acknowledge that you have read the Privacy Policy
          </Text>
        </View>
        <View style={styles.checkTheBoxContainer}>
          <Text style={styles.checkTheBox}>
            Check the box to indicate that you are atleast 18 years of age,
            agree to the Terms & Conditions and acknowledge the Privacy Policy.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={goToPaymentMethodScreen}
      >
        <Text style={styles.next}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: "100%",
  },
  logoBack: {
    height: 16,
    width: 16,
  },
  logoBackContainer: {
    paddingTop: 48,
    paddingLeft: 24,
  },
  contentBesarContainer: {
    paddingLeft: "15%",
    paddingRight: "15%",
    paddingTop: "25%",
  },
  logoProfile: {
    width: 138,
    height: 138,
    alignSelf: "center",
  },
  byTappingContainer: {
    paddingTop: "15%",
  },
  byTapping: {
    fontSize: 17,
  },
  checkTheBox: {
    fontSize: 11,
  },
  checkTheBoxContainer: {
    paddingTop: "50%",
  },
  nextButton: {
    backgroundColor: "#FBCC4B",
    marginTop: "18%",
    height: 58,
    justifyContent: "center",
    marginHorizontal: "10%",
  },
  next: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 28,
    borderRadius: 5,
  },
});
