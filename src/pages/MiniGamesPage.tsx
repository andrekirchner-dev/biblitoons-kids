import { motion } from "framer-motion";
import { ChevronLeft, Lock } from "lucide-react";

const GLOW_FILTER = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

interface MiniGamesPageProps {
  onNavigate: (page: string) => void;
}

const GAMES = [
  {
    id: "quiz-biblia",
    title: "Quiz da Bíblia",
    description: "Responda perguntas sobre as histórias sagradas",
    emoji: "❓",
    color: "#4CAF50",
    border: "#2E7D32",
    available: false,
  },
  {
    id: "quebra-cabeca",
    title: "Quebra-cabeça",
    description: "Monte as cenas das histórias bíblicas",
    emoji: "🧩",
    color: "#2196F3",
    border: "#1565C0",
    available: false,
  },
  {
    id: "memoria",
    title: "Jogo da Memória",
    description: "Encontre os pares das personagens bíblicas",
    emoji: "🃏",
    color: "#FF9800",
    border: "#E65100",
    available: false,
  },
  {
    id: "palavra-sagrada",
    title: "Palavra Sagrada",
    description: "Descubra palavras escondidas da Bíblia",
    emoji: "🔤",
    color: "#9C27B0",
    border: "#6A1B9A",
    available: false,
  },
  {
    id: "colorir",
    title: "Colorir",
    description: "Pinte as cenas dos personagens bíblicos",
    emoji: "🎨",
    color: "#E91E63",
    border: "#880E4F",
    available: false,
  },
  {
    id: "labirinto",
    title: "Labirinto de Moisés",
    description: "Ajude Moisés a atravessar o deserto em 50 fases!",
    emoji: "🧎",
    color: "#FF9800",
    border: "#E65100",
    available: true,
  },
];


const MiniGamesPage = ({ onNavigate }: MiniGamesPageProps) => {
  return (
    <div
      className="mx-auto overflow-x-hidden flex flex-col"
      style={{
        width: "100%",
        maxWidth: 428,
        minHeight: "100dvh",
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "calc(68px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Header */}
      <div className="flex items-center px-3 pt-4 pb-2">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => onNavigate("home")}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.45)",
            border: "2px solid rgba(255,215,0,0.5)",
            filter: GLOW_FILTER,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <ChevronLeft className="text-white" size={22} />
        </motion.button>
        <h1
          className="font-penmanship font-bold text-white flex-1 text-center mr-11"
          style={{
            fontSize: "clamp(20px, 5.5vw, 28px)",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          🎮 Mini-games
        </h1>
      </div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 rounded-2xl px-4 py-3 mb-4 flex items-center gap-3"
        style={{
          background: "rgba(255,152,0,0.15)",
          border: "1.5px solid rgba(255,152,0,0.45)",
        }}
      >
        <span style={{ fontSize: 22 }}>🧎</span>
        <div>
          <p className="font-penmanship font-bold text-white text-sm">Labirinto de Moisés disponível!</p>
          <p className="font-penmanship text-white/70 text-xs">
            50 fases, 3 vidas e poderes especiais te esperam!
          </p>
        </div>
      </motion.div>

      {/* Games grid */}
      <div className="grid grid-cols-2 gap-3 px-4 flex-1">
        {GAMES.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => game.available && onNavigate(`game-${game.id}`)}
            className="rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden cursor-pointer"
            style={{
              background: "rgba(30,20,10,0.72)",
              border: "1.5px solid rgba(255,255,255,0.18)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Color accent top bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: game.color,
              }}
            />

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 mt-1"
              style={{
                background: `${game.color}22`,
                border: `2px solid ${game.color}55`,
                fontSize: 28,
              }}
            >
              {game.emoji}
            </div>

            <p
              className="font-penmanship font-bold text-white text-sm mb-1 leading-tight"
            >
              {game.title}
            </p>
            <p className="font-penmanship text-white/60 text-xs leading-snug">
              {game.description}
            </p>

            {/* Lock badge */}
            {!game.available && (
              <div
                className="flex items-center gap-1 mt-2 rounded-full px-2 py-0.5"
                style={{ background: "rgba(0,0,0,0.35)" }}
              >
                <Lock size={10} className="text-white/70" />
                <span className="font-penmanship text-white/70 text-[10px]">Em breve</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MiniGamesPage;
