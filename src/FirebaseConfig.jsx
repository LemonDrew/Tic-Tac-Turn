import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBA_oWJNF0EoT5XCFokxGd94G2nJICZ0RA",
    authDomain: "tic-tac-turn-16698.firebaseapp.com",
    projectId: "tic-tac-turn-16698",
    storageBucket: "tic-tac-turn-16698.appspot.com",
    messagingSenderId: "246154029188",
    appId: "1:246154029188:web:ba237e4fbf634a6eb07ad1",
    measurementId: "G-Q9M260106E"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);