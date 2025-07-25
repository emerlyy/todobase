// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDen4yzmnXErmE-Y_QtWo37-2brkaGR0cw",
  authDomain: "todobase-240b7.firebaseapp.com",
  projectId: "todobase-240b7",
  storageBucket: "todobase-240b7.firebasestorage.app",
  messagingSenderId: "80870309217",
  appId: "1:80870309217:web:deb88251b7476b9b6e5920",
  measurementId: "G-0XNKEBGSZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
