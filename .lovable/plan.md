
# Two Fixes Implementation Plan (Updated)

## FIX 1 — AgeSelectionPage: Swap Menina Background

**File:** `src/pages/AgeSelectionPage.tsx`

**Changes:**
1. Copy `user-uploads://BG6-2.png` to `src/assets/BG6.png`
2. Update import to use BG6 instead of 5.png for menina background
3. Keep menino background (6.png) unchanged

Keep all button positions, colors, labels, and onClick logic exactly as-is.

---

## FIX 2 — HomePage: Compress Button Spacing + New BibliaFlix Image

**File:** `src/pages/HomePage.tsx`

**Image Changes:**
1. Copy `user-uploads://bibliaflix2.png` to `src/assets/bibliaflix2.png`
2. Update import: FROM `import bibliaflixImg from "@/assets/bibliaflix.png"` TO `import bibliaflixImg from "@/assets/bibliaflix2.png"`

**Layout Changes to fit 100vh without scroll:**

1. **Top bar:** `height: 44px`, `padding: 0 12px`

2. **Greeting bubble section:** 
   - `padding: 6px 12px`
   - `maxHeight: 64px`
   - Bubble font-size: `clamp(12px, 3.2vw, 15px)`
   - Sub-text font-size: `clamp(10px, 2.6vw, 12px)`
   - Bibi image: `height: 75px`

3. **Buttons section container:**
   - `gap: 6px`, `padding: 6px 12px 0 12px`

4. **Row 1 (devocional + bibliaflix):**
   - `width: 92%`, `gap: 6px`
   - Images: `maxHeight: 90px`

5. **Row 2 (ler.png):**
   - `width: 92%`
   - Image: `maxHeight: 100px`

6. **Row 3 (minigames + lojinha):**
   - `width: 92%`, `gap: 6px`
   - Images: `maxHeight: 90px`

7. **Row 4 (areadospais):**
   - `width: 92%`
   - Image: `maxHeight: 80px`

**No changes to:**
- onClick handlers
- PIN modal logic
- Overlay click zones for OT/NT
- Motion animations
