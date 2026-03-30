import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronLeft, Trophy, Gift, History, Home, Zap } from "lucide-react";
import coinbibloo from "@/assets/coinbibloo.png";

const GLOW = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

interface BiblooCoinsPageProps {
  onNavigate: (page: string) => void;
}

type Tab = "home" | "earn" | "store" | "history";

/* Drop spring for the tab indicator */
const dropTransition = { type: "spring" as const, stiffness: 420, damping: 22, mass: 0.6 };

const MAX_ENERGY = 100;

const BiblooCoinsPage = ({ onNavigate }: BiblooCoinsPageProps) => {
  const [coins] = useState(27);
  const [energy] = useState(72);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [coinAngle, setCoinAngle] = useState(0);

  /* Continuous 3-D-style spin via CSS perspective skew */
  useEffect(() => {
    const interval = setInterval(() => {
      setCoinAngle((a) => (a + 2) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  /* squish factor simulates a coin rotating in 3D */
  const scaleX = Math.abs(Math.cos((coinAngle * Math.PI) / 180));
  const energyPct = Math.round((energy / MAX_ENERGY) * 100);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home",    label: "Início",    icon: <Home size={15} /> },
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
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col items-center pt-6 pb-4 gap-6"
              >
                {/* 3D spinning coin */}
                <div className="relative flex flex-col items-center">
                  {/* Glow halo behind coin */}
                  <div style={{
                    position: "absolute",
                    width: 170, height: 170,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,215,0,0.35) 0%, rgba(255,140,0,0.12) 60%, transparent 80%)",
                    top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    filter: "blur(18px)",
                  }} />
                  <motion.div
                    style={{
                      width: 130, height: 130,
                      borderRadius: "50%",
                      scaleX,
                      background: scaleX < 0.15
                        ? "linear-gradient(135deg, #8B6914 0%, #C8960C 50%, #8B6914 100%)"
                        : "linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FFD700 60%, #FF8C00 100%)",
                      boxShadow: "0 8px 32px rgba(255,165,0,0.55), inset 0 2px 8px rgba(255,255,255,0.35), inset 0 -4px 8px rgba(180,100,0,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img src={coinbibloo} style={{ width: 68, height: 68, opacity: scaleX < 0.15 ? 0 : 1, transition: "opacity 0.05s" }} alt="" />
                  </motion.div>
                  {/* Shadow under coin */}
                  <motion.div
                    animate={{ scaleX: [1, 0.75, 1], opacity: [0.4, 0.2, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 80, height: 14, borderRadius: "50%",
                      background: "rgba(255,140,0,0.3)",
                      filter: "blur(8px)",
                      marginTop: 6,
                    }}
                  />
                </div>

                {/* Coins count */}
                <div className="flex flex-col items-center gap-1">
                  <p className="font-penmanship text-white/60 text-sm tracking-widest uppercase">Seus BiblooCoins</p>
                  <div className="flex items-center gap-3">
                    <img src={coinbibloo} style={{ width: 28, height: 28, filter: GLOW }} alt="" />
                    <span className="font-penmanship font-bold text-5xl" style={{ color: "#FFD700", textShadow: "0 2px 20px rgba(255,215,0,0.6)" }}>
                      {coins.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Energy bar */}
                <div className="w-full max-w-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Zap size={14} style={{ color: "#34C759" }} />
                      <span className="font-penmanship font-bold text-white text-xs">Energia</span>
                    </div>
                    <span className="font-penmanship font-bold text-xs" style={{ color: "#34C759" }}>
                      {energy}/{MAX_ENERGY}
                    </span>
                  </div>
                  <div className="w-full rounded-full overflow-hidden" style={{ height: 12, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${energyPct}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        background: "linear-gradient(90deg, #22c55e, #4ade80)",
                        boxShadow: "0 0 8px rgba(52,199,89,0.6)",
                        borderRadius: "99px",
                      }}
                    />
                  </div>
                  <p className="font-penmanship text-white/40 text-xs mt-1.5 text-center">
                    A energia é usada nos mini-jogos
                  </p>
                </div>

                {/* Quick action buttons */}
                <div className="w-full max-w-xs grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("earn")}
                    className="py-3 rounded-2xl flex flex-col items-center gap-1"
                    style={{ background: "rgba(255,215,0,0.12)", border: "1.5px solid rgba(255,215,0,0.35)", cursor: "pointer" }}
                  >
                    <Trophy size={20} style={{ color: "#FFD700" }} />
                    <span className="font-penmanship font-bold text-white text-xs">Como Ganhar</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("store")}
                    className="py-3 rounded-2xl flex flex-col items-center gap-1"
                    style={{ background: "rgba(100,160,255,0.12)", border: "1.5px solid rgba(100,160,255,0.35)", cursor: "pointer" }}
                  >
                    <Gift size={20} style={{ color: "#60A5FA" }} />
                    <span className="font-penmanship font-bold text-white text-xs">Ver Prêmios</span>
                  </motion.button>
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
