import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOHgJam7tDEP1sPhEV7EdZ7gImCzPH0g4",
  authDomain: "sports-matching-db3be.firebaseapp.com",
  projectId: "sports-matching-db3be",
  storageBucket: "sports-matching-db3be.firebasestorage.app",
  messagingSenderId: "121542585673",
  appId: "1:121542585673:web:3e081aed15989e08fc3e98",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
