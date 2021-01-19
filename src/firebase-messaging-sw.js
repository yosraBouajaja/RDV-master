importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');
 
firebase.initializeApp({
    apiKey: "AIzaSyDoqBMM5Esn-w5R3zqrGaa4BCy4Plkkl10",
    authDomain: "prdv-ce7fa.firebaseapp.com",
    projectId: "prdv-ce7fa",
    storageBucket: "prdv-ce7fa.appspot.com",
    messagingSenderId: "1019227081545",
    appId: "1:1019227081545:web:a7d45333ea3f7215c62898",
    measurementId: "G-Z7ZXP1JGB8"
});
 
const messaging = firebase.messaging();