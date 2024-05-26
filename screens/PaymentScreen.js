import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function PaymentScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  //navigate or goToPaymentMethodScreen
  const goToPaymentMethodScreen = () => {
    navigation.replace("paymentMethodScreen");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <View style={styles.giftCardContainer}>
        <Text style={styles.giftCardTitle}>Angkotin Cash</Text>
        <Text style={styles.giftCardAmount}>Rp 20.000</Text>
        <TouchableOpacity
          style={styles.giftCardButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.giftCardButtonText}>+ Gift card</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addPaymentMethod}
        className="border-b-2 border-[#979797] w-full"
        onPress={goToPaymentMethodScreen}
      >
        <Text style={styles.addPaymentMethodText}>Add Payment Method</Text>
      </TouchableOpacity>

      <View
        style={styles.sectionContainer}
        className="border-b-2 border-[#979797]"
      >
        <Text style={styles.sectionTitle}>Ride Profiles</Text>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../assets/Personal.png")}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionText}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../assets/AFB.png")}
            style={styles.sectionIcon}
          />
          <View className="flex flex-col ">
            <Text style={styles.sectionText}>
              Start using Angkot for business
            </Text>
            <Text style={styles.sectionDescription}>
              Turn on business travel features
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={styles.sectionContainer}
        className="border-b-2 border-[#979797]"
      >
        <Text style={styles.sectionTitle}>Promotions</Text>
        <View style={styles.sectionItem}>
          <Image
            source={require("../assets/Promotion.png")}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionText}>Promotions</Text>
        </View>
        <TouchableOpacity
          style={styles.addCode}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addCodeText}>Add Promo Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Vouchers</Text>
        <View style={styles.sectionItem}>
          <Image
            source={require("../assets/Vouchers.png")}
            style={{ width: 40, height: 32, marginRight: 10 }}
          />
          <Text style={styles.sectionText}>Vouchers</Text>
        </View>
        <TouchableOpacity
          style={styles.addCode}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addCodeText}>Add Voucher Code</Text>
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
    </ScrollView>
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
  giftCardContainer: {
    backgroundColor: "#E3E3E3",
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    justifyContent: "flex-start",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  giftCardTitle: {
    fontSize: 16,
    color: "black",
  },
  giftCardAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginVertical: 10,
  },
  giftCardButton: {
    backgroundColor: "#000000",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  giftCardButtonText: {
    color: "#FFFFFF",
  },
  addPaymentMethod: {
    paddingVertical: 10,
  },
  addPaymentMethodText: {
    marginHorizontal: 20,
    fontSize: 16,
    color: "blue",
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "black",
  },
  sectionDescription: {
    fontSize: 14,
    color: "gray",
  },
  addCode: {
    marginVertical: 10,
  },
  addCodeText: {
    fontSize: 16,
    color: "blue",
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
