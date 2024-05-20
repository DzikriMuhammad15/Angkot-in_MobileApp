import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground } from 'react-native';
import { Image } from "expo-image";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { db, app } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export default function Step1Screen({ navigation }) {
    const [imagePath, setImagePath] = useState("");

    const fetchImage = async () => {
        const currentLog = await AsyncStorage.getItem("currentLog");
        setImagePath(currentLog);
    }

    function countdown(seconds) {
        return new Promise((resolve, reject) => {
            if (seconds < 0) {
                return reject(new Error("Hitungan mundur harus positif"));
            }

            const intervalId = setInterval(() => {
                console.log(seconds);
                seconds--;

                if (seconds < 0) {
                    clearInterval(intervalId);
                    resolve("Hitungan mundur selesai!");
                }
            }, 1000);
        });
    }

    useEffect(() => {
        fetchImage();
        countdown(2)
            .then(message => {
                console.log(message); // Output: "Hitungan mundur selesai!"
                navigation.replace("step2Screen");
            })
            .catch(error => {
                console.error("Terjadi kesalahan:", error.message);
            });
        return () => { console.log("component unmounted") }
    }, [])

    const imagePaths = {
        "Institut Teknologi Bandung - SMAN 3 Bandung": require("../assets/maps/ITBSMA3/step1.png"),
        "Institut Teknologi Bandung - SMAN 8 Bandung": require("../assets/maps/ITBSMA8/step1.png"),
        "SMAN 3 Bandung - Institut Teknologi Bandung": require("../assets/maps/SMA3ITB/step1.png"),
        "SMAN 3 Bandung - SMAN 8 Bandung": require("../assets/maps/SMA3SMA8/step1.png"),
        "SMAN 8 Bandung - Institut Teknologi Bandung": require("../assets/maps/SMA8ITB/step1.png"),
        "SMAN 8 Bandung - SMAN 3 Bandung": require("../assets/maps/SMA8SMA3/step1.png")

    };
    return (
        <ScrollView style={styles.screenContainer}>
            {imagePath ? (
                <Image source={imagePaths[imagePath]} style={styles.image} />
            ) : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    image: {
        height: 1 * screenHeight,
        width: 1 * screenWidth
    }
})