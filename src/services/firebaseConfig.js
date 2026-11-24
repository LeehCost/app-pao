import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjvz8OWr9dl7En7KcKLyCeiQg0VoroYlQ",
  authDomain: "app-pao-7a19e.firebaseapp.com",
  projectId: "app-pao-7a19e",
  storageBucket: "app-pao-7a19e.firebasestorage.app",
  messagingSenderId: "150636131055",
  appId: "1:150636131055:web:0c112d5319bc15720ee11a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
