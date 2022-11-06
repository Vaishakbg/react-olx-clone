// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ09QvSr2wFoFBgzewN06pru1sTofDdho",
  authDomain: "olx-clone-922c0.firebaseapp.com",
  projectId: "olx-clone-922c0",
  storageBucket: "olx-clone-922c0.appspot.com",
  messagingSenderId: "756443175697",
  appId: "1:756443175697:web:5c2c236fd4133366608ab0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase = getFirestore(app);
export const storage = getStorage(app);