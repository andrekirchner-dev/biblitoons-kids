import { motion } from "framer-motion";
import bgMenina from "@/assets/5.png";
import bgMenino from "@/assets/6.png";

interface AgeSelectionPageProps {
  gender: "menina" | "menino";
  onNavigate: (page: string) => void;
  onSelectAge: (age: string) => void;
}

const AgeSelectionPage = ({ gender, onNavigate, onSelectAge }: AgeSelectionPageProps) => {
  const bgImage = gender === "menino" ? bgMenino : bgMenina;

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
    position: "absolute",
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
      }}
    >
      <motion.button
        style={{
          ...buttonBase,
          left: "8%",
          bottom: "12%",
          background: "#4CAF50",
          borderBottom: "4px solid #2E7D32",
        }}
        whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
        onClick={() => handleSelect("3-5 anos")}
      >
        3-5 anos
      </motion.button>

      <motion.button
        style={{
          ...buttonBase,
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "12%",
          background: "#FF8C00",
          borderBottom: "4px solid #CC6600",
        }}
        whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
        onClick={() => handleSelect("6-10 anos")}
      >
        6-10 anos
      </motion.button>

      <motion.button
        style={{
          ...buttonBase,
          right: "8%",
          bottom: "12%",
          background: "#4A90D9",
          borderBottom: "4px solid #2B65A8",
        }}
        whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
        onClick={() => handleSelect("10-12 anos")}
      >
        10-12 anos
      </motion.button>
    </div>
  );
};

export default AgeSelectionPage;
