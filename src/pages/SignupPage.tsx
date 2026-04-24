import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Loader2 } from "lucide-react";
import LogoApp1 from "@/assets/LogoApp1.png";
import { signInWithGoogle } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface SignupPageProps {
  onNavigate: (page: string, userData?: { name?: string; email?: string }) => void;
}

const SignupPage = ({ onNavigate }: SignupPageProps) => {
  const { firebaseUser, profile } = useAuth();
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");

  // Se já está logado, redireciona direto para home ou onboarding
  useEffect(() => {
    if (firebaseUser) {
      if (profile?.gender && profile?.ageGroup) {
        onNavigate("home");
      } else {
        onNavigate("gender", { name: profile?.name ?? "", email: profile?.email ?? "" });
      }
    }
  }, [firebaseUser, profile]);

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setGoogleError("");
    try {
      const user = await signInWithGoogle();
      // AuthContext vai detectar o login e o useEffect acima cuida do redirect
      onNavigate("gender", { name: user.name, email: user.email });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("auth/popup-closed-by-user") || message.includes("auth/cancelled-popup-request")) {
        setGoogleError("Login cancelado.");
      } else if (message.includes("auth/configuration-not-found") || message.includes("auth/invalid-api-key")) {
        setGoogleError("Firebase não configurado. Adicione as credenciais no .env.local.");
      } else {
        setGoogleError("Erro ao entrar com o Google. Tente novamente.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex-col px-5 pt-6 pb-8 relative flex items-center justify-center"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      {/* Logo */}
      <motion.img
        src={LogoApp1}
        alt="Bibloo Logo"
        className="w-48 h-auto drop-shadow-2xl mb-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="w-full max-w-sm flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={showForm ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Title */}
        <motion.div
          className="w-full max-w-sm py-3 px-6 text-center mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={showForm ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h1
            className="text-foreground font-extralight text-xl"
            style={{ fontFamily: "'Holidays Homework', serif" }}
          >
            CRIE SUA CONTA
          </h1>
        </motion.div>

        {/* Google button */}
        <motion.button
          className="w-full max-w-sm rounded-2xl py-3.5 px-5 flex items-center justify-center gap-2 mb-2 btn-press border-2 border-bibloo-brown/20 disabled:opacity-70"
          style={{
            background:
              "linear-gradient(145deg, hsl(38 55% 88% / 0.95), hsl(33 45% 80% / 0.9))",
            boxShadow:
              "0 4px 12px hsl(25 45% 20% / 0.25), inset 0 1px 0 hsl(40 60% 95% / 0.5), 0 2px 0 hsl(25 40% 30% / 0.15)",
          }}
          initial={{ x: -40, opacity: 0 }}
          animate={showForm ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
          transition={{ delay: 0.25 }}
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          <span className="font-body font-semibold text-foreground text-base">
            {googleLoading ? "Entrando…" : "Entrar com o Google"}
          </span>
        </motion.button>

        {/* Google error */}
        {googleError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-red-500 text-center mb-2 max-w-xs px-2"
          >
            {googleError}
          </motion.p>
        )}

        {/* Divider */}
        <motion.div
          className="w-full max-w-sm flex items-center my-3"
          initial={{ opacity: 0 }}
          animate={showForm ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex-1 h-px bg-[#D1D5DB]" />
          <span className="px-3 text-[13px] text-[#9CA3AF] font-normal">ou</span>
          <div className="flex-1 h-px bg-[#D1D5DB]" />
        </motion.div>

        {/* Phone input */}
        <motion.div
          className="w-full max-w-sm rounded-2xl py-3 px-5 flex items-center gap-3 mb-3 border-2 border-bibloo-brown/20"
          style={{
            background:
              "linear-gradient(145deg, hsl(38 55% 88% / 0.95), hsl(33 45% 80% / 0.9))",
            boxShadow:
              "0 4px 12px hsl(25 45% 20% / 0.25), inset 0 1px 0 hsl(40 60% 95% / 0.5), 0 2px 0 hsl(25 40% 30% / 0.15)",
          }}
          initial={{ x: -40, opacity: 0 }}
          animate={showForm ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
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
            background:
              "linear-gradient(145deg, hsl(38 55% 88% / 0.95), hsl(33 45% 80% / 0.9))",
            boxShadow:
              "0 4px 12px hsl(25 45% 20% / 0.25), inset 0 1px 0 hsl(40 60% 95% / 0.5), 0 2px 0 hsl(25 40% 30% / 0.15)",
          }}
          initial={{ x: -40, opacity: 0 }}
          animate={showForm ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
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

        {/* Continue button */}
        <motion.button
          className="w-full max-w-sm jelly-btn bg-gradient-gold rounded-full py-3.5 px-8 shadow-button font-display text-lg font-bold text-primary-foreground mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={showForm ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.55 }}
          whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
          onClick={() => onNavigate("gender")}
        >
          Continuar
        </motion.button>

        {/* Terms */}
        <motion.p
          className="text-center text-xs font-body text-muted-foreground max-w-xs mb-6"
          initial={{ opacity: 0 }}
          animate={showForm ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.65 }}
        >
          Ao continuar, você aceita os{" "}
          <span className="underline text-foreground">Termos de Uso</span> e a{" "}
          <span className="underline text-accent">Política de Privacidade</span>.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
