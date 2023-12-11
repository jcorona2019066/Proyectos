import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBezYnQXVNFgYUukL-ZnzRvxs8zDWvleJw",
  authDomain: "pruebachat-1bcc8.firebaseapp.com",
  projectId: "pruebachat-1bcc8",
  storageBucket: "pruebachat-1bcc8.appspot.com",
  messagingSenderId: "569348434307",
  appId: "1:569348434307:web:a0d3c0aa3e95b7bdb2aeb6"
  //   @deprecated is deprecated Constants.manifest
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
