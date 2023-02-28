import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBrYAEpbJNL5xGy7_2h9eSbxoo5lXMDwb0",
  authDomain: "flashcards-jcp.firebaseapp.com",
  projectId: "flashcards-jcp",
  storageBucket: "flashcards-jcp.appspot.com",
  messagingSenderId: "40500052468",
  appId: "1:40500052468:web:b3b209e6bb37a7771cf9a1",
  measurementId: "G-5PY2VQ4J8J"
};

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();
  export const db = getFirestore(app);
