import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");

const CustomDrawer = ({ navigation, isDrawerOpen, toggleDrawer }) => {
  const [username, setUsername] = useState("");
  const [animation] = useState(new Animated.Value(-width));
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("currentUser");
        if (user) {
          const parsedUser = JSON.parse(user);
          setUsername(`${parsedUser.firstName} ${parsedUser.lastName}`);
        }
        setIsloading(false)
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isDrawerOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDrawerOpen]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx > 10 || gestureState.dx < -10;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < 0) {
        animation.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -width * 0.25) {
        toggleDrawer();
      } else {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const navigateToScreen = (screen) => {
    toggleDrawer();
    navigation.navigate(screen);
  };
  if (!isLoading) {

    return (
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: animation }] },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />
        <View style={styles.drawerContent}>
          <View className="bg-[#FBCC4B] flex  justify-center items-center gap-x-2">
            <View style={styles.userInfoSection} className="w-[90%] ">
              <FontAwesome name="user-circle" size={48} color="black" />
              <Text style={styles.title}>{username}</Text>
            </View>
            <TouchableOpacity
              style={styles.customDrawerItem}
              onPress={() =>
                navigation.navigate("DrawerNavigator", { screen: "Messages" })
              }
            >
              <View style={styles.customDrawerItemContent}>
                <View className="flex flex-row items-center justify-between gap-x-2">
                  <Text style={styles.customDrawerItemLabel}>Messages</Text>
                  <FontAwesome
                    name="circle"
                    size={8}
                    color="blue"
                    style={styles.dotIcon}
                  />
                </View>

                <FontAwesome name="chevron-right" size={16} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerSection}>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() =>
                navigation.navigate("DrawerNavigator", { screen: "Trips" })
              }
            >
              <Text style={styles.drawerItemLabel}>Your Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() =>
                navigation.navigate("DrawerNavigator", { screen: "Payment" })
              }
            >
              <Text style={styles.drawerItemLabel}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() =>
                navigation.navigate("DrawerNavigator", { screen: "AngkotinPass" })
              }
            >
              <Text style={styles.drawerItemLabel}>Angkotin Pass</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() =>
                navigation.navigate("DrawerNavigator", {
                  screen: "AccountSettings",
                })
              }
            >
              <Text style={styles.drawerItemLabel}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.legal}>Legal</Text>
            <Text style={styles.version}>v4.3712003</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  drawerContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width,
    backgroundColor: "transparent",
    zIndex: 1000,
  },
  overlay: {
    position: "absolute",
    left: width * 0.75,
    top: 0,
    bottom: 0,
    width: width * 0.25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawerContent: {
    width: width * 0.75,
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingVertical: 20,
  },
  userInfoSection: {
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    paddingLeft: 10,
  },
  drawerSection: {
    marginTop: 15,
  },
  footerSection: {
    marginTop: 300,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  legal: {
    fontSize: 14,
    color: "black",
  },
  version: {
    fontSize: 14,
    color: "black",
  },
  customDrawerItem: {
    backgroundColor: "#FBCC4B",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customDrawerItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  customDrawerItemLabel: {
    color: "black",
    fontSize: 16,
  },
  drawerItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  drawerItemLabel: {
    fontSize: 16,
    color: "black",
  },
  dotIcon: {},
});

export default CustomDrawer;
