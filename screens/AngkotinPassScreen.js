import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function AngkotinPassScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Angkotin Pass</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.bigTitle}>Angkotin Pass</Text>
        <Text style={styles.subtitle}>1 week free -Rp 200.000/month</Text>
        <Text style={styles.priceDescription}>Rp 200.000/mo 1 week free</Text>
        <Text style={styles.description}>
          Go more places and get more local favorites, all with one membership
        </Text>

        <View className="border-b-2 border-[#979797] ">
          <View style={styles.benefitItem}>
            <Image
              source={require("../assets/Savings.png")}
              style={styles.benefitIcon}
            />
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitTitle}>Savings on every ride</Text>
              <Text style={styles.benefitDescription}>
                Angkotin Pass has you covered -10% off every angkot with comfort
                ride, 15% off every green, yellow, and blue angkot in the
                Bandung.
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Image
              source={require("../assets/Priority.png")}
              style={styles.benefitIcon}
            />
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitTitle}>
                Priority Passenger on every angkot
              </Text>
              <Text style={styles.benefitDescription}>
                Enjoy Priority Passenger status on every angkot with Angkotin
                Pass - board first and secure the best seats.
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Image
              source={require("../assets/Cancel.png")}
              style={styles.benefitIcon}
            />
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitTitle}>Cancel anytime</Text>
              <Text style={styles.benefitDescription}>
                Cancel your subscription anytime-no penalties or fees.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.learnMoreContainer}
          className="border-b-2 border-[#979797] py-6"
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.learnMoreText}>Learn more</Text>
          <FontAwesome name="chevron-right" size={16} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.getFreeButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.getFreeButtonText}>Get 1 week free</Text>
        </TouchableOpacity>
      </View>

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
  contentContainer: {
    padding: 20,
  },
  bigTitle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  priceDescription: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },

  benefitItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  benefitDescription: {
    fontSize: 14,
    color: "gray",
  },
  learnMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  learnMoreText: {
    fontSize: 16,
    color: "black",
    marginRight: 5,
  },
  getFreeButton: {
    backgroundColor: "#FBCC4B",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
  },
  getFreeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
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
