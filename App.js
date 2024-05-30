import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/loginScreen";
import DrawerNavigator from "./navigator/DrawerNavigation";
import PhoneNum from "./screens/PhoneNum";
import SocialMediaScreen from "./screens/SocialMediaScreen";
import NameScreen from "./screens/NameScreen";
import EmailScreen from "./screens/EmailScreen";
import TermScreen from "./screens/TermScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PickUpScreen from "./screens/PickUpScreen";
import Step1Screen from "./screens/Step1Screen";
import Step2Screen from "./screens/Step2Screen";
import Step3Screen from "./screens/Step3Screen";
import ScreenPaymentSuccess from "./screens/ScreenPaymentSuccess";
import Home from "./screens/home";
import MapScreen from "./screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  async function authCheck() {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
      console.log("current user: ", currentUser);
      if (currentUser.email) {
        console.log(currentUser);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    authCheck();
    console.log("isLogin: ", isLogin);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <Stack.Screen name="DrawerNavigator1" component={DrawerNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen
          name="home1"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login1"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="phoneNum"
          component={PhoneNum}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="socialMediaScreen"
          component={SocialMediaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="nameScreen"
          component={NameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="emailScreen"
          component={EmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="termScreen"
          component={TermScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="paymentMethodScreen"
          component={PaymentMethodScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pickUpScreen"
          component={PickUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="step1Screen"
          component={Step1Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="step2Screen"
          component={Step2Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="step3Screen"
          component={Step3Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screenPaymentSuccess"
          component={ScreenPaymentSuccess}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
