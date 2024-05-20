import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ImageBackground, Image } from 'react-native';
import { db, app } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Step3Screen({ navigation }) {
    const [imagePath, setImagePath] = useState("");
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const imagePaths = {
        "Institut Teknologi Bandung - SMAN 3 Bandung": require("../assets/maps/ITBSMA3/step3.png"),
        "Institut Teknologi Bandung - SMAN 8 Bandung": require("../assets/maps/ITBSMA8/step3.png"),
        "SMAN 3 Bandung - Institut Teknologi Bandung": require("../assets/maps/SMA3ITB/step3.png"),
        "SMAN 3 Bandung - SMAN 8 Bandung": require("../assets/maps/SMA3SMA8/step3.png"),
        "SMAN 8 Bandung - Institut Teknologi Bandung": require("../assets/maps/SMA8ITB/step3.png"),
        "SMAN 8 Bandung - SMAN 3 Bandung": require("../assets/maps/SMA8SMA3/step3.png")
    };

    useEffect(() => {
        fetchImage();
    }, []);

    const fetchImage = async () => {
        const currentLog = await AsyncStorage.getItem("currentLog");
        setImagePath(currentLog);
        if (currentLog) {
            const imageUri = Image.resolveAssetSource(imagePaths[currentLog]).uri;
            Image.getSize(imageUri, (width, height) => {
                setImageSize({ width, height });
                setIsImageLoaded(true);
            });
        }
    };

    // Calculate image height based on its aspect ratio
    const imageHeight = imageSize.width ? (screenWidth * imageSize.height) / imageSize.width : 0;

    return (
        <ScrollView style={styles.screenContainer}>
            {isImageLoaded && (
                <ImageBackground source={imagePaths[imagePath]} style={[styles.image, { height: imageHeight }]} resizeMode="cover">
                    <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace("screenPaymentSuccess")}>
                        <Text style={styles.next}>Confirm payment</Text>
                    </TouchableOpacity>
                </ImageBackground>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: "#FBCC4B",
        position: 'absolute',
        bottom: 20, // atur sesuai kebutuhan
        left: '10%',
        right: '10%',
        height: 58,
        justifyContent: 'center',
        borderRadius: 10,
    },
    next: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "900",
        fontSize: 28,
        borderRadius: 5,
    }
});
