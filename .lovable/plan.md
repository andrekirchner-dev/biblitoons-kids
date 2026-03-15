# Apply ALL the following fixes to HomePage.tsx and AgeSelectionPage.tsx only.

Do not change any other page, logic, modal, or image source.

═══════════════════════════════════════

FIX 1 — AgeSelectionPage backgrounds

═══════════════════════════════════════

File: src/pages/AgeSelectionPage.tsx

- Copy BG5.png to src/assets/BG5.png

- Copy BG6.png to src/assets/BG6.png (overwrite existing)

- Update imports:

    import bgMenina from "@/assets/BG5.png"

    import bgMenino from "@/assets/BG6.png"

- When gender === "menina": backgroundImage: `url(${bgMenina})`

- When gender === "menino": backgroundImage: `url(${bgMenino})`

Keep all button positions, colors, labels, and onClick logic exactly as-is.

═══════════════════════════════════════

FIX 2 — HomePage: button row sizing

═══════════════════════════════════════

File: src/pages/HomePage.tsx

Row 2 (ler.png) — make larger:

  FROM: calc((100vh - 52px - 80px - 68px) * 0.26)

  TO:   calc((100vh - 52px - 80px - 68px) * 0.32)

  border-radius: 14px

Rows 1 & 3 (devocional, bibliaflix, minigames, lojinha) — reduce slightly:

  FROM: calc((100vh - 52px - 80px - 68px) * 0.22)

  TO:   calc((100vh - 52px - 80px - 68px) * 0.19)

Row 4 (areadospais) — unchanged:

  calc((100vh - 52px - 80px - 68px) * 0.18)

Keep OT/NT overlay zones, onClick logic, and all other styles exactly as-is.

═══════════════════════════════════════

FIX 3 — HomePage: lower top bar position

═══════════════════════════════════════

File: src/pages/HomePage.tsx

Root container:

  FROM: paddingTop: 'env(safe-area-inset-top, 44px)'

  TO:   paddingTop: 'env(safe-area-inset-top, 56px)'

Top bar div:

  ADD: marginTop: 8px

═══════════════════════════════════════

FIX 4 — HomePage: greeting bubble closer to Bibi

═══════════════════════════════════════

File: src/pages/HomePage.tsx

GREETING ROW container:

  align-items: flex-end;

  gap: 0;

BUBBLE:

  flex: 0 0 62%;

  margin-right: -12px;

  z-index: 2;

BIBI image:

  flex: 0 0 38%;

  height: 78px;

  margin-left: 0;

  margin-bottom: -4px;

  z-index: 1;

Do not change font sizes, colors, text content, or any other element.