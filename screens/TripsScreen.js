import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConfig"; // Make sure to configure firebase
import { collection, getDocs, query, where } from "firebase/firestore";

const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toDateString();
};

const PastTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const currentUser = await AsyncStorage.getItem("currentUser");
      const { email } = JSON.parse(currentUser);
      const tripsQuery = query(
        collection(db, "logs"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(tripsQuery);

      const tripsData = [];
      querySnapshot.forEach((doc) => {
        tripsData.push({ id: doc.id, ...doc.data() });
      });

      setTrips(tripsData);
    } catch (err) {
      console.error("Error fetching trips: ", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const renderTripItem = (trip) => (
    <View key={trip.id} style={styles.tripContainer}>
      <Text style={styles.tripDate}>{formatDate(trip.date)}</Text>
      <Text style={styles.tripPoints}>
        {trip.departurePoint} → {trip.destinationPoint}
      </Text>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return trips.length > 0 ? (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {trips.map(renderTripItem)}
    </ScrollView>
  ) : (
    <View style={styles.noTripsContainer}>
      <Text style={styles.noTripsText}>You haven’t taken a trip yet</Text>
      <Button title="Retry" onPress={fetchTrips} />
    </View>
  );
};

const UpcomingTrips = () => (
  <View style={styles.comingSoonContainer}>
    <Image
      source={require("../assets/ComingSoon.png")}
      style={styles.comingSoonImage}
    />
    <Text style={styles.comingSoonTitle}>Coming Soon</Text>
    <Text style={styles.comingSoonDescription}>
      We're still building this page. This page is currently under construction,
      but feel free to check it later. We'll have it complete really soon!
    </Text>
  </View>
);

const renderScene = SceneMap({
  past: PastTrips,
  upcoming: UpcomingTrips,
});

export default function TripScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "past", title: "Past" },
    { key: "upcoming", title: "Upcoming" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Trips</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: styles.container.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
          />
        )}
      />
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
  tripContainer: {
    padding: 15,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tripDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tripPoints: {
    fontSize: 14,
    color: "gray",
  },
  noTripsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTripsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  comingSoonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  comingSoonDescription: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  indicator: {
    backgroundColor: "#6200EE",
    height: 2,
  },
  tabBar: {
    backgroundColor: "#FBCC4B",
  },
  label: {
    color: "black",
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
});
