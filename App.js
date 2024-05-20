import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/loginScreen';
import Home from './screens/home'
import LoginStackNavigator from './navigator/navigator';
import PhoneNum from './screens/PhoneNum';
import SocialMediaScreen from './screens/SocialMediaScreen';
import NameScreen from './screens/NameScreen';
import EmailScreen from './screens/EmailScreen';
import TermScreen from './screens/TermScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import MapScreen from './screens/MapScreen';
import PickUpScreen from './screens/PickUpScreen';
import Step1Screen from './screens/Step1Screen';
import Step2Screen from './screens/Step2Screen';
import Step3Screen from './screens/Step3Screen';
import ScreenPaymentSuccess from './screens/ScreenPaymentSuccess';
// ! Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();


export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  async function authCheck() {
    // todo ambil current user
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      console.log("the email is:", JSON.parse(currentUser).email);
      // todo cek apakah current user ada atau tidak
      if (currentUser) {
        // todo jika ada, set isLogin menjadi true
        setIsLogin(true);
      }
      else {
        // todo jika tidak ada, set isLogin menjadi false
        setIsLogin(false);
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  async function setCreateUser(createUser) {
    await AsyncStorage.setItem('createUser', JSON.stringify(createUser));
  }

  useEffect(() => {
    authCheck();
    const createUser = {
      email: "",
      firstName: "",
      lastName: "",
      paymentMethod: [],
      phoneNumber: "",
      socialMedia: "",
    }
    setCreateUser(createUser);
    return () => {
      console.log("component unmounted");
    }

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (<Stack.Screen name='home' component={Home} options={{ headerShown: false }} />) : (<Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />)}
        <Stack.Screen name='home1' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='login1' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='phoneNum' component={PhoneNum} options={{ headerShown: false }} />
        <Stack.Screen name='socialMediaScreen' component={SocialMediaScreen} options={{ headerShown: false }} />
        <Stack.Screen name='nameScreen' component={NameScreen} options={{ headerShown: false }} />
        <Stack.Screen name='emailScreen' component={EmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name='termScreen' component={TermScreen} options={{ headerShown: false }} />
        <Stack.Screen name='paymentMethodScreen' component={PaymentMethodScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name='mapScreen'
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='pickUpScreen'
          component={PickUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='step1Screen'
          component={Step1Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='step2Screen'
          component={Step2Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='step3Screen'
          component={Step3Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='screenPaymentSuccess'
          component={ScreenPaymentSuccess}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});
