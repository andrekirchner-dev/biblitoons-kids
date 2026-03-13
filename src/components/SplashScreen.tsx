import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import splashBg from "@/assets/splash-bg.png";
import logoRainbow from "@/assets/logo-bibloo-rainbow.png";

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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background image */}
      <img
        src={splashBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
        {/* Logo with ambient glow */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 150, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Outer glow - ambient light matching sky/meadow tones */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-60 -m-8"
            style={{
              background: "radial-gradient(circle, hsla(50, 90%, 75%, 0.7) 0%, hsla(190, 70%, 70%, 0.4) 50%, transparent 70%)",
            }}
          />
          <img
            src={logoRainbow}
            alt="Bibloo"
            className="relative w-64 h-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-display text-lg tracking-wide mb-4"
          style={{ color: "hsl(35, 60%, 35%)" }}
        >
          Loading...
        </motion.p>

        {/* Spinning loader - green/yellow ring like reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <svg
            className="animate-spin w-10 h-10"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="hsl(45, 80%, 60%)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.3"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke="hsl(130, 60%, 45%)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="70 100"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
