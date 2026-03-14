

# Updated Implementation Plan

All 5 changes remain as previously planned, with CHANGE 3's AgeSelectionPage section updated as follows:

---

## CHANGE 3 — AgeSelectionPage (UPDATED)

**Rewrite** `src/pages/AgeSelectionPage.tsx`:

- Replace `FrameMenina`/`FrameMenino` imports with `5.png`/`6.png`
- Remove ALL content: logo, speech bubble, age card grid, Voltar/Continuar buttons
- Full-screen layout: `position: relative; width: 100%; height: 100vh; overflow: hidden`
- Background `<img>` with `5.png` (menina) or `6.png` (menino), `object-fit: cover`, `object-position: center top`, filling viewport
- Three absolutely positioned buttons directly over the background:

```text
┌─────────────────────────────────┐
│         (background image)       │
│                                  │
│   [char1]   [char2]   [char3]   │
│  ┌───────┐ ┌───────┐ ┌───────┐ │
│  │ 3-5   │ │ 6-10  │ │10-12  │ │  ← bottom: 12%
│  │ anos  │ │ anos  │ │ anos  │ │
│  └───────┘ └───────┘ └───────┘ │
│  left:8%    center    right:8%  │
└─────────────────────────────────┘
```

- **"3-5 anos"**: `absolute; left: 8%; bottom: 12%; bg: #4CAF50; border-bottom: 4px solid #2E7D32; width: 26%; border-radius: 12px; padding: 10px 0; font-size: 16px; white bold; text-align: center`
- **"6-10 anos"**: `absolute; left: 50%; transform: translateX(-50%); bottom: 12%; bg: #FF8C00; border-bottom: 4px solid #CC6600; width: 26%; same styling`
- **"10-12 anos"**: `absolute; right: 8%; bottom: 12%; bg: #4A90D9; border-bottom: 4px solid #2B65A8; width: 26%; same styling`
- Each button on click: calls `onSelectAge(label)` then `onNavigate("home")` directly (no Continuar step)
- Keep `whileTap` jelly animation on buttons

## All other changes (1, 2, 4, 5) — unchanged from previous plan.

