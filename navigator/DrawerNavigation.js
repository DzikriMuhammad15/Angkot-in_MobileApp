import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../screens/CustomDrawer"; // Ensure the correct path
import Home from "../screens/home";
import TripsScreen from "../screens/TripsScreen";
import PaymentScreen from "../screens/PaymentScreen";
import AngkotinPassScreen from "../screens/AngkotinPassScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import MapScreen from "../screens/MapScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Messages" component={MessagesScreen} />
      <Drawer.Screen name="Trips" component={TripsScreen} />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="AngkotinPass" component={AngkotinPassScreen} />
      <Drawer.Screen name="AccountSettings" component={AccountSettingsScreen} />
    </Drawer.Navigator>
  );
}
