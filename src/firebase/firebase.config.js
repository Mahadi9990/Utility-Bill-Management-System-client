// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwXi7oSFe8JMg9o0p1u1qrGOfp61oEZow",
  authDomain: "utility-bill-management-b8ff8.firebaseapp.com",
  projectId: "utility-bill-management-b8ff8",
  storageBucket: "utility-bill-management-b8ff8.firebasestorage.app",
  messagingSenderId: "159793875511",
  appId: "1:159793875511:web:1d56a24652183c98694db2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);