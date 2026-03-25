// ── Firebase Configuration ──────────────────────────────────────────────────
// IMPORTANT: Replace with your actual Firebase project config from Firebase Console
// https://console.firebase.google.com → Project Settings → Your Apps → Web App

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_REPLACE_WITH_YOUR_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:your-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.addScope('email');
googleProvider.addScope('profile');

export async function signInWithGoogle(): Promise<{ email: string; name: string; photoURL: string | null }> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  return {
    email: user.email ?? '',
    name: user.displayName ?? '',
    photoURL: user.photoURL,
  };
}
