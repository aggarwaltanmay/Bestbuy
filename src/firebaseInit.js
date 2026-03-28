import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALzKLqE4vZg0u0V7ITno0Z5NfzX3UNz9E",
    authDomain: "bestbuy-1-fd9b6.firebaseapp.com",
    projectId: "bestbuy-1-fd9b6",
    storageBucket: "bestbuy-1-fd9b6.firebasestorage.app",
    messagingSenderId: "612867420039",
    appId: "1:612867420039:web:7bfd8806ca2628cb44ed22",
    measurementId: "G-LPRYJH9CYZ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need


// Initialize Firebase
const analytics = getAnalytics(app);