

# Implementation Plan — All 5 Changes (Final)

All assets are now available. Here is the complete plan ready for implementation.

## Assets to copy to `src/assets/`

From previous uploads: `BG4.png`, `suadacaoBibi.png`, `bibiHomepage.png`, `coinbibloo.png`, `devocional.png`, `minigames.png`, `ler.png`, `bibliaflix.png`, `lojinhabibloo.png`

From this upload: `frameHi.png` (reference only), `LogoApp1-3.png` (new logo), `bible.png`, `game.png`, `house.png`, `play.png`, `search.png`

---

## CHANGE 1 — WelcomePage rebuild

Rewrite `WelcomePage.tsx` as a 4-layer fixed layout:
- **Root**: `position: fixed; inset: 0; width: 100vw; height: 100vh; overflow: hidden; background: none`
- **Layer 1**: absolute div, `backgroundImage: BG4.png`, cover, center top, no-repeat, z-index 0
- **Layer 2**: `LogoApp1-3.png` img, absolute, top 5%, centered, width 70%, maxWidth 280px, z-index 2
- **Layer 3**: `suadacaoBibi.png` img, absolute, top 28%, centered, width 85%, maxWidth 340px, z-index 2
- **Layer 4**: button "VAMOS COMEÇAR! →", absolute, bottom 48px, centered via left:0 right:0 margin:auto, gold style, z-index 3
- onClick → `onNavigate("login")`

No speech bubble, no motion wrappers on root.

---

## CHANGE 2 — Age button labels + colors

Edit `AgeSelectionPage.tsx`:
- Labels: **"3-4 anos"**, **"5-9 anos"**, **"10-12 anos"**
- Menina: `#F56FBD/#C44A96`, `#EF13AB/#B00C80`, `#7400A3/#4D006B`
- Menino: `#4A90D9/#2B65A8`, `#4900EF/#3100A0`, `#2736E5/#1A22A0`
- Gender-conditional via `const colors = gender === "menina" ? meninaColors : meninoColors`

## CHANGE 3 — Fix center button drift

For the center "5-9 anos" button, use framer-motion `x` prop instead of CSS transform:
```tsx
<motion.button
  style={{ ...buttonBase, left: '50%', bottom: '12%' }}
  initial={{ x: '-50%' }}
  whileTap={{ scale: 0.95, x: '-50%' }}
>
```
This prevents framer-motion from overriding translateX on tap. Apply same pattern for left/right buttons if needed.

---

## CHANGE 4 — HomePage updates

### 4.1 — Dynamic greeting + Bibi
- Time-based greeting: `BOM DIA` (6-12), `BOA TARDE` (13-18), `BOA NOITE` (else)
- Gender-based name from AppShell via new `gender` prop (menina→"Maria", menino→"João")
- Replace `bibi-mascot.png` with `bibiHomepage.png` (100px height)

### 4.2 — Image-only buttons (PIN preserved)
Replace all `stdBtn` text buttons with image-only buttons:
- **ROW 1**: flex row, ~46% each, gap 10px — `devocional.png` → devotional, `minigames.png` → miniGames
- **ROW 2**: full width 92% — `ler.png` with two transparent overlay zones (absolute, bottom 0, 50% width, 35% height) for OT/NT
- **ROW 3**: flex row — `bibliaflix.png` → bibliaflix, `lojinhabibloo.png` → shop
- **Below**: small underlined "🔒 Área dos Pais" text link → triggers existing PIN modal
- All existing PIN modal JSX and state logic preserved exactly as-is

### 4.3 — BiblooCoins counter
Replace emoji coin counter with `coinbibloo.png` in dark pill: `rgba(0,0,0,0.55)` bg, gold border, "27" in `#FFD700`, onClick → `biblooCoins`

Create `BiblooCoinsPage.tsx`: back button with yellow glow, title, large coin, total, placeholder sections.

### 4.4 — Yellow outglow on back/menu buttons
Apply to hamburger and all back buttons:
```css
filter: drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))
```
Standard back button: absolute, top 16px, left 16px, 44x44, white circle bg, ChevronLeft white.

Add `onNavigate` prop + back button to: `DevotionalPage`, `ShopPage`. Add glow to existing buttons on: `BiblePage`, `MiniGamesPage`, `ParentalAreaPage`.

---

## CHANGE 5 — BottomNav custom image icons

Replace lucide icons with uploaded PNGs: `play.png`, `bible.png`, `house.png`, `game.png`, `search.png`

Tab config: BibliaFlix(play.png) | Bíblia(bible.png) | Início(house.png, raised) | Mini-games(game.png) | Buscar(search.png)

Icons as `<img>`, active: opacity 1 + yellow glow, inactive: opacity 0.45. Labels: KGPerfectPenmanship, active `#F5A623`, inactive `#9CA3AF`. Keep sliding indicator.

---

## AppShell updates

- Add `login` case → renders `SignupPage`
- Add `biblooCoins` case → `BiblooCoinsPage`
- Pass `gender` prop to `HomePage`
- Update `showNavPages`: replace `"stories"` with `"miniGames"`

## Files summary

| Action | File |
|--------|------|
| Copy | 16 images → `src/assets/` |
| Rewrite | `src/pages/WelcomePage.tsx` |
| Edit | `src/pages/AgeSelectionPage.tsx` |
| Rewrite | `src/pages/HomePage.tsx` |
| Create | `src/pages/BiblooCoinsPage.tsx` |
| Edit | `src/pages/DevotionalPage.tsx` |
| Edit | `src/pages/ShopPage.tsx` |
| Edit | `src/pages/MiniGamesPage.tsx` |
| Edit | `src/pages/ParentalAreaPage.tsx` |
| Edit | `src/pages/BiblePage.tsx` |
| Rewrite | `src/components/BottomNav.tsx` |
| Edit | `src/components/AppShell.tsx` |

