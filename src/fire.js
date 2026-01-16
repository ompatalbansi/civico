// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtGF63-jeknsOSmvlOHtK16MBe2Mj8mms",
    authDomain: "web-app-82b35.firebaseapp.com",
    projectId: "web-app-82b35",
    storageBucket: "web-app-82b35.firebasestorage.app",
    messagingSenderId: "244496693490",
    appId: "1:244496693490:web:eff2daa5cad40f7b3ef86b",
    measurementId: "G-JKREJCECES"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);



// Add a new document in collection "cities"
