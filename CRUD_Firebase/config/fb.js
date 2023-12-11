import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBD6siSHd29_Fx9CGMDNEZlcnWuqznxuOc",
  authDomain: "crudreact-61a00.firebaseapp.com",
  projectId: "crudreact-61a00",
  storageBucket: "crudreact-61a00.appspot.com",
  messagingSenderId: "59801982976",
  appId: "1:59801982976:web:1954e0c399ea26b16520e5"
  //   @deprecated is deprecated Constants.manifest
};

// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();
