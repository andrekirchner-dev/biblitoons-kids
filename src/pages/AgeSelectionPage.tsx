import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import bgMenina from "@/assets/BG5.png";
import bgMenino from "@/assets/BG6.png";

interface AgeSelectionPageProps {
  gender: "menina" | "menino";
  onNavigate: (page: string) => void;
  onSelectAge: (age: string) => void;
}

const meninaColors = [
  { bg: "#F56FBD", border: "#C44A96" },
  { bg: "#EF13AB", border: "#B00C80" },
  { bg: "#7400A3", border: "#4D006B" },
];

const meninoColors = [
  { bg: "#4A90D9", border: "#2B65A8" },
  { bg: "#4900EF", border: "#3100A0" },
  { bg: "#2736E5", border: "#1A22A0" },
];

const ages = ["3-4 anos", "5-9 anos", "10-12 anos"];

const AgeSelectionPage = ({ gender, onNavigate, onSelectAge }: AgeSelectionPageProps) => {
  const bgImage = gender === "menino" ? bgMenino : bgMenina;
  const colors = gender === "menina" ? meninaColors : meninoColors;

  const handleSelect = (age: string) => {
    onSelectAge(age);
    onNavigate("home");
  };

  const buttonBase: React.CSSProperties = {
    minHeight: 44,
    borderRadius: 12,
    fontFamily: "KGPerfectPenmanship",
    fontSize: "clamp(13px, 3.5vw, 16px)",
    color: "white",
    fontWeight: "bold",
    padding: "10px 0",
    width: "clamp(80px, 26vw, 110px)",
    textAlign: "center",
    cursor: "pointer",
    border: "none",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        width: "100%",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
    >
      {/* Back button */}
      <motion.button
        onClick={() => onNavigate('gender')}
        whileTap={{ scale: 0.88 }}
        style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top, 16px) + 12px)',
          left: '16px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.25)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))',
        }}
      >
        <ChevronLeft size={24} color="white" />
      </motion.button>

      {/* Left button */}
      <motion.button
        style={{
          ...buttonBase,
          position: "absolute",
          left: "8%",
          bottom: "12%",
          background: colors[0].bg,
          borderBottom: `4px solid ${colors[0].border}`,
        }}
        whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
        onClick={() => handleSelect(ages[0])}
      >
        {ages[0]}
      </motion.button>

      {/* Center button — uses motion x to avoid drift */}
      <motion.button
        style={{
          ...buttonBase,
          position: "absolute",
          left: "50%",
          bottom: "12%",
          background: colors[1].bg,
          borderBottom: `4px solid ${colors[1].border}`,
        }}
        initial={{ x: "-50%" }}
        whileTap={{ scale: 0.95, x: "-50%" }}
        onClick={() => handleSelect(ages[1])}
      >
        {ages[1]}
      </motion.button>

      {/* Right button */}
      <motion.button
        style={{
          ...buttonBase,
          position: "absolute",
          right: "8%",
          bottom: "12%",
          background: colors[2].bg,
          borderBottom: `4px solid ${colors[2].border}`,
        }}
        whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
        onClick={() => handleSelect(ages[2])}
      >
        {ages[2]}
      </motion.button>
    </div>
  );
};

export default AgeSelectionPage;
