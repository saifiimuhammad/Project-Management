// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "projectmanagementsystem-23498.firebaseapp.com",
  projectId: "projectmanagementsystem-23498",
  storageBucket: "projectmanagementsystem-23498.firebasestorage.app",
  messagingSenderId: "191248773264",
  appId: "1:191248773264:web:c5f14a1bc434f2f313e815"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);