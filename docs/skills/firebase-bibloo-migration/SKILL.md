# Skill: firebase-bibloo-migration

> Use esta skill ao trabalhar com o projeto Bibloo (React + TypeScript + Vite)
> sempre que precisar de contexto sobre a arquitetura Firebase, regras de negócio,
> deploy Vercel ou workflow VSCode + GitHub.

---

## Contexto do Projeto

**Repo:** `github.com/andrekirchner-dev/biblitoons-kids`
**Stack:** React 18 + TypeScript + Vite + Framer Motion + TailwindCSS
**Auth:** Firebase Authentication — Google OAuth (popup)
**DB:** Firestore (Cloud Firestore)
**Deploy:** Vercel (CI automático via push no `main`)
**Workflow:** VSCode + Terminal + Cowork Claude + GitHub

---

## Estrutura de Arquivos Crítica

```
src/
├── lib/
│   └── firebase.ts          ← init app, auth, db, signInWithGoogle, onAuthChange
├── contexts/
│   └── AuthContext.tsx       ← AuthProvider + useAuth() hook
├── services/firebase/
│   ├── index.ts             ← barrel export
│   ├── userService.ts       ← CRUD users/{uid}
│   ├── coinsService.ts      ← coins, mazeProgress, buyLife
│   └── siblingsService.ts   ← users/{uid}/siblings subcoleção
├── App.tsx                  ← <AuthProvider> wrapping tudo
└── pages/
    └── SignupPage.tsx        ← Google OAuth button + redirect inteligente

.env.local.example            ← template com todas VITE_FIREBASE_* vars
firestore.rules               ← security rules (owner-only)
firebase.json                 ← config para firebase deploy
```

---

## Variáveis de Ambiente

Arquivo: `.env.local` (nunca commitar — já no .gitignore via `*.local`)

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

No Vercel: Settings → Environment Variables → adiciona todas acima.

---

## Schema Firestore

### `users/{uid}` — documento principal
```typescript
{
  uid:       string,
  email:     string,
  name:      string,
  photoURL:  string | null,
  gender:    'male' | 'female' | null,
  ageGroup:  string | null,    // "4-6" | "7-9" | "10-12"
  avatar:    string | null,
  plan:      'free' | 'premium',
  coins:     number,           // BiblooCoins
  mazeLevel: number,           // 1–50
  mazeLives: number,           // default 3
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

### `users/{uid}/siblings/{siblingId}` — perfis de filhos
```typescript
{
  name:      string,
  gender:    'male' | 'female' | null,
  ageGroup:  string | null,
  avatar:    string | null,
  coins:     number,
  mazeLevel: number,
  createdAt: Timestamp,
}
```

---

## Regras de Negócio Críticas

### Autenticação
- Login APENAS via Google OAuth (popup)
- Primeiro login → cria doc `users/{uid}` automaticamente com valores padrão
- Logins seguintes → atualiza `name` e `photoURL` (podem ter mudado no Google)
- `useAuth()` devolve `{ firebaseUser, profile, loading, signOut, refreshProfile }`

### BiblooCoins
- Custo de 1 vida extra: **10 coins** (`LIFE_COST = 10` em `coinsService.ts`)
- `spendCoins()` retorna `false` se saldo insuficiente (não lança erro)
- `buyLife()` retorna `{ success, newLives, newCoins }`

### Progresso do Labirinto
- Salvo em `users/{uid}` (campos `mazeLevel` + `mazeLives`)
- Função: `saveMazeProgress(uid, { mazeLevel, mazeLives })`
- Leitura: `getMazeProgress(uid)` — fallback `{ mazeLevel: 1, mazeLives: 3 }`

### Onboarding
- Fluxo pós-login: `signup → gender → age-selection → avatar → home`
- `SignupPage` detecta usuário já logado:
  - se `profile.gender && profile.ageGroup` → vai direto para `home`
  - se não → retoma onboarding em `gender`

---

## Workflow de Desenvolvimento

### Dia a dia
```bash
# 1. Pull latest
git pull origin main

# 2. Nova feature
git checkout -b feature/nome-da-feature

# 3. Desenvolver
npm run dev  # localhost:5173

# 4. Build check antes de commitar
npm run build

# 5. Commit e push
git add src/...
git commit -m "feat: descrição"
git push origin feature/nome-da-feature

# 6. No GitHub: abrir PR → Cowork Claude faz merge via browser automation
```

### Merge (Cowork Claude faz via browser — GitHub UI bloqueia por branch protection)
```bash
git checkout main
git merge --no-ff feature/nome -m "Merge PR #N: ..."
git push https://TOKEN@github.com/andrekirchner-dev/biblitoons-kids.git main
```

---

## Deploy Vercel

- **Automático:** qualquer push no `main` dispara deploy
- **Env vars:** configurar uma vez em Vercel → Settings → Environment Variables
- **Firebase domain autorizado:** Firebase Console → Auth → Settings → Authorized domains → adicionar URL do Vercel

### Deploy das Firestore Rules
```bash
# Instalar Firebase CLI (uma vez)
npm install -g firebase-tools
firebase login

# Deploy das rules
firebase deploy --only firestore:rules
```

---

## Comandos Úteis

```bash
npm run dev          # dev server
npm run build        # build produção (verificar antes de PR)
npm run lint         # linter
npm run test         # vitest

firebase deploy --only firestore:rules  # deploy security rules
```

---

## PAT GitHub (contexto interno)
- Owner: `andrekirchner-dev`
- PAT para push: armazenado em contexto de sessão Cowork (não commitar)

---

*Criado por Xavier + Cowork Claude · 2026-04-24*
*PR #16 — feat: Firebase Auth + Firestore + Google OAuth + services layer*
