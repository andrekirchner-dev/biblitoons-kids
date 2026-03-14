import { motion } from "framer-motion";
import BG3 from "@/assets/BG3.png";

interface WelcomePageProps {
  onNavigate: (page: string) => void;
}

const WelcomePage = ({ onNavigate }: WelcomePageProps) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={BG3}
        alt="Welcome Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Bottom button */}
      <motion.button
        className="absolute left-1/2 -translate-x-1/2 bottom-[48px] rounded-full py-4 px-12 font-bold text-white text-lg"
        style={{
          background: "#F5A623",
          borderBottom: "4px solid #C47D0E",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          fontFamily: "'Holidays Homework', serif",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
        onClick={() => onNavigate("signup")}
      >
        Vamos começar! →
      </motion.button>
    </div>
  );
};

export default WelcomePage;
