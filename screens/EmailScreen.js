import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';
// !firestore
import { db, app } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
const usersRef = collection(db, "users");
// ! auth
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(app);


const screenWidth = Dimensions.get('screen').height;
const screenHeight = Dimensions.get('screen').width;


export default function EmailScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("")
    const [navigationTrigger, setNavigationTrigger] = useState(false);

    useEffect(() => {
        if (navigationTrigger) {
            goToTermScreen();
        }
        return () => {
            console.log("component unmounted");
        }
    }, [navigationTrigger]);

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const inputCheck = async () => {
        // todo ambil dulu dari db dan cek apakah ada email yang sama
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // todo jika ada, set email error, return false
            setError("Email has already taken");
            return false;
        }
        if (!isValidEmail(email)) {
            setError("Please enter a valid email");
            return false;
        }
        else {
            // todo jika tidak ada, cek apakah password dan rePassword sama
            if (password != rePassword) {
                // todo jika tidak sama, set password error, return false
                setError("Password and password confirmation doesn't match");
                return false;
            }
            else {
                // todo return true
                if (password.length < 6) {
                    setError("Password must be at least 6 characters");
                    return false
                }
                return true;
            }
        }
    }
    const nextButtonHandle = () => {
        setNavigationTrigger(true);
    }

    const backToNameScreen = async () => {
        const createUser = JSON.parse(await AsyncStorage.getItem('createUser'));
        createUser.email = "";
        navigation.replace('nameScreen');
    }
    const goToTermScreen = async () => {
        try {
            const confirmed = await inputCheck();
            if (confirmed) {
                const createUser = JSON.parse(await AsyncStorage.getItem('createUser'));
                createUser.email = email;
                await AsyncStorage.setItem("createUser", JSON.stringify(createUser));
                console.log(JSON.parse(await AsyncStorage.getItem("createUser")));
                await AsyncStorage.setItem('createUserPassword', password);
                // const cred = await signInWithEmailAndPassword(auth, email, password);
                // console.log(cred.user);
                // await AsyncStorage.setItem('currentUser', JSON.stringify(cred.user));
                // await AsyncStorage.setItem('token', JSON.stringify(cred._tokenResponse));
                navigation.replace('termScreen');
            }
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            setNavigationTrigger(false);
        }
    }
    return (
        <ScrollView style={styles.screenContainer}>
            <TouchableOpacity style={styles.logoBackContainer} onPress={backToNameScreen}>
                <Image source={require("../assets/logoBack.png")} style={styles.logoBack} />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <View style={styles.enterContainer}>
                    <Text style={styles.enterText}>Create your account</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.firstName}>
                        <TextInput
                            placeholder='Email'
                            style={styles.firstInput}
                            onChangeText={(val) => setEmail(val)}
                        />
                        <Image source={require("../assets/garisHorizontalAbu.png")} style={styles.garisHorizontal} />
                    </View>
                    <View style={styles.lastName}>
                        <TextInput
                            placeholder='Password'
                            style={styles.lastInput}
                            onChangeText={(val) => setPassword(val)}
                        />
                        <Image source={require("../assets/garisHorizontalAbu.png")} style={styles.garisHorizontal} />
                    </View>
                    <View style={styles.lastName}>
                        <TextInput
                            placeholder='Re-enter password'
                            style={styles.lastInput}
                            onChangeText={(val) => setRePassword(val)}
                        />
                        <Image source={require("../assets/garisHorizontalAbu.png")} style={styles.garisHorizontal} />
                    </View>
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer} className="mt-[90%]">
                <TouchableOpacity style={styles.nextButton} onPress={nextButtonHandle}>
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
    },
    firstName: {
        width: '90%',
    },
    lastName: {
        width: '90%',
        paddingTop: '10%',
    },
    garisHorizontal: {
        width: 0.38 * screenWidth,
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
        marginTop: 0,
        height: 58,
        justifyContent: 'center'
    },
    next: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "900",
        fontSize: 28,
        borderRadius: 5,
    },
    errorContainer: {
        paddingTop: '5%'
    },
    errorText: {
        color: 'red',
    },


})