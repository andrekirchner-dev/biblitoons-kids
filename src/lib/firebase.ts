// ── Firebase Configuration ─────────────────────────────────────────────────
// Credenciais via variáveis de ambiente (.env.local)
// Copie .env.local.example → .env.local e preencha com os valores do
// Firebase Console → Project Settings → Your apps → Web app

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

// ── Config ──────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa apenas uma vez (hot-reload safe)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);

// ── Google OAuth ────────────────────────────────────────────────────────────
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export interface AuthUser {
  uid:      string;
  email:    string;
  name:     string;
  photoURL: string | null;
}

/** Login com Google — abre popup, cria/atualiza doc em users/{uid} */
export async function signInWithGoogle(): Promise<AuthUser> {
  const result = await signInWithPopup(auth, googleProvider);
  const { uid, email, displayName, photoURL } = result.user;

  const authUser: AuthUser = {
    uid,
    email:    email ?? '',
    name:     displayName ?? '',
    photoURL: photoURL,
  };

  // Cria documento do usuário se ainda não existir
  const userRef = doc(db, 'users', uid);
  const snap    = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid,
      email:     authUser.email,
      name:      authUser.name,
      photoURL:  authUser.photoURL,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Perfil Bibloo (preenchido nas telas de onboarding)
      gender:    null,
      ageGroup:  null,
      avatar:    null,
      // Progresso
      coins:     0,
      mazeLevel: 1,
      mazeLives: 3,
      // Plano
      plan:      'free',
    });
  } else {
    // Atualiza foto/nome caso tenha mudado no Google
    await updateDoc(userRef, {
      name:      authUser.name,
      photoURL:  authUser.photoURL,
      updatedAt: serverTimestamp(),
    });
  }

  return authUser;
}

/** Logout */
export async function firebaseSignOut(): Promise<void> {
  await signOut(auth);
}

/** Observer de estado de auth — use no AuthContext */
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Re-exporta tipos úteis do Firestore para os services
export { doc, setDoc, getDoc, updateDoc, serverTimestamp };
