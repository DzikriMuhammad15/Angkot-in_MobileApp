import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { Image } from "expo-image";
import { db } from "../firebaseConfig";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('screen').height;
const screenHeight = Dimensions.get('screen').width;

const usersRef = collection(db, "users");


export default function PaymentMethodScreen({ navigation }) {
    const [paymentMethos, setPaymentMethod] = useState("");
    const [navigationTrigger, setNavigationTrigger] = useState(false);

    const updateCreateUser = async () => {
        try {

            const email = JSON.parse(await AsyncStorage.getItem('createUser')).email;
            const q = query(usersRef, where("email", "==", email));
            const querySnapshoot = await getDocs(q);
            querySnapshoot.forEach(async (docSnapshoot) => {
                const usersRef = doc(db, "users", docSnapshoot.id);
                const updatedUser = {
                    paymentMethod: [paymentMethos]
                }
                await updateDoc(usersRef, updatedUser);
                console.log(paymentMethos);
            })
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (navigationTrigger) {
            // todo update firebase createUser payment methodenya
            updateCreateUser();
            // todo navigate to home1
            navigation.replace('home1');
            setNavigationTrigger(false);
        }
        return () => {
            console.log("component unmounted");
        }
    }, [navigationTrigger])

    const gotoHome = () => {
        navigation.replace('home1');
    }

    const setCredit = () => {
        setPaymentMethod('credit/debit');
        setNavigationTrigger(true);
    }
    const setDana = () => {
        setPaymentMethod('dana');
        setNavigationTrigger(true);
    }
    const cash = () => {
        setPaymentMethod('cash');
        setNavigationTrigger(true);
    }

    return (
        <ScrollView style={styles.screenContainer}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.doThisLaterContainer} onPress={gotoHome}>
                    <Text style={styles.doThisLater}>DO THIS LATER</Text>
                </TouchableOpacity>
                <View style={styles.pilihanContainer}>
                    <View style={styles.selectContainer}>
                        <Text style={styles.select}>
                            Select your prefered payment method
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.creditCardContainer} onPress={setCredit}>
                        <Image source={require('../assets/logoCredits.png')} style={styles.logoCreditCard} />
                        <Text style={styles.pilihanPayment}>Credit or Debit Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.danaContainer} onPress={setDana}>
                        <Image source={require('../assets/logoDana.png')} style={styles.danaLogo} />
                        <Text style={styles.pilihanPayment}>Dana</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cashContainer} onPress={cash}>
                        <Image source={require('../assets/logoCash.png')} style={styles.logoCreditCard} />
                        <Text style={styles.pilihanPayment}>Cash</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    },
    doThisLaterContainer: {
        paddingHorizontal: '10%',
        alignItems: 'flex-end',
    },
    doThisLater: {
        fontSize: 20,
        color: 'blue',

    },
    contentContainer: {
        paddingTop: '10%',
    },
    pilihanContainer: {
        paddingHorizontal: '10%',
    },
    selectContainer: {
        paddingTop: '8%'
    },
    select: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
    },
    creditCardContainer: {
        paddingTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoCreditCard: {
        height: 0.06 * screenWidth,
        width: 0.06 * screenWidth
    },
    pilihanPayment: {
        paddingLeft: '6%',
        fontSize: 18,
        fontWeight: '500',
    },
    danaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '7%',
    },
    danaLogo: {
        height: 0.07 * screenWidth,
        width: 0.06 * screenWidth
    },
    cashContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '7%',
    }



})