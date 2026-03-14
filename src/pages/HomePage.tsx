import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import LogoApp1 from "@/assets/LogoApp1.png";
import bibiMascot from "@/assets/bibi-mascot.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenDrawer: () => void;
  age?: string;
  name?: string;
}

const HomePage = ({ onNavigate, onOpenDrawer, age, name = "Maria" }: HomePageProps) => {
  const ageNum = parseInt(age || "6");

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 px-4 pt-6 pb-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onOpenDrawer}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <img src={LogoApp1} alt="Bibloo" className="h-14 drop-shadow-lg" style={{ width: "55%" }} />

          {/* BiblooCoins */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-bold text-white text-sm"
            style={{ background: "rgba(0,0,0,0.3)" }}
          >
            🪙 <span>27</span>
          </div>
        </div>

        {/* Greeting + Bibi */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="flex-1 rounded-2xl px-5 py-4"
            style={{
              background: "#F5E6C8",
              border: "2px solid #D4B896",
            }}
          >
            <h1
              className="text-xl font-bold"
              style={{ color: "#4A2C0A", fontFamily: "'Holidays Homework', serif" }}
            >
              Bom dia, {name}! 🌞
            </h1>
            <p className="text-sm mt-1" style={{ color: "#7A5C3A" }}>
              O que vamos aprender hoje?
            </p>
          </div>
          <motion.img
            src={bibiMascot}
            alt="Bibi"
            className="w-20 h-20 drop-shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.3 }}
          />
        </motion.div>

        {/* Quick access row */}
        <motion.div
          className="flex gap-3 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <button
            className="flex-1 rounded-full py-3 font-bold text-white text-sm text-center"
            style={{ background: "#8B7355", boxShadow: "0 3px 0 #6B5540" }}
            onClick={() => onNavigate("devotional")}
          >
            ☀️ Devocional do Dia
          </button>
          <button
            className="flex-1 rounded-full py-3 font-bold text-white text-sm text-center"
            style={{ background: "#7C3AED", boxShadow: "0 3px 0 #5B21B6" }}
            onClick={() => onNavigate("bibliaflix")}
          >
            ★ BibliaFlix ★
          </button>
        </motion.div>

        {/* Ler a Bíblia card */}
        <motion.div
          className="rounded-2xl p-5 mb-4"
          style={{
            background: "#FFFBEE",
            border: "3px solid #D4B896",
            width: "92%",
            margin: "0 auto 16px",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
        >
          <h2
            className="text-lg font-bold text-center mb-4"
            style={{ color: "#4A2C0A", fontFamily: "'Holidays Homework', serif" }}
          >
            📖 Ler a Bíblia
          </h2>
          <div className="flex gap-3">
            <button
              className="flex-1 rounded-xl py-3 font-bold text-white text-sm"
              style={{ background: "#4CAF50", borderBottom: "3px solid #2E7D32" }}
              onClick={() => onNavigate("bible")}
            >
              Velho Testamento
            </button>
            <button
              className="flex-1 rounded-xl py-3 font-bold text-white text-sm"
              style={{ background: "#4A90D9", borderBottom: "3px solid #2B65A8" }}
              onClick={() => onNavigate("bible")}
            >
              Novo Testamento 🕊
            </button>
          </div>
        </motion.div>

        {/* Bottom cards */}
        <motion.div
          className="space-y-3"
          style={{ width: "92%", margin: "0 auto" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          {ageNum >= 4 && (
            <button
              className="w-full rounded-2xl py-4 font-bold text-white text-base text-center"
              style={{
                background: "#4CAF50",
                border: "3px solid #2E7D32",
                boxShadow: "0 4px 0 #1B5E20",
              }}
              onClick={() => onNavigate("stories")}
            >
              📚 Histórias para Pequenos
            </button>
          )}

          <button
            className="w-full rounded-2xl py-4 font-bold text-white text-base text-center"
            style={{
              background: "#3D1F00",
              border: "3px solid #D4B896",
              boxShadow: "0 4px 0 #2A1500",
            }}
            onClick={() => onNavigate("shop")}
          >
            🎁 Lojinha Bibloo
          </button>

          <button
            className="w-full rounded-2xl py-3 font-bold text-sm text-center"
            style={{
              background: "transparent",
              border: "2px solid #D4B896",
              color: "#8B7355",
            }}
          >
            👨‍👩‍👧 Área dos Pais
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
