import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logoBibloo from "@/assets/logo-bibloo.jpeg";
import bibiWaving from "@/assets/bibi-waving.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"logo" | "bibi" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("bibi"), 1500);
    const t2 = setTimeout(() => setPhase("done"), 3000);
    const t3 = setTimeout(() => onComplete(), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-sky flex flex-col items-center justify-center"
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="mb-8"
      >
        <img src={logoBibloo} alt="Bibloo" className="w-48 h-auto rounded-2xl shadow-cartoon" />
      </motion.div>

      {phase === "bibi" && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="flex flex-col items-center"
        >
          <img src={bibiWaving} alt="Bibi" className="w-28 h-28 animate-float" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-xl text-foreground mt-4 text-shadow-cartoon"
          >
            Oi! Eu sou a Bibi! 🐑
          </motion.p>
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="font-body text-sm text-muted-foreground">Carregando...</p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
