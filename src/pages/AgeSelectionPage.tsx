import { motion } from "framer-motion";
import bgMenina from "@/assets/5.png";
import bgMenino from "@/assets/6.png";

interface AgeSelectionPageProps {
  gender: "menina" | "menino";
  onNavigate: (page: string) => void;
  onSelectAge: (age: string) => void;
}

const AgeSelectionPage = ({ gender, onNavigate, onSelectAge }: AgeSelectionPageProps) => {
  const bgImage = gender === "menina" ? bgMenina : bgMenino;

  const handleSelect = (age: string) => {
    onSelectAge(age);
    onNavigate("home");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={bgImage}
        alt="Age Selection"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* 3-5 anos */}
      <motion.button
        className="absolute font-bold text-white text-center"
        style={{
          left: "8%",
          bottom: "12%",
          background: "#4CAF50",
          fontSize: "16px",
          borderRadius: "12px",
          padding: "10px 0",
          width: "26%",
          borderBottom: "4px solid #2E7D32",
        }}
        whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
        onClick={() => handleSelect("3-5 anos")}
      >
        3-5 anos
      </motion.button>

      {/* 6-10 anos */}
      <motion.button
        className="absolute font-bold text-white text-center"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "12%",
          background: "#FF8C00",
          fontSize: "16px",
          borderRadius: "12px",
          padding: "10px 0",
          width: "26%",
          borderBottom: "4px solid #CC6600",
        }}
        whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
        onClick={() => handleSelect("6-10 anos")}
      >
        6-10 anos
      </motion.button>

      {/* 10-12 anos */}
      <motion.button
        className="absolute font-bold text-white text-center"
        style={{
          right: "8%",
          bottom: "12%",
          background: "#4A90D9",
          fontSize: "16px",
          borderRadius: "12px",
          padding: "10px 0",
          width: "26%",
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
