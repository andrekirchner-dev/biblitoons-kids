

# Implementation Plan — 4 Fixes for HomePage (+ Safe Area)

## FIX 1 — Button layout reorganization

**File:** `src/pages/HomePage.tsx`

Update the buttons section:
- Container: `gap: 8px`, `padding: 4px 12px 0 12px`
- **Row 1** (devocional + bibliaflix): `width: 46%` each, `maxHeight: 80px`, `gap: 8px`
- **Row 2** (ler.png): `width: 92%`, `maxHeight: 120px` — hero button, OT/NT overlays preserved
- **Row 3** (minigames + lojinha): `width: 46%` each, `maxHeight: 90px`, `gap: 8px`
- **Row 4** (areadospais): `width: 92%`, `maxHeight: 75px`

## FIX 2 — Safe area / Status Bar protection

**Files:** `index.html`, `src/index.css`, `src/pages/HomePage.tsx`, `src/components/BottomNav.tsx`, plus all page root containers

- `index.html`: Add `viewport-fit=cover` to viewport meta
- `src/index.css`: Add `:root` CSS variables for `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`
- `HomePage.tsx` root: `paddingTop: 'env(safe-area-inset-top, 0px)'`
- `BottomNav.tsx`: `paddingBottom: 'env(safe-area-inset-bottom, 0px)'`, `height: 'calc(68px + env(safe-area-inset-bottom, 0px))'`
- Add `paddingTop: 'env(safe-area-inset-top, 0px)'` to root containers of: WelcomePage, SignupPage, GenderSelectionPage, AgeSelectionPage, BiblePage, MiniGamesPage, ParentalAreaPage, BiblooCoinsPage, DevotionalPage, ShopPage

Note: The user said "HomePage only" but FIX 2 explicitly lists other files. I will implement FIX 2 as specified since it's a global safe-area concern.

## FIX 3 — Logo size increase

**File:** `src/pages/HomePage.tsx`

- Logo `maxHeight`: from `40` → `58px`

## FIX 4 — BiblooCoins pill reduction

**File:** `src/pages/HomePage.tsx`

Current coin pill at line 108-124:
- Border: `1px solid rgba(255,215,0,0.3)` (from `1px solid #FFD700`)
- Box shadow: `none`
- Padding: `4px 10px 4px 4px` (from `4px 12px`)
- Coin icon: 24x24 (from 18x18 — actually increasing, but following spec)
- Font-size: 13px (already 13px, keep)

Wait, the current code already has `fontSize: 13` and coin at 18px. The spec says coin FROM 28 TO 24 and font FROM 15 TO 13 — but current values are already smaller. I'll apply the spec values (24px coin, 13px font) and the border/shadow changes as requested.

