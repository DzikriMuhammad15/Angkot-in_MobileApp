import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function AccountSettingsScreen({ navigation }) {
  const [user, setUser] = useState({
    firstName: "undefined",
    lastName: "undefined",
    phoneNumber: "08xx",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const currentUser = await AsyncStorage.getItem("currentUser");
        if (currentUser) {
          const parsedUser = JSON.parse(currentUser);
          setUser({
            firstName: parsedUser.firstName,
            lastName: parsedUser.lastName,
            phoneNumber: parsedUser.phoneNumber,
          });
        }
        console.log(user);
        setIsLoading(false);
        console.log("is loading: ", isLoading);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  //Not Complete
  // const handleSignOut = async () => {
  //   try {
  //     await auth().signOut();
  //     await AsyncStorage.removeItem("currentUser");
  //     navigation.replace("login1");
  //     console.log("User signed out!");
  //   } catch (error) {
  //     console.error("Error signing out: ", error);
  //   }
  // };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out!");
      await AsyncStorage.setItem("currentUser", JSON.stringify({}));
      navigation.navigate("login1"); // Navigate back to the login screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  if (!isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Settings</Text>
        </View>
        <View style={styles.profileContainer}>
          {/* Picture Profile */}
          <FontAwesome name="user-circle" size={48} color="black" />
          <View className="flex flex-col ml-4">
            <Text style={styles.profileName}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.profilePhone}>
              {user.phoneNumber}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome name="home" size={24} color="black" />
            <Text style={styles.sectionText}>Add Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome name="briefcase" size={24} color="black" />
            <Text style={styles.sectionText}>Add Work</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionLink}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.sectionLinkText}>More Saved Places</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionLink}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.sectionLinkText}>Privacy</Text>
          </TouchableOpacity>
          <Text>Manage the data you share with us</Text>
          <TouchableOpacity
            style={styles.sectionLink}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.sectionLinkText}>Security</Text>
            <Text>Control your account security with 2-step verification</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Coming Soon</Text>
              <Text style={styles.modalDescription}>
                We're still building this feature.
              </Text>
              <Text style={styles.modalDescription}>
                This feature is currently under construction, but feel free to
                check it later. We'll have it complete really soon!
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleModalClose}
              >
                <Text style={styles.modalButtonText}>Got it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    alignItems: "flex-start",
    backgroundColor: "#FBCC4B",
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "semi-bold",
    color: "black",
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: "row",
    marginLeft: 25,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  profilePicture: {},
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profilePhone: {
    fontSize: 16,
    color: "gray",
  },
  sectionContainer: {
    marginLeft: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  sectionLink: {
    marginBottom: 5,
  },
  sectionLinkText: {
    fontSize: 16,
    color: "blue",
    paddingTop: 20,
  },
  signOutButton: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: "red",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  signOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#FBCC4B",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
