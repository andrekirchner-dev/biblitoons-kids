// ── userService.ts ─────────────────────────────────────────────────────────
// CRUD do perfil principal do usuário em Firestore: users/{uid}

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';

export interface UserProfile {
  uid:       string;
  email:     string;
  name:      string;
  photoURL:  string | null;
  gender:    'male' | 'female' | null;
  ageGroup:  string | null;   // ex: "4-6", "7-9", "10-12"
  avatar:    string | null;   // id do avatar selecionado
  plan:      'free' | 'premium';
  coins:     number;
  mazeLevel: number;
  mazeLives: number;
  createdAt: unknown;
  updatedAt: unknown;
}

function getDb() {
  return getFirestore(getApp());
}

/** Busca perfil completo do usuário */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(getDb(), 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

/** Atualiza campos parciais do perfil */
export async function updateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
): Promise<void> {
  await updateDoc(doc(getDb(), 'users', uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Salva avatar selecionado */
export async function saveAvatar(uid: string, avatarId: string): Promise<void> {
  await updateUserProfile(uid, { avatar: avatarId });
}

/** Salva gênero selecionado */
export async function saveGender(uid: string, gender: 'male' | 'female'): Promise<void> {
  await updateUserProfile(uid, { gender });
}

/** Salva faixa etária selecionada */
export async function saveAgeGroup(uid: string, ageGroup: string): Promise<void> {
  await updateUserProfile(uid, { ageGroup });
}
