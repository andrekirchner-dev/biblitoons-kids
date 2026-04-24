// ── coinsService.ts ────────────────────────────────────────────────────────
// Gerencia BiblooCoins, progresso do labirinto e vidas em Firestore
// Coleção: users/{uid}  (campos diretos no doc do usuário)

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';

function getDb() {
  return getFirestore(getApp());
}

// ── Coins ────────────────────────────────────────────────────────────────────

export async function getCoins(uid: string): Promise<number> {
  const snap = await getDoc(doc(getDb(), 'users', uid));
  return snap.exists() ? (snap.data().coins as number) ?? 0 : 0;
}

export async function addCoins(uid: string, amount: number): Promise<void> {
  await updateDoc(doc(getDb(), 'users', uid), {
    coins: increment(amount),
    updatedAt: serverTimestamp(),
  });
}

export async function spendCoins(uid: string, amount: number): Promise<boolean> {
  const current = await getCoins(uid);
  if (current < amount) return false;
  await updateDoc(doc(getDb(), 'users', uid), {
    coins: increment(-amount),
    updatedAt: serverTimestamp(),
  });
  return true;
}

// ── Maze progress ─────────────────────────────────────────────────────────────

export interface MazeProgress {
  mazeLevel: number;
  mazeLives: number;
}

export async function getMazeProgress(uid: string): Promise<MazeProgress> {
  const snap = await getDoc(doc(getDb(), 'users', uid));
  if (!snap.exists()) return { mazeLevel: 1, mazeLives: 3 };
  const d = snap.data();
  return {
    mazeLevel: d.mazeLevel ?? 1,
    mazeLives: d.mazeLives ?? 3,
  };
}

export async function saveMazeProgress(
  uid: string,
  progress: Partial<MazeProgress>
): Promise<void> {
  await updateDoc(doc(getDb(), 'users', uid), {
    ...progress,
    updatedAt: serverTimestamp(),
  });
}

/** Compra vidas com BiblooCoins (custo: 10 coins/vida) */
export const LIFE_COST = 10;

export async function buyLife(uid: string): Promise<{ success: boolean; newLives: number; newCoins: number }> {
  const snap = await getDoc(doc(getDb(), 'users', uid));
  if (!snap.exists()) return { success: false, newLives: 3, newCoins: 0 };

  const { coins = 0, mazeLives = 3 } = snap.data();
  if (coins < LIFE_COST) return { success: false, newLives: mazeLives, newCoins: coins };

  const newCoins = coins - LIFE_COST;
  const newLives = mazeLives + 1;

  await updateDoc(doc(getDb(), 'users', uid), {
    coins: newCoins,
    mazeLives: newLives,
    updatedAt: serverTimestamp(),
  });

  return { success: true, newLives, newCoins };
}
