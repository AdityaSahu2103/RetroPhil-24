// src/pages/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDLJoLIlLvs_3TsJ4qnPNxcUCDXQSYXpo0",
    authDomain: "retrophil-9113a.firebaseapp.com",
    projectId: "retrophil-9113a",
    storageBucket: "retrophil-9113a.appspot.com",
    messagingSenderId: "908409427580",
    appId: "1:908409427580:web:b3b9b3488fadd35a7ddbf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };
