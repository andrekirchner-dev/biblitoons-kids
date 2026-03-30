import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import coinbibloo from "@/assets/coinbibloo.png";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Cell {
  walls: [boolean, boolean, boolean, boolean]; // N E S W
}
type MazeGrid = Cell[][];
type ItemType = "heart" | "compass" | "water" | "trap";
type GameState = "playing" | "levelComplete" | "gameOver" | "victory" | "buyLives";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const DR = [-1, 0, 1, 0]; // N E S W row deltas
const DC = [0, 1, 0, -1]; // N E S W col deltas
const OPP = [2, 3, 0, 1]; // Opposite directions
const LIVES_COST = 50; // BiblooCoins per life
const MAX_LIVES = 3;
const ITEM_EMOJI: Record<ItemType, string> = {
  heart: "❤️",
  compass: "🧭",
  water: "💧",
  trap: "🌵",
};

function getMazeSize(level: number): [number, number] {
  if (level <= 10) return [5, 5];
  if (level <= 20) return [7, 7];
  if (level <= 30) return [9, 9];
  if (level <= 40) return [11, 11];
  return [13, 13];
}

function getTimeLimit(level: number): number {
  if (level <= 10) return 75;
  if (level <= 20) return 100;
  if (level <= 30) return 130;
  if (level <= 40) return 160;
  return 200;
}

/* ─────────────────────────────────────────
   SEEDED RANDOM (mulberry32)
───────────────────────────────────────── */
function mkRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s ^ (s >>> 15), s | 1) >>> 0);
    s = (s ^ (s + Math.imul(s ^ (s >>> 7), s | 61))) >>> 0;
    return ((s ^ (s >>> 14)) >>> 0) / 0x100000000;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─────────────────────────────────────────
   MAZE GENERATION (recursive backtracking)
───────────────────────────────────────── */
function generateMaze(rows: number, cols: number, seed: number): MazeGrid {
  const grid: MazeGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      walls: [true, true, true, true] as [boolean, boolean, boolean, boolean],
    }))
  );
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const rng = mkRng(seed);

  // Use an explicit stack to avoid recursion limit on large mazes
  const stack: [number, number][] = [[0, 0]];
  visited[0][0] = true;

  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    const dirs = shuffle([0, 1, 2, 3], rng);
    let moved = false;

    for (const d of dirs) {
      const nr = r + DR[d];
      const nc = c + DC[d];
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        grid[r][c].walls[d] = false;
        grid[nr][nc].walls[OPP[d]] = false;
        visited[nr][nc] = true;
        stack.push([nr, nc]);
        moved = true;
        break;
      }
    }
    if (!moved) stack.pop();
  }

  return grid;
}

/* ─────────────────────────────────────────
   BFS PATH FINDER (for compass power-up)
───────────────────────────────────────── */
function bfsPath(
  grid: MazeGrid,
  rows: number,
  cols: number,
  startR: number,
  startC: number
): Set<string> {
  const end = `${rows - 1},${cols - 1}`;
  const queue: [[number, number], string[]][] = [[[startR, startC], [`${startR},${startC}`]]];
  const visited = new Set<string>([`${startR},${startC}`]);

  while (queue.length > 0) {
    const [[r, c], path] = queue.shift()!;
    if (`${r},${c}` === end) return new Set(path);

    for (let d = 0; d < 4; d++) {
      if (grid[r][c].walls[d]) continue;
      const nr = r + DR[d];
      const nc = c + DC[d];
      const key = `${nr},${nc}`;
      if (!visited.has(key)) {
        visited.add(key);
        queue.push([[nr, nc], [...path, key]]);
      }
    }
  }
  return new Set();
}

/* ─────────────────────────────────────────
   ITEM PLACEMENT
   Traps (🌵) are NEVER placed on the BFS
   solution path so no level is ever blocked.
───────────────────────────────────────── */
function placeItems(
  rows: number,
  cols: number,
  seed: number,
  solutionPath: Set<string>
): Map<string, ItemType> {
  const rng = mkRng(seed);
  const map = new Map<string, ItemType>();
  const pathCells: string[] = [];   // cells ON the solution path  → only beneficial items
  const offCells: string[] = [];    // cells OFF the solution path → any item incl. traps

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r},${c}`;
      if (key === "0,0") continue;                          // skip start
      if (r === rows - 1 && c === cols - 1) continue;      // skip exit
      if (solutionPath.has(key)) pathCells.push(key);
      else offCells.push(key);
    }
  }

  const numItems = Math.max(3, Math.floor((pathCells.length + offCells.length) * 0.10));
  const shuffledPath = shuffle(pathCells, rng);
  const shuffledOff  = shuffle(offCells,  rng);

  // Place ~30 % of items on path (only beneficial), rest off-path (may be traps)
  const onPathCount = Math.min(Math.floor(numItems * 0.30), shuffledPath.length);
  const offCount    = Math.min(numItems - onPathCount, shuffledOff.length);

  for (let i = 0; i < onPathCount; i++) {
    const roll = rng();
    let type: ItemType;
    if (roll < 0.45) type = "heart";
    else if (roll < 0.75) type = "compass";
    else type = "water";
    map.set(shuffledPath[i], type);
  }

  for (let i = 0; i < offCount; i++) {
    const roll = rng();
    let type: ItemType;
    if (roll < 0.22) type = "heart";
    else if (roll < 0.40) type = "compass";
    else if (roll < 0.55) type = "water";
    else type = "trap";                  // traps only off the critical path
    map.set(shuffledOff[i], type);
  }

  return map;
}

/* ─────────────────────────────────────────
   PERSISTENCE
───────────────────────────────────────── */
const SAVE_KEY = "bibloo_maze_v1";

interface SaveData {
  level: number;
  lives: number;
}

function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) return JSON.parse(raw) as SaveData;
  } catch { /* ignore */ }
  return { level: 1, lives: MAX_LIVES };
}

function writeSave(d: SaveData) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); } catch { /* ignore */ }
}

function loadCoins(): number {
  return parseInt(localStorage.getItem("bibloo_coins") || "27", 10);
}
function saveCoins(n: number) {
  localStorage.setItem("bibloo_coins", String(n));
}

/* ─────────────────────────────────────────
   CELL SIZE
───────────────────────────────────────── */
function cellSize(rows: number): number {
  const available = Math.min(window.innerWidth - 32, 380);
  return Math.floor(available / rows);
}

/* ─────────────────────────────────────────
   COMPONENT PROPS
───────────────────────────────────────── */
interface MazeGameProps {
  onNavigate: (page: string) => void;
}

/* ─────────────────────────────────────────
   MAIN GAME COMPONENT
───────────────────────────────────────── */
const MazeGame = ({ onNavigate }: MazeGameProps) => {
  const initSave = useMemo(loadSave, []);
  const [level, setLevel] = useState(initSave.level);
  const [lives, setLives] = useState(initSave.lives);
  const [coins, setCoins] = useState(loadCoins);
  const [gameState, setGameState] = useState<GameState>("playing");

  const [rows, cols] = getMazeSize(level);
  const cs = cellSize(rows);

  // Deterministic maze + items per level
  const maze = useMemo(() => generateMaze(rows, cols, level * 1337 + 42), [level, rows, cols]);

  // Compute the canonical solution path so we can keep traps OFF it
  const solutionPath = useMemo(
    () => bfsPath(maze, rows, cols, 0, 0),
    [maze, rows, cols]
  );

  const levelItems = useMemo(
    () => placeItems(rows, cols, level * 7919 + 13, solutionPath),
    [level, rows, cols, solutionPath]
  );

  const [playerPos, setPlayerPos] = useState<[number, number]>([0, 0]);
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [compassPath, setCompassPath] = useState<Set<string> | null>(null);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLimit(level));
  const [hitFlash, setHitFlash] = useState(false);
  const [lastItem, setLastItem] = useState<{ type: ItemType; key: string } | null>(null);

  const compassTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Timer ──────────────────────────────
  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      loseLife("time");
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  });

  // ── Reset transient state when level changes ──
  useEffect(() => {
    setPlayerPos([0, 0]);
    setCollected(new Set());
    setCompassPath(null);
    setTimeLeft(getTimeLimit(level));
    setGameState("playing");
  }, [level]);

  // ── Persist on important changes ──
  useEffect(() => {
    writeSave({ level, lives });
  }, [level, lives]);

  // ── Lose a life ──
  const loseLife = useCallback(
    (reason: "time" | "trap") => {
      void reason;
      setHitFlash(true);
      setTimeout(() => setHitFlash(false), 600);

      setLives((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setGameState("gameOver");
          writeSave({ level, lives: 0 });
        } else {
          writeSave({ level, lives: next });
          // reset level
          setPlayerPos([0, 0]);
          setCollected(new Set());
          setCompassPath(null);
          setTimeLeft(getTimeLimit(level));
        }
        return Math.max(0, next);
      });
    },
    [level]
  );

  // ── Move player ──
  const movePlayer = useCallback(
    (dir: number) => {
      if (gameState !== "playing") return;

      setPlayerPos(([r, c]) => {
        if (maze[r][c].walls[dir]) return [r, c]; // wall
        const nr = r + DR[dir];
        const nc = c + DC[dir];
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return [r, c];

        const key = `${nr},${nc}`;

        // Handle item pickup
        if (levelItems.has(key) && !collected.has(key)) {
          const item = levelItems.get(key)!;
          setCollected((prev) => new Set([...prev, key]));
          setLastItem({ type: item, key });
          setTimeout(() => setLastItem(null), 1500);

          if (item === "heart") {
            setLives((v) => Math.min(MAX_LIVES, v + 1));
          } else if (item === "compass") {
            if (compassTimerRef.current) clearTimeout(compassTimerRef.current);
            const path = bfsPath(maze, rows, cols, nr, nc);
            setCompassPath(path);
            compassTimerRef.current = setTimeout(() => setCompassPath(null), 4000);
          } else if (item === "water") {
            setTimeLeft((v) => v + 30);
          } else if (item === "trap") {
            // schedule life loss after state update
            setTimeout(() => loseLife("trap"), 0);
            return [nr, nc];
          }
        }

        // Check for victory (exit = bottom-right cell)
        if (nr === rows - 1 && nc === cols - 1) {
          if (level >= 50) {
            setGameState("victory");
          } else {
            setGameState("levelComplete");
          }
        }

        return [nr, nc];
      });
    },
    [gameState, maze, rows, cols, levelItems, collected, level, loseLife]
  );

  // ── Keyboard ──
  useEffect(() => {
    const map: Record<string, number> = {
      ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3,
      w: 0, d: 1, s: 2, a: 3,
    };
    const onKey = (e: KeyboardEvent) => {
      if (map[e.key] !== undefined) { e.preventDefault(); movePlayer(map[e.key]); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [movePlayer]);

  // ── Touch swipe ──
  const touchStart = useRef<[number, number] | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = [e.touches[0].clientX, e.touches[0].clientY];
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current[0];
    const dy = e.changedTouches[0].clientY - touchStart.current[1];
    if (Math.abs(dx) < 15 && Math.abs(dy) < 15) return;
    if (Math.abs(dx) > Math.abs(dy)) movePlayer(dx > 0 ? 1 : 3);
    else movePlayer(dy > 0 ? 2 : 0);
    touchStart.current = null;
  };

  // ── Next level ──
  const goNextLevel = () => {
    setLevel((v) => v + 1);
    // useEffect resets transient state
  };

  // ── Buy lives ──
  const buyLives = () => {
    if (coins < LIVES_COST) return;
    const newCoins = coins - LIVES_COST;
    setCoins(newCoins);
    saveCoins(newCoins);
    setLives(MAX_LIVES);
    writeSave({ level, lives: MAX_LIVES });
    setPlayerPos([0, 0]);
    setCollected(new Set());
    setTimeLeft(getTimeLimit(level));
    setGameState("playing");
  };

  // ── Reset all ──
  const resetAll = () => {
    writeSave({ level: 1, lives: MAX_LIVES });
    setLevel(1);
    setLives(MAX_LIVES);
    // useEffect handles rest
  };

  // ── Time formatting ──
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerStr = `${mins}:${secs.toString().padStart(2, "0")}`;
  const timerDanger = timeLeft <= 15;

  // ── Maze outer border ──
  const outerBorder = `2px solid #7B5E3A`;

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, #2C1810 0%, #4A2E1A 40%, #6B4423 100%)",
        display: "flex",
        flexDirection: "column",
        paddingTop: "env(safe-area-inset-top, 0px)",
        userSelect: "none",
      }}
    >
      <div style={{ maxWidth: 428, width: "100%", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-3 pt-3 pb-2 flex-shrink-0">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => onNavigate("miniGames")}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(0,0,0,0.4)", border: "2px solid rgba(255,215,0,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          >
            <ChevronLeft className="text-white" size={20} />
          </motion.button>

          {/* Level */}
          <div className="flex flex-col items-center">
            <span className="font-penmanship font-bold text-white text-sm">Nível {level}/50</span>
            <div className="flex gap-0.5 mt-0.5">
              {Array.from({ length: 50 }, (_, i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i < level ? "#FFD700" : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
          </div>

          {/* Lives + coins row */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: MAX_LIVES }, (_, i) => (
                <span key={i} style={{ fontSize: 16, opacity: i < lives ? 1 : 0.25 }}>❤️</span>
              ))}
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl"
              style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)" }}>
              <img src={coinbibloo} style={{ width: 14, height: 14 }} alt="" />
              <span className="font-penmanship font-bold text-xs" style={{ color: "#FFD700" }}>{coins}</span>
            </div>
          </div>
        </div>

        {/* ── TIMER ── */}
        <div className="flex justify-center mb-1 flex-shrink-0">
          <div className="px-4 py-1 rounded-xl" style={{ background: timerDanger ? "rgba(255,60,60,0.3)" : "rgba(0,0,0,0.3)", border: `1px solid ${timerDanger ? "rgba(255,60,60,0.6)" : "rgba(255,255,255,0.2)"}` }}>
            <span className="font-penmanship font-bold" style={{ color: timerDanger ? "#FF6B6B" : "#fff", fontSize: 15 }}>
              ⏳ {timerStr}
            </span>
          </div>
        </div>

        {/* ── MAZE AREA ── */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{ minHeight: 0, overflow: "hidden" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            animate={{ opacity: hitFlash ? 0.3 : 1 }}
            transition={{ duration: 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, ${cs}px)`,
              gridTemplateRows: `repeat(${rows}, ${cs}px)`,
              border: outerBorder,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            }}
          >
            {maze.map((row, r) =>
              row.map((cell, c) => {
                const key = `${r},${c}`;
                const isPlayer = playerPos[0] === r && playerPos[1] === c;
                const isExit = r === rows - 1 && c === cols - 1;
                const isOnPath = compassPath?.has(key);
                const item = !collected.has(key) ? levelItems.get(key) : undefined;
                const wallColor = "#7B5E3A";
                const wallW = Math.max(1, Math.floor(cs / 14));

                return (
                  <div
                    key={key}
                    style={{
                      width: cs,
                      height: cs,
                      borderTop: cell.walls[0] ? `${wallW}px solid ${wallColor}` : `${wallW}px solid transparent`,
                      borderRight: cell.walls[1] ? `${wallW}px solid ${wallColor}` : `${wallW}px solid transparent`,
                      borderBottom: cell.walls[2] ? `${wallW}px solid ${wallColor}` : `${wallW}px solid transparent`,
                      borderLeft: cell.walls[3] ? `${wallW}px solid ${wallColor}` : `${wallW}px solid transparent`,
                      background: isPlayer
                        ? "rgba(255,215,0,0.25)"
                        : isExit
                        ? "rgba(50,200,80,0.20)"
                        : isOnPath
                        ? "rgba(255,220,100,0.22)"
                        : item === "trap"
                        ? "rgba(255,80,80,0.08)"
                        : "rgba(245,222,179,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: Math.max(10, cs * 0.55),
                      lineHeight: 1,
                      position: "relative",
                      transition: "background 0.15s",
                    }}
                  >
                    {isPlayer && <span style={{ fontSize: Math.max(12, cs * 0.6) }}>🧎</span>}
                    {isExit && !isPlayer && <span style={{ fontSize: Math.max(12, cs * 0.6) }}>⛺</span>}
                    {item && !isPlayer && <span style={{ fontSize: Math.max(9, cs * 0.45), opacity: 0.9 }}>{ITEM_EMOJI[item]}</span>}
                    {isOnPath && !isPlayer && !isExit && !item && (
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,220,100,0.8)" }} />
                    )}
                  </div>
                );
              })
            )}
          </motion.div>
        </div>

        {/* ── ITEM PICKUP TOAST ── */}
        <AnimatePresence>
          {lastItem && (
            <motion.div
              key={lastItem.key}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-24 left-0 right-0 flex justify-center pointer-events-none"
              style={{ zIndex: 20 }}
            >
              <div className="px-4 py-2 rounded-2xl font-penmanship font-bold text-white text-sm"
                style={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {lastItem.type === "heart" && "❤️ Vida restaurada!"}
                {lastItem.type === "compass" && "🧭 Caminho revelado!"}
                {lastItem.type === "water" && "💧 +30 segundos!"}
                {lastItem.type === "trap" && "🌵 Cacto! Vida perdida!"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── D-PAD CONTROLS ── */}
        <div className="flex-shrink-0 flex items-center justify-center pb-4 pt-3" style={{ gap: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "48px 48px 48px", gridTemplateRows: "48px 48px 48px", gap: 4 }}>
            {/* UP */}
            <div />
            <motion.button
              whileTap={{ scale: 0.85 }}
              onPointerDown={(e) => { e.preventDefault(); movePlayer(0); }}
              style={dpadBtn}
            >
              <span style={{ fontSize: 20 }}>▲</span>
            </motion.button>
            <div />
            {/* LEFT */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onPointerDown={(e) => { e.preventDefault(); movePlayer(3); }}
              style={dpadBtn}
            >
              <span style={{ fontSize: 20 }}>◀</span>
            </motion.button>
            {/* CENTER */}
            <div style={{ ...dpadBtn, background: "rgba(255,255,255,0.06)", cursor: "default", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              🧎
            </div>
            {/* RIGHT */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onPointerDown={(e) => { e.preventDefault(); movePlayer(1); }}
              style={dpadBtn}
            >
              <span style={{ fontSize: 20 }}>▶</span>
            </motion.button>
            <div />
            {/* DOWN */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onPointerDown={(e) => { e.preventDefault(); movePlayer(2); }}
              style={dpadBtn}
            >
              <span style={{ fontSize: 20 }}>▼</span>
            </motion.button>
            <div />
          </div>

          {/* Legend */}
          <div className="ml-5 flex flex-col gap-1">
            {([["❤️", "Vida +1"], ["🧭", "Ver caminho"], ["💧", "+30 seg"], ["🌵", "Perigo!"]] as [string, string][]).map(([e, l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <span style={{ fontSize: 12 }}>{e}</span>
                <span className="font-penmanship text-white/50" style={{ fontSize: 9 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

      </div>{/* end maxWidth wrapper */}

      {/* ══════════════════════════════════════════
          OVERLAYS
      ══════════════════════════════════════════ */}
      <AnimatePresence>

        {/* LEVEL COMPLETE */}
        {gameState === "levelComplete" && (
          <Overlay key="levelComplete">
            <div style={{ fontSize: 64 }}>🎉</div>
            <p className="font-penmanship font-bold text-white text-2xl mt-2">Nível {level} concluído!</p>
            <p className="font-penmanship text-white/70 text-sm mt-1">Moisés avançou no deserto!</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={goNextLevel}
              className="mt-6 px-8 py-3 rounded-2xl font-penmanship font-bold text-white text-lg"
              style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)", boxShadow: "0 4px 20px rgba(255,140,0,0.5)", border: "none", cursor: "pointer" }}
            >
              Próximo nível ▶
            </motion.button>
            <div className="flex items-center gap-2 mt-3">
              <img src={coinbibloo} style={{ width: 18, height: 18 }} alt="" />
              <span className="font-penmanship text-white/70 text-sm">+{level * 2} BiblooCoins</span>
            </div>
          </Overlay>
        )}

        {/* GAME OVER */}
        {gameState === "gameOver" && (
          <Overlay key="gameOver">
            <div style={{ fontSize: 56 }}>😢</div>
            <p className="font-penmanship font-bold text-white text-2xl mt-2">Sem vidas!</p>
            <p className="font-penmanship text-white/70 text-sm mt-1 text-center px-6">
              Moisés precisa de ajuda para atravessar o deserto.
            </p>

            {/* Buy lives option */}
            {coins >= LIVES_COST ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={buyLives}
                className="mt-5 px-6 py-3 rounded-2xl font-penmanship font-bold text-white text-base"
                style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(255,140,0,0.4)" }}
              >
                <div className="flex items-center gap-2">
                  <img src={coinbibloo} style={{ width: 18, height: 18 }} alt="" />
                  <span>Continuar por {LIVES_COST} coins</span>
                </div>
              </motion.button>
            ) : (
              <div className="mt-5 px-6 py-3 rounded-2xl font-penmanship text-white/50 text-sm text-center"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                Precisa de {LIVES_COST} BiblooCoins para continuar
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={resetAll}
              className="mt-3 px-6 py-2.5 rounded-2xl font-penmanship font-bold text-white/80 text-sm"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}
            >
              Recomeçar do Nível 1
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("miniGames")}
              className="mt-2 px-6 py-2 font-penmanship text-white/50 text-sm"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              Sair
            </motion.button>
          </Overlay>
        )}

        {/* VICTORY — all 50 levels done */}
        {gameState === "victory" && (
          <Overlay key="victory">
            <div style={{ fontSize: 72 }}>🏆</div>
            <p className="font-penmanship font-bold text-yellow-300 text-2xl mt-2">Parabéns!</p>
            <p className="font-penmanship text-white text-base mt-1 text-center px-6">
              Moisés chegou à Terra Prometida! Você completou todos os 50 níveis!
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={resetAll}
              className="mt-6 px-8 py-3 rounded-2xl font-penmanship font-bold text-white text-lg"
              style={{ background: "linear-gradient(135deg,#FFD700,#FF8C00)", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(255,215,0,0.5)" }}
            >
              Jogar novamente 🎮
            </motion.button>
          </Overlay>
        )}

      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────
   D-PAD BUTTON STYLE
───────────────────────────────────────── */
const dpadBtn: React.CSSProperties = {
  width: 48, height: 48, borderRadius: 12,
  background: "rgba(255,255,255,0.12)",
  border: "1.5px solid rgba(255,255,255,0.25)",
  color: "white", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  WebkitTapHighlightColor: "transparent",
};

/* ─────────────────────────────────────────
   OVERLAY HELPER
───────────────────────────────────────── */
const Overlay = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.82)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 50, padding: 24,
    }}
  >
    {children}
  </motion.div>
);

export default MazeGame;
