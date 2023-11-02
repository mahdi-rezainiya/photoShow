import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBqnwatIzTIZUqF0gPU33Mhpe4Ew_gbiEk",
    authDomain: "opengram-site-3d475.firebaseapp.com",
    projectId: "opengram-site-3d475",
    storageBucket: "opengram-site-3d475.appspot.com",
    messagingSenderId: "557115866485",
    appId: "1:557115866485:web:3d7513fbf6c44ea2bee73c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore 
const db = getFirestore(app);
// Initialize Storage
const storage = getStorage(app);

export { db , storage}