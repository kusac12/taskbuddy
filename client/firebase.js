// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAli80pTPz8Tf-uWAR2fkE0BxFnlP1pYpc",
  authDomain: "testcases-8a00a.firebaseapp.com",
  projectId: "testcases-8a00a",
  storageBucket: "testcases-8a00a.appspot.com",
  messagingSenderId: "988264127300",
  appId: "1:988264127300:web:3359b9f78a5f3ffaaed511",
  measurementId: "G-P9M216VR32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();