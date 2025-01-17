import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAMe7cIZj7PJFxEknVCw1e0rXmuGZY7ZSs",
    authDomain: "advent-6a5c9.firebaseapp.com",
    projectId: "advent-6a5c9",
    storageBucket: "advent-6a5c9.firebasestorage.app",
    messagingSenderId: "567135145805",
    appId: "1:567135145805:web:282a683ab96f44094ab104",
    measurementId: "G-QQJ55EHBDC"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app, "gs://advent-6a5c9.firebasestorage.app");

console.log(auth);
export { db, auth, storage};
