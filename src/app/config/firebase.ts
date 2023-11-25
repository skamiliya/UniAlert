// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "unialert-e53b9.firebaseapp.com",
  projectId: "unialert-e53b9",
  storageBucket: "unialert-e53b9.appspot.com",
  messagingSenderId: "112144834056",
  appId: "1:112144834056:web:c2ace3142c1146a3627bbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)