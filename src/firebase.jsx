// src/firebase.jsx
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPS3BpimTpsFHKYhkq2Ll7LrRWJ_b7svA",
  authDomain: "design-studio-9f42a.firebaseapp.com",
  projectId: "design-studio-9f42a",
  storageBucket: "design-studio-9f42a.firebasestorage.app",
  messagingSenderId: "689605692746",
  appId: "1:689605692746:web:d786f48a89d26e039d45b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Set up Google OAuth Provider
const googleProvider = new GoogleAuthProvider();

// Export Firebase services
export {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
};