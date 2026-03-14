import { useState } from "react";
import { motion } from "framer-motion";
import Imagem2 from "@/assets/Imagem_2.png";

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
    <div
      style={{
        backgroundImage: `url(${Imagem2})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        width: "100%",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.button
        className={`absolute font-penmanship font-bold text-white text-center ${
          selected === "menina" ? "ring-4 ring-white/50" : ""
        }`}
        style={{
          left: "6%",
          bottom: "15%",
          background: "#F0477A",
          fontSize: "clamp(16px, 4.5vw, 20px)",
          borderRadius: 50,
          padding: "14px 0",
          borderBottom: "4px solid #C0305A",
          width: "38%",
          minHeight: 44,
          cursor: "pointer",
        }}
        whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
        onClick={() => handleSelect("menina")}
      >
        Menina
      </motion.button>

      <motion.button
        className={`absolute font-penmanship font-bold text-white text-center ${
          selected === "menino" ? "ring-4 ring-white/50" : ""
        }`}
        style={{
          right: "6%",
          bottom: "15%",
          background: "#4A90D9",
          fontSize: "clamp(16px, 4.5vw, 20px)",
          borderRadius: 50,
          padding: "14px 0",
          borderBottom: "4px solid #2B65A8",
          width: "38%",
          minHeight: 44,
          cursor: "pointer",
        }}
        whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
        onClick={() => handleSelect("menino")}
      >
        Menino
      </motion.button>
    </div>
  );
};

export default GenderSelectionPage;
