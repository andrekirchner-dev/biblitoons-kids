import { useState } from "react";
import { motion } from "framer-motion";
import LogoApp1 from "@/assets/LogoApp1.png";
import FrameGenero from "@/assets/FrameGenero.png";

interface GenderSelectionPageProps {
  onNavigate: (page: string) => void;
  onSelectGender: (gender: "menina" | "menino") => void;
}

const GenderSelectionPage = ({ onNavigate, onSelectGender }: GenderSelectionPageProps) => {
  const [selected, setSelected] = useState<"menina" | "menino" | null>(null);

  const handleSelect = (gender: "menina" | "menino") => {
    setSelected(gender);
    onSelectGender(gender);
    setTimeout(() => onNavigate("age"), 400);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-6 pb-8">
      {/* Logo */}
      <motion.img
        src={LogoApp1}
        alt="Bibloo Logo"
        className="w-44 h-auto drop-shadow-2xl mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Speech bubble */}
      <motion.div
        className="relative rounded-2xl px-8 py-4 mb-6 max-w-xs text-center"
        style={{
          background: "linear-gradient(135deg, hsl(38 55% 92% / 0.95), hsl(35 50% 85% / 0.9))",
          boxShadow: "0 4px 16px hsl(25 45% 20% / 0.2), inset 0 1px 0 hsl(40 60% 95% / 0.6)"
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <span className="text-sm opacity-60 absolute -top-1 left-6">✨</span>
        <span className="text-sm opacity-60 absolute -top-1 right-6">✨</span>
        <h2
          className="text-foreground text-2xl font-bold"
          style={{ fontFamily: "'Holidays Homework', serif" }}
        >
          Você é menina ou menino?
        </h2>
        {/* Bubble tail */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45"
          style={{
            background: "hsl(35 50% 85% / 0.9)",
          }}
        />
      </motion.div>

      {/* Character frame */}
      <motion.img
        src={FrameGenero}
        alt="Personagens"
        className="w-full max-w-sm h-auto mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />

      {/* Buttons */}
      <motion.div
        className="flex gap-6 w-full max-w-xs justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <motion.button
          className={`flex-1 jelly-btn rounded-full py-3 px-6 font-display text-lg font-bold text-white transition-all ${
            selected === "menina" ? "scale-105 ring-4 ring-white/50" : ""
          }`}
          style={{
            background: "#EC4899",
            boxShadow: "0 4px 0 #BE185D, 0 6px 10px hsl(330 70% 40% / 0.3)",
          }}
          whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
          onClick={() => handleSelect("menina")}
        >
          Menina
        </motion.button>

        <motion.button
          className={`flex-1 jelly-btn rounded-full py-3 px-6 font-display text-lg font-bold text-white transition-all ${
            selected === "menino" ? "scale-105 ring-4 ring-white/50" : ""
          }`}
          style={{
            background: "#3B82F6",
            boxShadow: "0 4px 0 #1D4ED8, 0 6px 10px hsl(220 70% 40% / 0.3)",
          }}
          whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
          onClick={() => handleSelect("menino")}
        >
          Menino
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GenderSelectionPage;
