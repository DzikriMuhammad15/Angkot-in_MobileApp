const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyDJLiTPfphTJp3OooqITfcorNPeZ3arqVQ",
    authDomain: "angkot-in.firebaseapp.com",
    projectId: "angkot-in",
    storageBucket: "angkot-in.appspot.com",
    messagingSenderId: "156023984055",
    appId: "1:156023984055:web:a7494bfaf1f09ba3846232",
    measurementId: "G-XE5VKFHMP4"
};

const app = initializeApp(firebaseConfig);
module.exports = app;