// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjsFXDw3L4ypa3qo0spE1Ur6H-7JE7OBs",
  authDomain: "buybusy-2-3cdcd.firebaseapp.com",
  projectId: "buybusy-2-3cdcd",
  storageBucket: "buybusy-2-3cdcd.firebasestorage.app",
  messagingSenderId: "1046453376556",
  appId: "1:1046453376556:web:90d4039edf011341ac2389",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
