import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import { Image } from "expo-image";

// firebase
const { app } = require("../firebaseConfig");
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const auth = getAuth(app);
import { getFirestore, collection, query, where, getDocs, limit, getDoc } from "firebase/firestore";
const { db } = require("../firebaseConfig");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showHidePasswordText, setShowHidePasswordText] = useState("SHOW");
  const [error, setError] = useState("");


  const handleLogin = async () => {
    try {
      // todo cek dulu email sama passwordnya
      // todo cek emailnya tedaftar atau tidak

      const cred = await signInWithEmailAndPassword(auth, email, password);
      // ambil data firestore yg emailnya sesuai dan jadikan currentUser
      const colref = collection(db, "users");
      const q = query(colref, where("email", "==", email), limit(1));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.empty);
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await AsyncStorage.setItem("currentUser", JSON.stringify(doc.data()));
        })
      }
      console.log(await AsyncStorage.getItem("currentUser"));
      await AsyncStorage.setItem("token", JSON.stringify(cred._tokenResponse));
      navigation.replace("home1");
    } catch (err) {
      console.log(err.message);
      if ((err.code = "auth/invalid-credential")) {
        setError("Email or password invalid");
      } else {
        console.log(err.message);
      }
    }
  };

  const handleHideShowPassword = () => {
    if (!isPasswordVisible) {
      // todo jika isPasswordVisible = false
      // todo ubah isPasswordVisible menjadi true
      setIsPasswordVisible(true);
      // todo ubah showHideText menjadi "HIDE"
      setShowHidePasswordText("HIDE");
    } else {
      // todo jika isPasswordVisible = true
      // todo ubah isPasswordVisible menjadi false
      setIsPasswordVisible(false);
      // todo ubah showHideVisiblePassowrdText menjadi "SHOW"
      setShowHidePasswordText("SHOW");
    }
  };

  const gotoSignUpFlow = () => {
    navigation.replace("phoneNum");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require("../assets/logoApp.png")}
          style={styles.logoApp}
        />
      </View>
      <View style={styles.formLogin}>
        <Text style={styles.judulForm}>Sign in with your email address</Text>
        <View style={styles.formEmail}>
          <Image
            source={require("../assets/logoEmail.png")}
            style={styles.logoEmail}
          />
          <TextInput
            style={styles.inputEmail}
            placeholder="Email"
            onChangeText={(input) => {
              setEmail(input);
            }}
          />
        </View>
        <View style={styles.formPassword}>
          <Image
            source={require("../assets/logoPassword.png")}
            style={styles.logoPassword}
          />
          <TextInput
            style={styles.inputPasswword}
            placeholder="Password"
            onChangeText={(input) => {
              setPassword(input);
            }}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={handleHideShowPassword}>
            <Text style={styles.tulisanShow}>{showHidePasswordText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.tulisanSignIn}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccount}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.signUpNowContainer}
            onPress={gotoSignUpFlow}
          >
            <Text style={styles.signUpNow}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogo: {
    paddingTop: 132,
    justifyContent: "center",
    alignItems: "center",
  },
  logoApp: {
    width: 120,
    height: 120,
  },
  formLogin: {
    flex: 1,
    paddingTop: 38,
    paddingLeft: 32,
    paddingRight: 32,
  },
  judulForm: {
    fontSize: 20,
  },
  formEmail: {
    height: 43,
    backgroundColor: "#E6E6E6",
    marginTop: 15,
    paddingTop: 0,
    paddingLeft: 12,
    flexDirection: "row",
  },
  formPassword: {
    height: 43,
    backgroundColor: "#E6E6E6",
    marginTop: 15,
    paddingTop: 0,
    paddingLeft: 12,
    flexDirection: "row",
  },
  logoEmail: {
    width: 16,
    height: 16,
    marginTop: 13,
  },
  logoPassword: {
    width: 16,
    height: 16,
    marginTop: 13,
  },
  inputEmail: {
    marginTop: 0,
    marginLeft: 8,
    flex: 1,
    paddingRight: 10,
  },
  inputPasswword: {
    marginLeft: 8,
    flex: 1,
    paddingRight: 10,
  },
  tulisanShow: {
    paddingTop: 13,
    paddingRight: 8,
  },
  signInButton: {
    marginTop: 38,
    height: 48,
    backgroundColor: "#FBCC4B",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  tulisanSignIn: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  errorContainer: {},
  errorText: {
    color: "red",
    fontSize: 12,
  },
  signUpContainer: {
    flexDirection: "row",
    paddingTop: 7,
  },
  dontHaveAccount: {},
  signUpNowContainer: {
    paddingLeft: 7,
  },
  signUpNow: {
    color: "blue",
  },
});
