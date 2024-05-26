import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function MessagesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={styles.contentContainer}>
        <Image
          source={require("../assets/MessagesImage.png")}
          style={styles.image}
        />
        <Text style={styles.mainText}>You are all up to date!</Text>
        <Text style={styles.subText}>
          No new messages available at the moment, come back soon to discover
          new offers
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 175,
    height: 175,
    marginBottom: 20,
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});
