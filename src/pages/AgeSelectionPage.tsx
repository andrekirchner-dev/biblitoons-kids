import { useState } from "react";
import { motion } from "framer-motion";
import LogoApp1 from "@/assets/LogoApp1.png";
import FrameMenina from "@/assets/Frame_Menina.png";
import FrameMenino from "@/assets/FrameMenino.png";

interface AgeSelectionPageProps {
  gender: "menina" | "menino";
  onNavigate: (page: string) => void;
  onSelectAge: (age: string) => void;
}

const ageOptions = [
  { label: "3-5 anos", color: "#4CAF50", border: "#2E7D32" },
  { label: "6-10 anos", color: "#FF8C00", border: "#CC6600" },
  { label: "10-12 anos", color: "#4A90D9", border: "#2B65A8" },
];

const AgeSelectionPage = ({ gender, onNavigate, onSelectAge }: AgeSelectionPageProps) => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const bgImage = gender === "menina" ? FrameMenina : FrameMenino;

  const handleSelect = (age: string) => {
    setSelectedAge(age);
    onSelectAge(age);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center">
      {/* Gender-specific background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-5 pt-6 pb-28">
        {/* Logo */}
        <motion.img
          src={LogoApp1}
          alt="Bibloo Logo"
          className="w-36 h-auto drop-shadow-2xl mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Speech bubble */}
        <motion.div
          className="relative rounded-2xl px-8 py-4 mb-8 max-w-xs text-center"
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
            Qual sua idade?
          </h2>
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45"
            style={{ background: "hsl(35 50% 85% / 0.9)" }}
          />
        </motion.div>

        {/* Age cards */}
        <motion.div
          className="flex gap-4 w-full max-w-sm justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {ageOptions.map((option, i) => (
            <motion.button
              key={option.label}
              className={`flex-1 jelly-btn rounded-xl py-3 px-2 font-display text-sm font-bold text-white transition-all ${
                selectedAge === option.label ? "scale-105 ring-4 ring-white/50" : ""
              }`}
              style={{
                background: option.color,
                borderBottom: `4px solid ${option.border}`,
                boxShadow: `0 4px 10px ${option.color}44`,
              }}
              whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              onClick={() => handleSelect(option.label)}
            >
              {option.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom navigation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4 safe-bottom z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          className="rounded-full py-3.5 px-8 font-display font-bold text-foreground border-2"
          style={{
            background: "#F5E6C8",
            borderColor: "#D4B896",
          }}
          onClick={() => onNavigate("gender")}
        >
          ← Voltar
        </button>

        <button
          className={`rounded-full py-3.5 px-8 font-display font-bold text-white transition-opacity ${
            !selectedAge ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          style={{
            background: "#F5A623",
            borderBottom: "4px solid #C47D0E",
          }}
          disabled={!selectedAge}
          onClick={() => selectedAge && onNavigate("home")}
        >
          Continuar →
        </button>
      </motion.div>
    </div>
  );
};

export default AgeSelectionPage;
