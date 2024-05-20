import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('screen').height;
const screenHeight = Dimensions.get('screen').width;
export default function NameScreen({ navigation }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [triggerNavigation, setTriggerNavigation] = useState(false);
    useEffect(() => {
        if (triggerNavigation) {
            gotoEmailScreen();
        }
        return () => {
            console.log("component unmounted");
        }
    }, [triggerNavigation]);


    const backToPhoneNum = async () => {
        const createUser = JSON.parse(await AsyncStorage.getItem('createUser'));
        createUser.firstName = "";
        createUser.lastName = "";
        await AsyncStorage.setItem('createUser', JSON.stringify(createUser));
        console.log(await AsyncStorage.getItem('createUser'));
        navigation.replace('socialMediaScreen');
    }
    const gotoEmailScreen = async () => {
        const createUser = JSON.parse(await AsyncStorage.getItem('createUser'));
        createUser.firstName = firstName;
        createUser.lastName = lastName;
        await AsyncStorage.setItem('createUser', JSON.stringify(createUser));
        console.log(await AsyncStorage.getItem('createUser'));
        navigation.replace('emailScreen');
        setTriggerNavigation(false);
    }
    const nextButtonHandler = () => {
        setTriggerNavigation(true);
    }

    return (
        <ScrollView style={styles.screenContainer}>
            <TouchableOpacity style={styles.logoBackContainer} onPress={backToPhoneNum}>
                <Image source={require("../assets/logoBack.png")} style={styles.logoBack} />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <View style={styles.enterContainer}>
                    <Text style={styles.enterText}>What's your name</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.firstName}>
                        <TextInput
                            placeholder='First'
                            style={styles.firstInput}
                            onChangeText={(val) => setFirstName(val)}

                        />
                        <Image source={require("../assets/garisHorizontalAbu.png")} style={styles.garisHorizontal} />
                    </View>
                    <View style={styles.lastName}>
                        <TextInput
                            placeholder='Last'
                            style={styles.lastInput}
                            onChangeText={(val) => setLastName(val)}
                        />
                        <Image source={require("../assets/garisHorizontalAbu.png")} style={styles.garisHorizontal} />
                    </View>
                </View>
            </View>
            <View style={styles.footer} className="mt-[120%]">
                <TouchableOpacity style={styles.nextButton} onPress={nextButtonHandler}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    logoBack: {
        height: 16,
        width: 16,
    },
    logoBackContainer: {
        paddingTop: 48,
        paddingLeft: 24,
    },
    screenContainer: {
        flex: 1,
        height: '100%'
    },
    contentContainer: {
        paddingTop: '8%',
        paddingLeft: '7%',
        paddingRight: '7%',

    },
    enterContainer: {

    },
    enterText: {
        fontWeight: '400',
        fontSize: 28
    },
    form: {
        paddingTop: '6%',
        paddingHorizontal: '0%',
        flexDirection: 'row'
    },
    firstName: {
        width: '45%',
    },
    lastName: {
        width: '45%',
        marginLeft: '10%'
    },
    garisHorizontal: {
        width: 0.19 * screenWidth,
        height: 0.005 * screenHeight,
    },
    firstInput: {
        fontSize: 18,
    },
    lastInput: {
        fontSize: 18,
    },
    footer: {
        flex: 1,
        paddingLeft: 36,
        paddingRight: 36,

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
