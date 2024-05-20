import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PhoneNum({ navigation }) {
    const [phoneNum, setPhoneNum] = useState("");
    const [triggerNavigation, setTriggerNavigation] = useState(false);
    useEffect(() => {
        if (triggerNavigation) {
            goToNameScreen();
        }
        return () => {
            console.log("component unmounted");
        }
    }, [triggerNavigation]);
    const goToNameScreen = async () => {
        // todo ambil dari async storage
        const createUser = JSON.parse(await AsyncStorage.getItem('createUser'));
        // todo set phoneNumber jadi phoneNum
        createUser.phoneNumber = "0" + phoneNum;
        // todo simpan kembali dengan key yang sama
        await AsyncStorage.setItem('createUser', JSON.stringify(createUser));
        // todo navigate ke nameScreen
        navigation.replace('nameScreen');
        console.log(JSON.parse(await AsyncStorage.getItem('createUser')));
        setTriggerNavigation(false);
    }
    const backToLogin = async () => {
        // todo ambil dari async storage
        const createUser = JSON.parse(await AsyncStorage.getItem('createUser'));
        // todo set phoneNumber jadi phoneNum
        createUser.phoneNumber = "";
        // todo simpan kembali dengan key yang sama
        await AsyncStorage.setItem('createUser', JSON.stringify(createUser));
        // todo navigate ke nameScreen
        navigation.replace('login1');
    }
    const goToSocialMediaScreen = () => {
        navigation.replace('socialMediaScreen');
    }
    const nextButton = async () => {
        setTriggerNavigation(true)
    }

    return (
        <ScrollView style={styles.screenContainer}>
            <TouchableOpacity style={styles.logoBackContainer} onPress={backToLogin}>
                <Image source={require("../assets/logoBack.png")} style={styles.logoBack} />
            </TouchableOpacity>
            <View style={styles.phoneNumContainer}>
                <Text style={styles.judul}>Enter your mobile number</Text>
            </View>
            <View style={styles.containerForm}>
                <Image source={require("../assets/logoIndo.png")} style={styles.logoIndo} />
                <Text style={styles.plusEnamDua}>
                    +62
                </Text>
                <View style={styles.containerIsian}>
                    <TextInput style={styles.isian} onChangeText={(val) => setPhoneNum(val)} keyboardType='numeric' />
                </View>
            </View>
            <TouchableOpacity style={styles.socialContainer} onPress={goToSocialMediaScreen}>
                <Text style={styles.orConnectWithSocial}>Or Connect With Social</Text>
                <Image source={require("../assets/nextBiru.png")} style={styles.next} />
            </TouchableOpacity>
            <View style={styles.footer} className="mt-[100%]">
                <Text style={styles.term}>By continuing you may recieve an SMS for verification. Message and data rates may apply.</Text>
                <TouchableOpacity style={styles.nextButton} onPress={nextButton}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        height: '100%',
    },
    logoBack: {
        height: 16,
        width: 16,
    },
    logoBackContainer: {
        paddingTop: 48,
        paddingLeft: 24,
    },
    phoneNumContainer: {

        paddingTop: 36,
    },
    judul: {
        fontSize: 28,
        textAlign: 'center',

    },
    containerForm: {
        marginTop: 36,
        paddingLeft: 36,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 36,
    },
    logoIndo: {
        width: 52,
        height: 34
    },
    plusEnamDua: {
        paddingLeft: 24,
        fontSize: 20
    },
    isian: {
        fontSize: 20,
        paddingLeft: 12,
        paddingRight: 12,
    },
    containerIsian: {
        backgroundColor: "#eaeaea",
        flex: 1,
        marginLeft: 12,
        borderRadius: 10,
    },
    socialContainer: {
        paddingTop: 16,
        flexDirection: 'row',
        paddingLeft: 36,
        alignItems: 'center',
    },
    orConnectWithSocial: {
        color: 'blue',
        fontSize: 20,
        fontWeight: 'blod',
    },
    next: {
        height: 16,
        width: 16,
        marginLeft: 12,
    },
    footer: {
        flex: 1,
        paddingLeft: 36,
        paddingRight: 36,

    },
    term: {
        fontSize: 14,
        fontWeight: "700"
    },
    nextButton: {
        backgroundColor: "#FBCC4B",
        marginTop: 16,
        height: 58,
        justifyContent: 'center'
    },
    next: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "900",
        fontSize: 28,
        borderRadius: 5,
    }

})