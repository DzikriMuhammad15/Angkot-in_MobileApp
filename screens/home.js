
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ({ navigation }) {
    const logoutHandle = async () => {
        // todo hapus nilai currentUser
        await AsyncStorage.removeItem('currentUser');
        // todo navigate to login
        navigation.replace('login1')
    }
    const showCurrentUser = async () => {
        const response = await AsyncStorage.getItem('currentUser');
        console.log(JSON.parse(response).email);
    }
    useEffect(() => {
        console.log("halo");
    })
    return (
        <View>
            <Text>Home</Text>
            <Button
                title='Logout'
                onPress={logoutHandle}
            />
            <Button
                title='Show Current User'
                onPress={showCurrentUser}
            />
        </View>
    )
}