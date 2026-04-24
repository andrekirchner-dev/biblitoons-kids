// ── siblingsService.ts ─────────────────────────────────────────────────────
// Gerencia perfis de filhos/irmãos vinculados à conta do usuário
// Coleção: users/{uid}/siblings/{siblingId}

import {
  getFirestore,
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';

export interface Sibling {
  id:       string;   // Firestore doc ID
  name:     string;
  gender:   'male' | 'female' | null;
  ageGroup: string | null;
  avatar:   string | null;
  coins:    number;
  mazeLevel: number;
  createdAt: unknown;
}

function siblingsCol(uid: string) {
  return collection(getFirestore(getApp()), 'users', uid, 'siblings');
}

function siblingDoc(uid: string, siblingId: string) {
  return doc(getFirestore(getApp()), 'users', uid, 'siblings', siblingId);
}

/** Lista todos os filhos/irmãos do usuário */
export async function getSiblings(uid: string): Promise<Sibling[]> {
  const snap = await getDocs(siblingsCol(uid));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Sibling));
}

/** Adiciona novo perfil de filho/irmão */
export async function addSibling(
  uid: string,
  data: Omit<Sibling, 'id' | 'createdAt'>
): Promise<string> {
  const ref = await addDoc(siblingsCol(uid), {
    ...data,
    coins:     data.coins    ?? 0,
    mazeLevel: data.mazeLevel ?? 1,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Atualiza dados de um filho/irmão */
export async function updateSibling(
  uid: string,
  siblingId: string,
  data: Partial<Omit<Sibling, 'id' | 'createdAt'>>
): Promise<void> {
  await updateDoc(siblingDoc(uid, siblingId), data);
}

/** Remove perfil de filho/irmão */
export async function removeSibling(uid: string, siblingId: string): Promise<void> {
  await deleteDoc(siblingDoc(uid, siblingId));
}
