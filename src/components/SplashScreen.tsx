import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import logoRainbow from "@/assets/logo-bibloo-rainbow.png";
import { AnimatedSpinner } from "@/components/ui/animated-spinner";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("done"), 3500);
    const t2 = setTimeout(() => onComplete(), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center overflow-hidden"
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Content overlay - logo pushed up into blue sky area */}
      <div className="relative z-10 flex flex-col items-center w-full pt-[18vh]">
        {/* Logo with ambient glow */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 150, delay: 0.2 }}
          className="relative mb-12"
        >
          {/* Outer glow - ambient light matching sky tones */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-60 -m-10"
            style={{
              background: "radial-gradient(circle, hsla(200, 80%, 80%, 0.7) 0%, hsla(190, 70%, 70%, 0.4) 50%, transparent 70%)",
            }}
          />
          <img
            src={logoRainbow}
            alt="Bibloo"
            className="relative w-64 h-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Animated spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <AnimatedSpinner
            size="4rem"
            color="hsl(45, 90%, 60%)"
            color2="hsl(130, 60%, 45%)"
            color3="hsl(200, 70%, 55%)"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
