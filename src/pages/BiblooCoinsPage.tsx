import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronLeft, Zap, Trophy, Gift, History } from "lucide-react";
import coinbibloo from "@/assets/coinbibloo.png";

const GLOW = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";
const COIN_GLOW = "drop-shadow(0 0 20px rgba(255,215,0,0.9)) drop-shadow(0 0 40px rgba(255,165,0,0.6))";

interface BiblooCoinsPageProps {
  onNavigate: (page: string) => void;
}

const MAX_ENERGY = 100;
const ENERGY_PER_TAP = 1;
const COINS_PER_TAP = 1;
const ENERGY_REGEN_RATE = 1; // per second

type Tab = "tap" | "earn" | "store" | "history";

/* Drop spring for the tab indicator */
const dropTransition = { type: "spring" as const, stiffness: 420, damping: 22, mass: 0.6 };

const BiblooCoinsPage = ({ onNavigate }: BiblooCoinsPageProps) => {
  const [coins, setCoins] = useState(27);
  const [energy, setEnergy] = useState(80);
  const [activeTab, setActiveTab] = useState<Tab>("tap");
  const [tapEffects, setTapEffects] = useState<{ id: number; x: number; y: number }[]>([]);
  const effectId = useRef(0);
  const coinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setEnergy((e) => Math.min(MAX_ENERGY, e + ENERGY_REGEN_RATE));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (energy <= 0) return;
    let x = 90, y = 90;
    if ('touches' in e && e.touches.length > 0) {
      const rect = coinRef.current?.getBoundingClientRect();
      if (rect) { x = e.touches[0].clientX - rect.left; y = e.touches[0].clientY - rect.top; }
    } else if ('clientX' in e) {
      const rect = coinRef.current?.getBoundingClientRect();
      if (rect) { x = (e as React.MouseEvent).clientX - rect.left; y = (e as React.MouseEvent).clientY - rect.top; }
    }
    setCoins((c) => c + COINS_PER_TAP);
    setEnergy((en) => Math.max(0, en - ENERGY_PER_TAP));
    const newId = ++effectId.current;
    setTapEffects((prev) => [...prev, { id: newId, x, y }]);
    setTimeout(() => setTapEffects((prev) => prev.filter((ef) => ef.id !== newId)), 700);
  }, [energy]);

  const energyPct = energy / MAX_ENERGY;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "tap",     label: "Tap",      icon: <span style={{ fontSize: 15 }}>⚡</span> },
    { id: "earn",    label: "Ganhar",   icon: <Trophy size={15} /> },
    { id: "store",   label: "Loja",     icon: <Gift size={15} /> },
    { id: "history", label: "Histórico",icon: <History size={15} /> },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, #0F0726 0%, #1A0D40 40%, #0D1A3A 100%)",
        display: "flex",
        flexDirection: "column",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div style={{ maxWidth: 428, width: "100%", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
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

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl"
            style={{ background: "rgba(255,215,0,0.12)", border: "1.5px solid rgba(255,215,0,0.35)" }}>
            <img src={coinbibloo} style={{ width: 22, height: 22 }} alt="" />
            <span className="font-penmanship font-bold text-xl" style={{ color: "#FFD700" }}>
              {coins.toLocaleString()}
            </span>
          </div>

          <div style={{ width: 44 }} />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-2" style={{ minHeight: 0 }}>
          <AnimatePresence mode="wait">
            {activeTab === "tap" && (
              <motion.div
                key="tap"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center"
                style={{ paddingTop: 8, paddingBottom: 8 }}
              >
                <p className="font-penmanship font-bold text-white text-lg mb-0.5">BiblooCoins</p>
                <p className="font-penmanship text-white/50 text-xs mb-6">Toque na moeda para ganhar coins!</p>

                {/* Tap coin */}
                <div
                  ref={coinRef}
                  className="relative flex items-center justify-center"
                  style={{ width: 190, height: 190, cursor: energy > 0 ? "pointer" : "not-allowed" }}
                  onClick={handleTap}
                  onTouchStart={handleTap}
                >
                  <div style={{ position: "absolute", inset: -18, borderRadius: "50%", border: "1px solid rgba(255,215,0,0.15)", animation: "pulse 2s ease-in-out infinite" }} />
                  <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1.5px solid rgba(255,215,0,0.22)" }} />
                  <motion.div
                    whileTap={{ scale: energy > 0 ? 0.9 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      width: 172, height: 172, borderRadius: "50%",
                      background: energy > 0
                        ? "radial-gradient(circle at 35% 35%, #FFE566, #FFB800 50%, #CC7A00)"
                        : "radial-gradient(circle at 35% 35%, #888, #555 50%, #333)",
                      boxShadow: energy > 0
                        ? "0 8px 40px rgba(255,184,0,0.6), 0 0 60px rgba(255,215,0,0.3), inset 0 4px 12px rgba(255,255,255,0.3)"
                        : "0 4px 20px rgba(0,0,0,0.5)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <img src={coinbibloo} alt="coin" style={{
                      width: 104, height: 104, objectFit: "contain",
                      filter: energy > 0 ? COIN_GLOW : "grayscale(100%)",
                      userSelect: "none", pointerEvents: "none",
                    }} />
                  </motion.div>
                  {tapEffects.map((ef) => (
                    <motion.div key={ef.id}
                      initial={{ opacity: 1, scale: 0.5, x: ef.x - 95, y: ef.y - 95 }}
                      animate={{ opacity: 0, scale: 1.5, y: ef.y - 135 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      style={{
                        position: "absolute", pointerEvents: "none",
                        fontFamily: "KGPerfectPenmanship", fontWeight: "bold", fontSize: 20,
                        color: "#FFD700", textShadow: "0 0 8px rgba(255,215,0,0.9)",
                      }}
                    >+1</motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex gap-5 mt-7 mb-5">
                  {[
                    { val: coins, label: "Total" },
                    { val: energy, label: "Energia" },
                    { val: 7, label: "Dias seguidos" },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="font-penmanship font-bold text-white text-2xl">{s.val}</p>
                      <p className="font-penmanship text-white/50 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Energy bar */}
                <div style={{ width: "100%" }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Zap size={13} style={{ color: energy > 20 ? "#FFB800" : "#FF4444" }} />
                      <span className="font-penmanship text-xs font-bold" style={{ color: energy > 20 ? "#FFB800" : "#FF4444" }}>
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
                        height: "100%", borderRadius: 6,
                        background: energy > 20 ? "linear-gradient(90deg, #FFB800, #FFE566)" : "linear-gradient(90deg, #FF4444, #FF8888)",
                        boxShadow: energy > 20 ? "0 0 8px rgba(255,184,0,0.5)" : "0 0 8px rgba(255,68,68,0.5)",
                      }}
                    />
                  </div>
                  {energy <= 0 && <p className="font-penmanship text-center text-xs mt-1.5" style={{ color: "#FF8888" }}>Energia recarregando… ⏳</p>}
                </div>
              </motion.div>
            )}

            {activeTab === "earn" && (
              <motion.div key="earn" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <p className="font-penmanship font-bold text-white text-base pt-3 pb-2">🏆 Como ganhar mais coins</p>
                {[
                  { icon: "📖", label: "Ler o devocional diário", coins: 2, done: true, note: "" },
                  { icon: "🎮", label: "Completar mini-game", coins: 5, done: false, note: "" },
                  { icon: "📚", label: "Ler capítulo da Bíblia", coins: 3, done: true, note: "" },
                  { icon: "⭐", label: "7 dias seguidos", coins: 5, done: false, note: "" },
                  { icon: "🎨", label: "Fazer um desenho no Refletir", coins: 2, done: false, note: "" },
                  { icon: "🔍", label: "Buscar versículo", coins: 2, done: false, note: "1 por dia" },
                ].map((task) => (
                  <div key={task.label} className="flex items-center gap-3 mb-2 px-4 py-3 rounded-2xl"
                    style={{
                      background: task.done ? "rgba(52,199,89,0.15)" : "rgba(255,255,255,0.06)",
                      border: task.done ? "1px solid rgba(52,199,89,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{task.icon}</span>
                    <div className="flex-1">
                      <span className="font-penmanship text-white text-sm">{task.label}</span>
                      {task.note && <p className="font-penmanship text-white/40 text-xs">{task.note}</p>}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <img src={coinbibloo} style={{ width: 13, height: 13 }} alt="" />
                      <span className="font-penmanship font-bold text-sm" style={{ color: "#FFD700" }}>+{task.coins}</span>
                    </div>
                    {task.done && <span className="text-green-400 text-xs font-penmanship font-bold flex-shrink-0">✓</span>}
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "store" && (
              <motion.div key="store" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <p className="font-penmanship font-bold text-white text-base pt-3 pb-2">🎁 Loja de Prêmios</p>
                {[
                  { emoji: "🦁", label: "Avatar Leão", price: 50, page: "product-avatar-leao" },
                  { emoji: "👑", label: "Coroa Dourada", price: 100, page: "product-coroa" },
                  { emoji: "🎨", label: "Cores especiais", price: 30, page: "product-cores" },
                  { emoji: "🧸", label: "Bibi de Pelúcia", price: 1500, page: "product-bibi-pelucia" },
                ].map((item) => (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onNavigate(item.page)}
                    className="flex items-center gap-3 mb-2 px-4 py-3 rounded-2xl w-full text-left"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
                    <span style={{ fontSize: 26, flexShrink: 0 }}>{item.emoji}</span>
                    <span className="font-penmanship text-white text-sm flex-1">{item.label}</span>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl"
                      style={{
                        background: coins >= item.price ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.07)",
                        border: coins >= item.price ? "1px solid rgba(255,215,0,0.4)" : "1px solid rgba(255,255,255,0.1)",
                      }}>
                      <img src={coinbibloo} style={{ width: 12, height: 12 }} alt="" />
                      <span className="font-penmanship font-bold text-xs" style={{ color: coins >= item.price ? "#FFD700" : "rgba(255,255,255,0.3)" }}>
                        {item.price.toLocaleString()}
                      </span>
                    </div>
                  </motion.button>
                ))}
                {/* Coming soon */}
                <div className="flex items-center justify-center mt-3 py-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)" }}>
                  <p className="font-penmanship text-white/40 text-sm">✨ Novos prêmios em breve</p>
                </div>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div key="history" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <p className="font-penmanship font-bold text-white text-base pt-3 pb-2">📋 Histórico</p>
                {[
                  { label: "Devocional lido", amount: 2, time: "Hoje, 08:15" },
                  { label: "Capítulo lido", amount: 3, time: "Hoje, 08:03" },
                  { label: "Mini-game completado", amount: 5, time: "Ontem, 16:42" },
                  { label: "Streak de 7 dias", amount: 5, time: "Ontem" },
                  { label: "Devocional lido", amount: 2, time: "2 dias atrás" },
                ].map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2 px-4 py-3 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,215,0,0.15)" }}>
                      <img src={coinbibloo} style={{ width: 18, height: 18 }} alt="" />
                    </div>
                    <div className="flex-1">
                      <p className="font-penmanship text-white text-sm">{entry.label}</p>
                      <p className="font-penmanship text-white/40 text-xs">{entry.time}</p>
                    </div>
                    <span className="font-penmanship font-bold text-sm" style={{ color: "#34C759" }}>+{entry.amount}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom tab bar — fixed within component */}
        <div
          className="flex-shrink-0"
          style={{
            background: "rgba(15,7,38,0.97)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,215,0,0.18)",
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6px)",
            paddingTop: 2,
          }}
        >
          <div style={{ height: 2, background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.5) 30%, rgba(255,165,0,0.7) 50%, rgba(255,215,0,0.5) 70%, transparent)", marginBottom: 2 }} />
          <LayoutGroup id="coin-tabs">
            <div className="flex">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex flex-col items-center justify-center py-2 gap-1 relative"
                    style={{ cursor: "pointer", background: "none", border: "none", minHeight: 52 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="coin-tab-drop"
                        transition={dropTransition}
                        style={{
                          position: "absolute",
                          inset: "3px 4px",
                          borderRadius: 20,
                          background: "rgba(255,215,0,0.15)",
                          border: "1px solid rgba(255,215,0,0.3)",
                          zIndex: 0,
                        }}
                      />
                    )}
                    <div style={{ position: "relative", zIndex: 1, color: isActive ? "#FFD700" : "rgba(255,255,255,0.35)", filter: isActive ? GLOW : "none", transition: "all 0.2s" }}>
                      {tab.icon}
                    </div>
                    <span className="font-penmanship" style={{
                      fontSize: 9, position: "relative", zIndex: 1,
                      color: isActive ? "#D97706" : "rgba(255,255,255,0.3)",
                      fontWeight: isActive ? "bold" : "normal", transition: "all 0.2s",
                    }}>
                      {tab.label}
                    </span>
                    {isActive && (
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#D97706", boxShadow: "0 0 5px rgba(217,119,6,0.8)", position: "relative", zIndex: 1 }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
      </div>

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
