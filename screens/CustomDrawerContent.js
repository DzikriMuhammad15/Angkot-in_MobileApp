import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerContent = (props) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("currentUser");
        console.log("Masuk CustomDrawerContent");
        if (user) {
          const parsedUser = JSON.parse(user);
          setUsername(`${parsedUser.firstName} ${parsedUser.lastName}`);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);
  if (!isLoading) {

    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View className="bg-[#FBCC4B]">
            <View
              style={styles.userInfoSection}
              className=" border-b-2 border-[#000000] w-[80%] "
            >
              <FontAwesome name="user-circle" size={40} color="black" />
              <Text style={styles.title}>{username}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.customDrawerItem}
            onPress={() => props.navigation.navigate("Messages")}
          >
            <View style={styles.customDrawerItemContent}>
              <View style={styles.messageLabel}>
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

          <View style={styles.drawerSection}>
            <DrawerItem
              label="Your Trips"
              onPress={() => props.navigation.navigate("Trips")}
            />
            <DrawerItem
              label="Payment"
              onPress={() => props.navigation.navigate("Payment")}
            />
            <DrawerItem
              label="Angkotin Pass"
              onPress={() => props.navigation.navigate("AngkotinPass")}
            />
            <DrawerItem
              label="Settings"
              onPress={() => props.navigation.navigate("AccountSettings")}
            />
          </View>
          <View
            style={styles.footerSection}
            className="flex flex-row items-center justify-between mr-4"
          >
            <Text style={styles.legal}>Legal</Text>
            <Text style={styles.version}>v4.3712003</Text>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  }
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    flexDirection: "row",
    marginLeft: 20,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "flex-start",
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
    marginTop: 350,
    paddingLeft: 20,
    position: "fixed",
    bottom: 0,
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
    paddingRight: 30,
    paddingLeft: 20,
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
  messageLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotIcon: {
    marginHorizontal: 10,
  },
});

export default CustomDrawerContent;
