import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/loginScreen';
import Home from './screens/home'

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

  useEffect(() => {
    authCheck();
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
