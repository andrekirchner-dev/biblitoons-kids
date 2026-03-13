import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import logoRainbow from "@/assets/logo-bibloo-rainbow.png";
import bibiWaving from "@/assets/bibi-waving.png";

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

const SignupPage = ({ onNavigate }: SignupPageProps) => {
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center px-5 pt-6 pb-8 relative">
      {/* Logo */}
      <motion.img
        src={logoRainbow}
        alt="Bibloo"
        className="w-48 h-auto drop-shadow-2xl mb-2"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
      />

      {/* Title banner */}
      <motion.div
        className="w-full max-w-sm rounded-full py-3 px-6 text-center mb-4 border-2 border-bibloo-brown/20"
        style={{
          background: "linear-gradient(135deg, hsl(38 55% 88% / 0.95), hsl(35 50% 82% / 0.9))",
          boxShadow: "0 4px 12px hsl(25 45% 20% / 0.25), inset 0 1px 0 hsl(40 60% 95% / 0.5), 0 2px 0 hsl(25 40% 30% / 0.15)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <h1 className="font-display text-xl font-bold text-foreground">
          Crie sua conta
        </h1>
      </motion.div>

      {/* Google button */}
      <motion.button
        className="w-full max-w-sm rounded-2xl py-3.5 px-5 flex items-center gap-3 mb-3 btn-press border-2 border-bibloo-brown/20"
        style={{
          background: "linear-gradient(145deg, hsl(38 55% 88% / 0.95), hsl(33 45% 80% / 0.9))",
          boxShadow: "0 4px 12px hsl(25 45% 20% / 0.25), inset 0 1px 0 hsl(40 60% 95% / 0.5), 0 2px 0 hsl(25 40% 30% / 0.15)",
        }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        onClick={() => {/* Google auth */}}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="font-body font-semibold text-foreground text-base">
          Entrar com o Google
        </span>
      </motion.button>

      {/* Phone input */}
      <motion.div
        className="w-full max-w-sm rounded-2xl py-3 px-5 flex items-center gap-3 mb-3 border-2 border-bibloo-brown/20"
        style={{
          background: "linear-gradient(145deg, hsl(38 55% 88% / 0.95), hsl(33 45% 80% / 0.9))",
          boxShadow: "0 4px 12px hsl(25 45% 20% / 0.25), inset 0 1px 0 hsl(40 60% 95% / 0.5), 0 2px 0 hsl(25 40% 30% / 0.15)",
        }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-lg">🇧🇷</span>
          <span className="font-body text-sm font-semibold text-muted-foreground">+55</span>
        </div>
        <input
          type="tel"
          placeholder="Digite seu telefone"
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          className="flex-1 bg-transparent font-body text-base text-foreground placeholder:text-muted-foreground outline-none"
        />
        <Phone className="w-5 h-5 text-muted-foreground" />
      </motion.div>

      {/* Email input */}
      <motion.div
        className="w-full max-w-sm rounded-2xl py-3 px-5 flex items-center gap-3 mb-5 border-2 border-bibloo-brown/20"
        style={{
          background: "linear-gradient(145deg, hsl(38 55% 88% / 0.95), hsl(33 45% 80% / 0.9))",
          boxShadow: "0 4px 12px hsl(25 45% 20% / 0.25), inset 0 1px 0 hsl(40 60% 95% / 0.5), 0 2px 0 hsl(25 40% 30% / 0.15)",
        }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        <Mail className="w-5 h-5 text-bibloo-gold" />
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className="flex-1 bg-transparent font-body text-base text-foreground placeholder:text-muted-foreground outline-none"
        />
      </motion.div>

      {/* Continue button - jelly effect */}
      <motion.button
        className="w-full max-w-sm jelly-btn bg-gradient-gold rounded-full py-3.5 px-8 shadow-button font-display text-lg font-bold text-primary-foreground mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55 }}
        whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
        onClick={() => onNavigate("home")}
      >
        Continuar
      </motion.button>

      {/* Terms */}
      <motion.p
        className="text-center text-xs font-body text-muted-foreground max-w-xs mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        Ao continuar, você aceita os{" "}
        <span className="underline text-foreground">Termos de Uso</span> e a{" "}
        <span className="underline text-accent">Política de Privacidade</span>.
      </motion.p>

      {/* Bibi mascot */}
      <motion.div
        className="flex-1 flex items-end justify-center w-full"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", damping: 10 }}
      >
        <img
          src={bibiWaving}
          alt="Bibi"
          className="w-40 h-auto drop-shadow-lg"
        />
      </motion.div>

      {/* Back button */}
      <motion.button
        className="absolute bottom-6 left-5 bg-bibloo-parchment/90 rounded-full py-2.5 px-5 shadow-cartoon flex items-center gap-2 btn-press"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => onNavigate("splash")}
      >
        <ArrowLeft className="w-4 h-4 text-foreground" />
        <span className="font-body font-semibold text-sm text-foreground">Voltar</span>
      </motion.button>
    </div>
  );
};

export default SignupPage;
