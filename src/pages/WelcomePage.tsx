import { motion } from "framer-motion";
import BG3 from "@/assets/BG3.png";

interface WelcomePageProps {
  onNavigate: (page: string) => void;
}

const WelcomePage = ({ onNavigate }: WelcomePageProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${BG3})`,
        backgroundSize: "110%",
        backgroundPosition: "center top",
        width: "100vw",
        maxWidth: 428,
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
      }}
    >
      <motion.button
        className="font-penmanship font-bold text-white text-center"
        style={{
          position: "fixed",
          bottom: 40,
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
          minWidth: 200,
          maxWidth: "80vw",
          whiteSpace: "nowrap",
          display: "block",
          textAlign: "center",
          zIndex: 10,
          background: "#F5A623",
          borderBottom: "4px solid #C47D0E",
          borderRadius: 50,
          padding: "16px 48px",
          fontSize: "clamp(16px, 4vw, 20px)",
          minHeight: 44,
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
        onClick={() => onNavigate("signup")}
      >
        Vamos começar! →
      </motion.button>
    </div>
  );
};

export default WelcomePage;
