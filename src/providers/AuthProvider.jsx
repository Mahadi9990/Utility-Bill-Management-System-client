import React, {  useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [toggle, settoggle] = useState(true);
  const [loading, setloading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const googleSubmit =()=>{
    return signInWithPopup(auth, googleProvider)
  }
  const createUser = (email, password) => {
    setloading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const singIn = (email, password) => {
    setloading(true)
    return signInWithEmailAndPassword(auth, email, password)
  
  };
  const singOutUser =()=>{
   return signOut(auth)
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setuser(currentUser)
        setloading(false)
    });
    return ()=>{
        unSubscribe()
    }
  }, []);
    const toggleTheme = () => {
    settoggle((prev) => (prev === true ? false : true));
  };
  // const toggleTheme = () => {
  //   setLightDarkMode((prev) => (prev === "light" ? "dark" : "light"));
  // };
  const authData = {
    user,
    setuser,
    createUser,
    singIn,
    singOutUser,
    setloading,
    loading,
    googleSubmit,
    settoggle,
    toggle,
    toggleTheme
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
