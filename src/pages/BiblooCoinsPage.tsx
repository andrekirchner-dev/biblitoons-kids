import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronLeft, Trophy, Gift, History } from "lucide-react";
import coinbibloo from "@/assets/coinbibloo.png";

const GLOW = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

interface BiblooCoinsPageProps {
  onNavigate: (page: string) => void;
}

type Tab = "earn" | "store" | "history";

/* Drop spring for the tab indicator */
const dropTransition = { type: "spring" as const, stiffness: 420, damping: 22, mass: 0.6 };

const BiblooCoinsPage = ({ onNavigate }: BiblooCoinsPageProps) => {
  const [coins] = useState(27);
  const [activeTab, setActiveTab] = useState<Tab>("earn");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
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
