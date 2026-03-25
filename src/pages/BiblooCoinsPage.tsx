import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Zap, Trophy, Gift, History, Home } from "lucide-react";
import coinbibloo from "@/assets/coinbibloo.png";

const GLOW = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";
const COIN_GLOW = "drop-shadow(0 0 20px rgba(255,215,0,0.9)) drop-shadow(0 0 40px rgba(255,165,0,0.6))";

interface BiblooCoinsPageProps {
  onNavigate: (page: string) => void;
}

const MAX_ENERGY = 500;
const ENERGY_PER_TAP = 1;
const COINS_PER_TAP = 1;
const ENERGY_REGEN_RATE = 1; // per second

type Tab = "tap" | "earn" | "store" | "history";

const BiblooCoinsPage = ({ onNavigate }: BiblooCoinsPageProps) => {
  const [coins, setCoins] = useState(27);
  const [energy, setEnergy] = useState(350);
  const [activeTab, setActiveTab] = useState<Tab>("tap");
  const [tapEffects, setTapEffects] = useState<{ id: number; x: number; y: number }[]>();
  const effectId = useRef(0);
  const coinRef = useRef<HTMLDivElement>(null);

  // Energy regeneration
  useEffect(() => {
    const id = setInterval(() => {
      setEnergy((e) => Math.min(MAX_ENERGY, e + ENERGY_REGEN_RATE));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (energy <= 0) return;

    // Get tap position relative to coin
    let x = 0, y = 0;
    if ('touches' in e && e.touches.length > 0) {
      const rect = coinRef.current?.getBoundingClientRect();
      if (rect) { x = e.touches[0].clientX - rect.left; y = e.touches[0].clientY - rect.top; }
    } else if ('clientX' in e) {
      const rect = coinRef.current?.getBoundingClientRect();
      if (rect) { x = e.clientX - rect.left; y = e.clientY - rect.top; }
    }

    setCoins((c) => c + COINS_PER_TAP);
    setEnergy((en) => Math.max(0, en - ENERGY_PER_TAP));

    const newId = ++effectId.current;
    setTapEffects((prev) => [...(prev ?? []), { id: newId, x, y }]);
    setTimeout(() => {
      setTapEffects((prev) => prev?.filter((ef) => ef.id !== newId));
    }, 700);
  }, [energy]);

  const energyPct = energy / MAX_ENERGY;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "tap", label: "Tap", icon: <span style={{ fontSize: 16 }}>⚡</span> },
    { id: "earn", label: "Ganhar", icon: <Trophy size={16} /> },
    { id: "store", label: "Loja", icon: <Gift size={16} /> },
    { id: "history", label: "Histórico", icon: <History size={16} /> },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, #0F0726 0%, #1A0D40 40%, #0D1A3A 100%)",
        overflowY: "auto",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div style={{ maxWidth: 428, margin: "0 auto", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => onNavigate("home")}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,215,0,0.35)",
              filter: GLOW, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          >
            <ChevronLeft className="text-white" size={22} />
          </motion.button>

          {/* Coin balance */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl"
            style={{ background: "rgba(255,215,0,0.12)", border: "1.5px solid rgba(255,215,0,0.35)" }}
          >
            <img src={coinbibloo} style={{ width: 22, height: 22 }} alt="" />
            <span className="font-penmanship font-bold text-white text-base" style={{ color: "#FFD700" }}>
              {coins.toLocaleString()}
            </span>
          </div>

          <div style={{ width: 44 }} />
        </div>

        {/* Content */}
        <div className="flex-1 px-4 pb-4">
          <AnimatePresence mode="wait">
            {activeTab === "tap" && (
              <motion.div
                key="tap"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center"
                style={{ paddingTop: 12 }}
              >
                {/* Title */}
                <p className="font-penmanship font-bold text-white text-lg mb-1">BiblooCoins</p>
                <p className="font-penmanship text-white/50 text-xs mb-8">Toque na moeda para ganhar coins!</p>

                {/* Tap area */}
                <div
                  ref={coinRef}
                  className="relative flex items-center justify-center"
                  style={{ width: 200, height: 200, cursor: energy > 0 ? "pointer" : "not-allowed" }}
                  onClick={handleTap}
                  onTouchStart={handleTap}
                >
                  {/* Glow rings */}
                  <div style={{
                    position: "absolute", inset: -20, borderRadius: "50%",
                    border: "1px solid rgba(255,215,0,0.15)",
                    animation: "pulse 2s ease-in-out infinite",
                  }} />
                  <div style={{
                    position: "absolute", inset: -10, borderRadius: "50%",
                    border: "1.5px solid rgba(255,215,0,0.25)",
                  }} />
                  <motion.div
                    whileTap={{ scale: energy > 0 ? 0.9 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      width: 180, height: 180, borderRadius: "50%",
                      background: energy > 0
                        ? "radial-gradient(circle at 35% 35%, #FFE566, #FFB800 50%, #CC7A00)"
                        : "radial-gradient(circle at 35% 35%, #888, #555 50%, #333)",
                      boxShadow: energy > 0
                        ? "0 8px 40px rgba(255,184,0,0.6), 0 0 60px rgba(255,215,0,0.3), inset 0 4px 12px rgba(255,255,255,0.3)"
                        : "0 4px 20px rgba(0,0,0,0.5)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={coinbibloo}
                      alt="BiblooCoins"
                      style={{
                        width: 110, height: 110, objectFit: "contain",
                        filter: energy > 0 ? COIN_GLOW : "grayscale(100%)",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  </motion.div>

                  {/* Tap effect sparks */}
                  {(tapEffects ?? []).map((ef) => (
                    <motion.div
                      key={ef.id}
                      initial={{ opacity: 1, scale: 0.5, x: ef.x - 90, y: ef.y - 90 }}
                      animate={{ opacity: 0, scale: 1.5, y: ef.y - 130 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        pointerEvents: "none",
                        fontFamily: "KGPerfectPenmanship",
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#FFD700",
                        textShadow: "0 0 8px rgba(255,215,0,0.9)",
                      }}
                    >
                      +1
                    </motion.div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex gap-4 mt-8 mb-6">
                  <div className="text-center">
                    <p className="font-penmanship font-bold text-white text-2xl">{coins}</p>
                    <p className="font-penmanship text-white/50 text-xs">Total</p>
                  </div>
                  <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
                  <div className="text-center">
                    <p className="font-penmanship font-bold text-white text-2xl">{energy}</p>
                    <p className="font-penmanship text-white/50 text-xs">Energia</p>
                  </div>
                  <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
                  <div className="text-center">
                    <p className="font-penmanship font-bold text-white text-2xl">7</p>
                    <p className="font-penmanship text-white/50 text-xs">Dias seguidos</p>
                  </div>
                </div>

                {/* Energy bar */}
                <div style={{ width: "100%" }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Zap size={14} style={{ color: energy > 100 ? "#FFB800" : "#FF4444" }} />
                      <span className="font-penmanship text-xs font-bold"
                        style={{ color: energy > 100 ? "#FFB800" : "#FF4444" }}>
                        Energia
                      </span>
                    </div>
                    <span className="font-penmanship text-xs text-white/50">{energy} / {MAX_ENERGY}</span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: 12, background: "rgba(255,255,255,0.1)" }}>
                    <motion.div
                      animate={{ width: `${energyPct * 100}%` }}
                      transition={{ type: "spring", stiffness: 80 }}
                      style={{
                        height: "100%",
                        borderRadius: 6,
                        background: energy > 100
                          ? "linear-gradient(90deg, #FFB800, #FFE566)"
                          : "linear-gradient(90deg, #FF4444, #FF8888)",
                        boxShadow: energy > 100
                          ? "0 0 8px rgba(255,184,0,0.5)"
                          : "0 0 8px rgba(255,68,68,0.5)",
                      }}
                    />
                  </div>
                  {energy <= 0 && (
                    <p className="font-penmanship text-center text-xs mt-2" style={{ color: "#FF8888" }}>
                      Energia recarregando… ⏳
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "earn" && (
              <motion.div key="earn" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <p className="font-penmanship font-bold text-white text-base pt-4 pb-3">🏆 Como ganhar mais coins</p>
                {[
                  { icon: "📖", label: "Ler o devocional diário", coins: 10, done: true },
                  { icon: "🎮", label: "Completar mini-game", coins: 15, done: false },
                  { icon: "📚", label: "Ler capítulo da Bíblia", coins: 8, done: true },
                  { icon: "⭐", label: "7 dias seguidos", coins: 50, done: false },
                  { icon: "🎨", label: "Fazer um desenho no Refletir", coins: 5, done: false },
                  { icon: "🔍", label: "Buscar versículo", coins: 3, done: false },
                ].map((task) => (
                  <div key={task.label}
                    className="flex items-center gap-3 mb-2 px-4 py-3 rounded-2xl"
                    style={{
                      background: task.done ? "rgba(52,199,89,0.15)" : "rgba(255,255,255,0.06)",
                      border: task.done ? "1px solid rgba(52,199,89,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{task.icon}</span>
                    <span className="font-penmanship text-white text-sm flex-1">{task.label}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <img src={coinbibloo} style={{ width: 14, height: 14 }} alt="" />
                      <span className="font-penmanship font-bold text-sm" style={{ color: "#FFD700" }}>+{task.coins}</span>
                    </div>
                    {task.done && <span className="text-green-400 text-xs font-penmanship font-bold">✓</span>}
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "store" && (
              <motion.div key="store" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <p className="font-penmanship font-bold text-white text-base pt-4 pb-3">🎁 Loja de Prêmios</p>
                {[
                  { emoji: "🦁", label: "Avatar Leão", price: 50 },
                  { emoji: "👑", label: "Coroa Dourada", price: 100 },
                  { emoji: "🎨", label: "Cores especiais", price: 30 },
                  { emoji: "📿", label: "Moldura Especial", price: 75 },
                ].map((item) => (
                  <div key={item.label}
                    className="flex items-center gap-3 mb-2 px-4 py-3 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span style={{ fontSize: 28 }}>{item.emoji}</span>
                    <span className="font-penmanship text-white text-sm flex-1">{item.label}</span>
                    <motion.button whileTap={{ scale: 0.95 }}
                      disabled={coins < item.price}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-penmanship font-bold text-xs"
                      style={{
                        background: coins >= item.price ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.07)",
                        border: coins >= item.price ? "1px solid rgba(255,215,0,0.4)" : "1px solid rgba(255,255,255,0.1)",
                        color: coins >= item.price ? "#FFD700" : "rgba(255,255,255,0.3)",
                        cursor: coins >= item.price ? "pointer" : "default",
                      }}>
                      <img src={coinbibloo} style={{ width: 12, height: 12 }} alt="" />
                      {item.price}
                    </motion.button>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div key="history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <p className="font-penmanship font-bold text-white text-base pt-4 pb-3">📋 Histórico</p>
                {[
                  { label: "Devocional lido", amount: +10, time: "Hoje, 08:15" },
                  { label: "Capítulo lido", amount: +8, time: "Hoje, 08:03" },
                  { label: "Mini-game completado", amount: +15, time: "Ontem, 16:42" },
                  { label: "Streak de 7 dias", amount: +50, time: "Ontem" },
                  { label: "Devocional lido", amount: +10, time: "2 dias atrás" },
                ].map((entry, i) => (
                  <div key={i}
                    className="flex items-center gap-3 mb-2 px-4 py-3 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,215,0,0.15)" }}
                    >
                      <img src={coinbibloo} style={{ width: 18, height: 18 }} alt="" />
                    </div>
                    <div className="flex-1">
                      <p className="font-penmanship text-white text-sm">{entry.label}</p>
                      <p className="font-penmanship text-white/40 text-xs">{entry.time}</p>
                    </div>
                    <span className="font-penmanship font-bold text-sm" style={{ color: "#34C759" }}>
                      +{entry.amount}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom tab bar */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "rgba(15,7,38,0.95)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,215,0,0.2)",
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
          }}
        >
          {/* Gold top line */}
          <div style={{
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.5) 30%, rgba(255,165,0,0.7) 50%, rgba(255,215,0,0.5) 70%, transparent)",
            marginBottom: 2,
          }} />
          <div className="flex">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex flex-col items-center justify-center py-2 gap-1 relative"
                  style={{ cursor: "pointer", background: "none", border: "none" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="coin-tab-pill"
                      style={{
                        position: "absolute",
                        top: 4, left: "50%", transform: "translateX(-50%)",
                        width: 40, height: 36, borderRadius: 18,
                        background: "rgba(255,215,0,0.18)",
                        border: "1px solid rgba(255,215,0,0.35)",
                        zIndex: 0,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    />
                  )}
                  <div style={{ position: "relative", zIndex: 1, color: isActive ? "#FFD700" : "rgba(255,255,255,0.4)", filter: isActive ? GLOW : "none", transition: "all 0.2s" }}>
                    {tab.icon}
                  </div>
                  <span
                    className="font-penmanship"
                    style={{
                      fontSize: 10, position: "relative", zIndex: 1,
                      color: isActive ? "#D97706" : "rgba(255,255,255,0.35)",
                      fontWeight: isActive ? "bold" : "normal",
                      transition: "all 0.2s",
                    }}
                  >
                    {tab.label}
                  </span>
                  {isActive && (
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#D97706", boxShadow: "0 0 6px rgba(217,119,6,0.8)", position: "relative", zIndex: 1 }} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS animation for pulse ring */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default BiblooCoinsPage;
