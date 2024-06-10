import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { db } from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("screen").height;
const screenHeight = Dimensions.get("screen").width;

const usersRef = collection(db, "users");

export default function PaymentMethodScreen({ navigation }) {
  const [paymentMethos, setPaymentMethod] = useState("");
  const [navigationTrigger, setNavigationTrigger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateCreateUser = async () => {
    try {
      const email = JSON.parse(await AsyncStorage.getItem("createUser")).email;
      const q = query(usersRef, where("email", "==", email));
      const querySnapshoot = await getDocs(q);
      querySnapshoot.forEach(async (docSnapshoot) => {
        const usersRef = doc(db, "users", docSnapshoot.id);
        const updatedUser = {
          paymentMethod: [paymentMethos],
        };
        await updateDoc(usersRef, updatedUser);
        console.log(paymentMethos);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (navigationTrigger) {
      // todo update firebase createUser payment methodenya
      updateCreateUser();
      // todo navigate to home1
      navigation.replace("home1");
      setNavigationTrigger(false);
    }
    return () => {
      console.log("component unmounted");
    };
  }, [navigationTrigger]);

  const gotoHome = () => {
    navigation.replace("home1");
  };

  const setCredit = () => {
    setPaymentMethod("credit/debit");
    setNavigationTrigger(true);
  };
  const setDana = () => {
    setPaymentMethod("dana");
    setNavigationTrigger(true);
  };
  const cash = () => {
    setPaymentMethod("cash");
    setNavigationTrigger(true);
  };

  const handleNext = () => {
    setIsModalOpen(true);
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={styles.contentContainer}>
        {/* <TouchableOpacity
          style={styles.doThisLaterContainer}
          onPress={gotoHome}
        >
          <Text style={styles.doThisLater}>DO THIS LATER</Text>
        </TouchableOpacity> */}
        <View style={styles.pilihanContainer}>
          <View style={styles.selectContainer}>
            <Text style={styles.select}>
              Select your prefered payment method
            </Text>
          </View>
          <TouchableOpacity
            style={styles.creditCardContainer}
            onPress={setCredit}
          >
            <Image
              source={require("../assets/logoCredits.png")}
              style={styles.logoCreditCard}
            />
            <Text style={styles.pilihanPayment}>Credit or Debit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.danaContainer} onPress={setDana}>
            <Image
              source={require("../assets/logoDana.png")}
              style={styles.danaLogo}
            />
            <Text style={styles.pilihanPayment}>Dana</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cashContainer} onPress={cash}>
            <Image
              source={require("../assets/logoCash.png")}
              style={styles.logoCreditCard}
            />
            <Text style={styles.pilihanPayment}>Cash</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              You won’t be able to request a ride without adding a payment
              method
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalOpen(false)}
            >
              <Text style={styles.modalButtonText}>Add Payment Method Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={gotoHome}>
              <Text style={styles.modalButtonText}>Do it Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  doThisLaterContainer: {
    paddingHorizontal: "10%",
    alignItems: "flex-end",
  },
  doThisLater: {
    fontSize: 20,
    color: "blue",
  },
  contentContainer: {
    paddingTop: "10%",
    flex: 1,
  },
  pilihanContainer: {
    paddingHorizontal: "10%",
    flex: 1,
  },
  selectContainer: {
    paddingTop: "8%",
  },
  select: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  creditCardContainer: {
    paddingTop: "10%",
    flexDirection: "row",
    alignItems: "center",
  },
  logoCreditCard: {
    height: 0.06 * screenWidth,
    width: 0.06 * screenWidth,
  },
  pilihanPayment: {
    paddingLeft: "6%",
    fontSize: 18,
    fontWeight: "500",
  },
  danaContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "7%",
  },
  danaLogo: {
    height: 0.07 * screenWidth,
    width: 0.06 * screenWidth,
  },
  cashContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "7%",
  },
  nextButton: {
    position: "absolute",
    backgroundColor: "#FBC02D",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    width: "80%",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#FBC02D",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
