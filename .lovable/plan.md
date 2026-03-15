

# Fix HomePage Layout + BottomNav Animation

## CHANGE 1 — HomePage

**File:** `src/pages/HomePage.tsx`

- Copy uploaded "Área dos Pais" image to `src/assets/areadospais.png`
- Root container: `position: fixed; inset: 0; width: 100vw; height: 100vh; overflow: hidden; display: flex; flex-direction: column`
- Top bar: 48px height
- Greeting bubble: compact, max-height ~70px
- Buttons section: `flex-col, gap: 6px, padding: 0 12px`
- **Button order change:**
  - ROW 1: `devocional.png` (LEFT) + `bibliaflix.png` (RIGHT) — gap 8px
  - ROW 2: `ler.png` full width 92% with OT/NT overlay zones preserved
  - ROW 3: `minigames.png` (LEFT) + `lojinhabibloo.png` (RIGHT) — gap 8px
  - ROW 4: `areadospais.png` full width 92%, image button with `whileTap={{ scale: 0.96 }}`, onClick triggers existing PIN modal
- Remove all scroll (`overflow-y: auto` removed, `paddingBottom: 80` removed)
- PIN modal logic and JSX preserved exactly as-is

## CHANGE 2 — BottomNav sliding circle

**File:** `src/components/BottomNav.tsx`

- Remove the top-bar 3px sliding indicator
- Add a sliding circle (`motion.div`): 48x48, border-radius 50%, `background: rgba(245,166,35,0.2)`, `border: 2px solid rgba(245,166,35,0.5)`, positioned absolutely in the nav
- Calculate circle position via `useEffect` measuring active tab ref's bounding rect, center the 48px circle on the active tab icon
- Animate with `type: 'spring', stiffness: 500, damping: 35`
- Remove the static raised white circle from center "Início" tab — the sliding circle replaces it
- Keep house.png icon at 32px, other icons at 22px
- Active/inactive opacity and glow unchanged
- Keep all other nav styles (height 64, bg #FFFBEE, border-top)

**No other pages are modified.**

