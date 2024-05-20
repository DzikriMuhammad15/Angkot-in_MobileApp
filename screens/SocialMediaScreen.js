import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SocialMediaScreen({ navigation }) {
    const [sosmed, setSosmed] = useState("");
    const [triggerNavigation, setTriggerNavigation] = useState(false);

    useEffect(() => {
        if (triggerNavigation) {
            goToNameScreen();
        }
        return console.log("component unmounted");
    }, [sosmed]);

    const backToPhoneNum = async () => {
        const createUser = JSON.parse(await AsyncStorage.getItem('createUser'));
        createUser.socialMedia = "";
        await AsyncStorage.setItem('createUser', JSON.stringify(createUser));
        navigation.replace('phoneNum');
    };

    const goToNameScreen = async () => {
        const createUser = JSON.parse(await AsyncStorage.getItem('createUser'));
        createUser.socialMedia = sosmed;
        await AsyncStorage.setItem('createUser', JSON.stringify(createUser));
        console.log(await AsyncStorage.getItem('createUser'));
        navigation.replace('nameScreen');
        setTriggerNavigation(false);
    };

    const setGoogle = () => {
        setSosmed('google');
        setTriggerNavigation(true);
    };

    const setFacebook = () => {
        setSosmed('facebook');
        setTriggerNavigation(true);
    };

    return (
        <ScrollView style={styles.screenContainer}>
            <TouchableOpacity style={styles.logoBackContainer} onPress={backToPhoneNum}>
                <Image source={require("../assets/logoBack.png")} style={styles.logoBack} />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.chooseAnAccount}>
                    Choose an Account
                </Text>
                <TouchableOpacity style={styles.facebookContainer} onPress={setFacebook}>
                    <Image source={require("../assets/logoFacebook.png")} style={styles.logoFacebook} />
                    <Text style={styles.facebook}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.facebookContainer} onPress={setGoogle}>
                    <Image source={require("../assets/logoGoogle.png")} style={styles.logoFacebook} />
                    <Text style={styles.facebook}>Google</Text>
                </TouchableOpacity>
                <View style={styles.termAndConditionContainer}>
                    <Text style={styles.termAndConditionText}>By clicking on a social option you may receive an SMS for verification. Message and data rates may apply.</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    logoBack: {
        height: 16,
        width: 16,
    },
    logoBackContainer: {
        paddingTop: 48,
        paddingLeft: 24,
    },
    contentContainer: {
        paddingTop: 36,
        paddingLeft: 36,
    },
    chooseAnAccount: {
        fontSize: 28,
        fontWeight: '500'
    },
    facebookContainer: {
        paddingTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
    },
    facebook: {
        paddingLeft: 36,
        fontSize: 20,
        fontWeight: '400'
    },
    logoFacebook: {
        height: 30,
        width: 30,
    },
    termAndConditionContainer: {
        paddingTop: 24,
        paddingRight: 36
    },
    termAndConditionText: {
        fontWeight: '400',
        fontSize: 12
    }
});
