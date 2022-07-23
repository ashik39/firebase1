import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: "first-firebase-4a0aa.firebaseapp.com",
    projectId: "first-firebase-4a0aa",
    storageBucket: "first-firebase-4a0aa.appspot.com",
    messagingSenderId: "371760413939",
    appId: "1:371760413939:web:511148520b795fc334cb86",
    measurementId: "G-L5DTJXE920"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

