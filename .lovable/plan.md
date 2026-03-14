```text
┌─────────────────────────────────────────────────────────────────┐
│                    PLANO DE IMPLEMENTAÇÃO                       │
│              Gender + Age Selection + Signup Fixes              │
└─────────────────────────────────────────────────────────────────┘

1. ADICIONAR ASSETS (Imagens de Referência)
   └─► Copiar Frame_Menina.png e FrameMenino.png para src/assets/
   └─► Copiar Holidays_Homework.ttf para src/assets/fonts/

2. AJUSTAR SIGNUPPAGE (src/pages/SignupPage.tsx)
   ├─► Título "CRIE SUA CONTA": remover fundo/borda/sombra → transparente
   ├─► Importar e aplicar fonte Holidays_Homework.ttf no título
   ├─► Centralizar ícone + texto do botão Google (flex, justify-center, gap-2)
   └─► Adicionar divisor "ou" entre Google e inputs

3. CRIAR GENDERSELECTIONPAGE (src/pages/GenderSelectionPage.tsx)
   ├─► Logo Bibloo (LogoApp1.png) no topo
   ├─► Balão de fala estilo pergaminho: "Você é menina ou menino?"
   ├─► Duas colunas: Frame_Menina.png (esquerda) e FrameMenino.png (direita)
   ├─► Botão "Menina" (rosa #EC4899) com efeito jelly
   └─► Botão "Menino" (azul #3B82F6) com efeito jelly
   └─► Animar entrada sequencial (logo → balão → personagens → botões)

4. CRIAR AGESELECTIONPAGE (src/pages/AgeSelectionPage.tsx)
   ├─► Props: gender ('menina' | 'menino') para definir background
   ├─► Background:BG1.png (full cover)
   ├─► Logo no topo (menor, posição absoluta)
   ├─► Balão de fala: "Qual sua idade?"
   ├─► 3 cards horizontais:
   │   ├─► 3-5 anos: verde (#4CAF50), criança com cordeiro/toy
   │   ├─► 6-10 anos: laranja (#FF9800), criança com lupa
   │   └─► 10-12 anos: azul (#2196F3), criança com livro
   ├─► Cada card: ilustração acima + botão colorido abaixo
   ├─► Botões de navegação na base:
   │   ├─► "Voltar" (pergaminho, esquerda) → volta para Gender
   │   └─► "Continuar" (dourado, direita) → vai para Home

5. ATUALIZAR APPSHELL (src/components/AppShell.tsx)
   ├─► Adicionar estados: gender, age
   ├─► Adicionar páginas ao switch: gender, age
   └─► Fluxo: signup → gender → age → home
   └─► Passar props de navegação com estado entre telas

6. ATUALIZAR INDEX.CSS (src/index.css)
   └─► Adicionar @font-face para Holidays_Homework.ttf

ESTRUTURA DE FLUXO:
SplashScreen → SignupPage → GenderSelectionPage → AgeSelectionPage → HomePage

OBSERVAÇÕES:
- Manter efeito jelly nos botões principais
- Usar animações staggered (framer-motion) para entrada
- Manter consistência visual com papel antigo/pergaminho
- Backgrounds específicos por gênero na tela de idade
```