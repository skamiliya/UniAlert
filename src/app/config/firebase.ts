// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import 'firebase/storage'
import 'firebase/database'
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined
}
 const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "unialert-e53b9.firebaseapp.com",
  projectId: "unialert-e53b9",
  databaseURL: "https://unialert-e53b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "unialert-e53b9.appspot.com",
  messagingSenderId: "112144834056",
  appId: "1:112144834056:web:c2ace3142c1146a3627bbd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);
