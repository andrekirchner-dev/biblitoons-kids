

# Fix HomePage Visual Layout

**File:** `src/pages/HomePage.tsx`

All changes are style-only. No logic, modal, overlay, or image source changes.

## Changes

1. **Root container (line 77):** `paddingTop` default → `44px`, add `paddingBottom: 'calc(68px + env(safe-area-inset-bottom, 0px))'`

2. **Top bar (line 84):** height → `52`, padding → `0 16px`

3. **Logo (line 100):** maxHeight → `44`

4. **Coin icon (line 124):** 22×22

5. **Greeting section (line 130):** Remove `maxHeight: 64`, change padding to `4px 12px 0 12px`, gap → `8`, add `marginTop: 4`. Bubble padding → `8px 12px`, font sizes → `clamp(13px, 3.5vw, 16px)` / `clamp(10px, 2.8vw, 12px)`. Bibi height → `72px`.

6. **Buttons container (line 164):** `gap: 0`, `justifyContent: 'space-evenly'`, padding → `4px 12px`

7. **All rows:** width → `96%`, gap → `6px`. Paired images use `flex: 1` instead of `width: 46%`. Remove all fixed maxHeight values and replace with calc-based heights:
   - Row 1 & 3: `calc((100vh - 52px - 80px - 68px) * 0.22)`
   - Row 2: `calc((100vh - 52px - 80px - 68px) * 0.26)`
   - Row 4: `calc((100vh - 52px - 80px - 68px) * 0.18)`

