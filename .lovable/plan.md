

# Updated Implementation Plan

All 8 changes proceed exactly as previously planned, with one refinement to CHANGE 2:

## CHANGE 2 — WelcomePage (UPDATED)

Background positioning updated to center the Bibloo logo visually:

```css
background-image: url(...BG3.png);
background-size: cover;
background-position: 42% top;
```

- Use `background-position: center top` first, then fine-tune to `42% top` if the logo/Bibi character appears offset right on 320px–428px screens
- The 42% horizontal offset pulls the background slightly left to anchor on the Bibloo logo in the image
- All other WelcomePage specs (fixed button, no `<img>` tag, no bg animations, KGPerfectPenmanship font, clamp sizing) remain unchanged

## All other changes (1, 3–8, Global Mobile Rules) — unchanged from previous plan.

