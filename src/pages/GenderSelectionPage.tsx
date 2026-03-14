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
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={Imagem2}
        alt="Gender Selection"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Menina button */}
      <motion.button
        className={`absolute font-bold text-white text-center ${
          selected === "menina" ? "ring-4 ring-white/50" : ""
        }`}
        style={{
          left: "10%",
          bottom: "18%",
          background: "#F0477A",
          fontSize: "20px",
          borderRadius: "50px",
          padding: "14px 40px",
          borderBottom: "4px solid #C0305A",
          minWidth: "130px",
        }}
        whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
        onClick={() => handleSelect("menina")}
      >
        Menina
      </motion.button>

      {/* Menino button */}
      <motion.button
        className={`absolute font-bold text-white text-center ${
          selected === "menino" ? "ring-4 ring-white/50" : ""
        }`}
        style={{
          right: "10%",
          bottom: "18%",
          background: "#4A90D9",
          fontSize: "20px",
          borderRadius: "50px",
          padding: "14px 40px",
          borderBottom: "4px solid #2B65A8",
          minWidth: "130px",
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
