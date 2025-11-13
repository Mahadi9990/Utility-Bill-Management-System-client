

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCaT4HL_5bhhPV1YIU_zV28APk_-gd-pk",
  authDomain: "server-2-31130.firebaseapp.com",
  projectId: "server-2-31130",
  storageBucket: "server-2-31130.firebasestorage.app",
  messagingSenderId: "33085834590",
  appId: "1:33085834590:web:5b351b41ed29fa120b7bcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
