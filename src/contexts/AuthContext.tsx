// ── AuthContext.tsx ────────────────────────────────────────────────────────
// Contexto global de autenticação Firebase.
// Wraps toda a app — fornece: currentUser, authUser, loading, signOut

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { type User } from 'firebase/auth';
import { onAuthChange, firebaseSignOut, type AuthUser } from '@/lib/firebase';
import { getUserProfile, type UserProfile } from '@/services/firebase/userService';

interface AuthContextValue {
  /** Firebase raw User object (ou null se não logado) */
  firebaseUser: User | null;
  /** Perfil completo do Firestore (ou null) */
  profile: UserProfile | null;
  /** true enquanto verifica o estado inicial de auth */
  loading: boolean;
  /** Faz logout */
  signOut: () => Promise<void>;
  /** Recarrega o perfil do Firestore (chame após atualizações) */
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profile,      setProfile]      = useState<UserProfile | null>(null);
  const [loading,      setLoading]      = useState(true);

  const loadProfile = async (user: User) => {
    const p = await getUserProfile(user.uid);
    setProfile(p);
  };

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      setFirebaseUser(user);
      if (user) {
        await loadProfile(user);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await firebaseSignOut();
    setFirebaseUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (firebaseUser) await loadProfile(firebaseUser);
  };

  return (
    <AuthContext.Provider
      value={{ firebaseUser, profile, loading, signOut: handleSignOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Hook para usar o contexto de autenticação em qualquer componente */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
