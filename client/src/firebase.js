// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-4d83f.firebaseapp.com",
  projectId: "real-estate-4d83f",
  storageBucket: "real-estate-4d83f.appspot.com",
  messagingSenderId: "1041128975417",
  appId: "1:1041128975417:web:dce3cc0185bcfc6608f1e8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);