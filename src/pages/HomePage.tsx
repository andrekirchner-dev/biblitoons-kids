import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import LogoApp1 from "@/assets/LogoApp1.png";
import bibiMascot from "@/assets/bibi-mascot.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenDrawer: () => void;
  age?: string;
  name?: string;
}

const HomePage = ({ onNavigate, onOpenDrawer, name = "Maria" }: HomePageProps) => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const handlePinSubmit = () => {
    if (pin === "1234") {
      setShowPinModal(false);
      setPin("");
      setPinError(false);
      onNavigate("parentalArea");
    } else {
      setPinError(true);
    }
  };

  const stdBtn: React.CSSProperties = {
    width: "92%",
    maxWidth: 380,
    padding: "18px 0",
    borderRadius: 50,
    background: "linear-gradient(180deg, #FFB800 0%, #FF8C00 100%)",
    borderBottom: "4px solid #CC6600",
    color: "white",
    fontFamily: "KGPerfectPenmanship",
    fontSize: "clamp(16px, 4vw, 18px)",
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    minHeight: 44,
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    cursor: "pointer",
    border: "none",
  };

  return (
    <div
      className="mx-auto overflow-x-hidden overflow-y-auto"
      style={{ width: "100%", maxWidth: 428, minHeight: "100dvh", paddingBottom: 80 }}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between relative"
        style={{ height: 56, padding: "0 16px" }}
      >
        <button
          onClick={onOpenDrawer}
          className="flex items-center justify-center"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <Menu className="text-white" size={22} />
        </button>

        <img
          src={LogoApp1}
          alt="Bibloo"
          loading="eager"
          decoding="async"
          style={{
            maxHeight: 48,
            width: "auto",
            objectFit: "contain",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <div
          className="flex items-center font-bold text-white"
          style={{
            background: "rgba(0,0,0,0.3)",
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 14,
            minHeight: 44,
            gap: 4,
          }}
        >
          🪙 <span>27</span>
        </div>
      </div>

      {/* Greeting Bubble */}
      <div className="flex items-end px-4 mt-2 mb-4" style={{ gap: 8 }}>
        <div
          style={{
            flex: "0 0 65%",
            background: "#F5E6C8",
            border: "2px solid #D4B896",
            borderRadius: 20,
            padding: "12px 16px",
          }}
        >
          <p
            className="font-bold uppercase"
            style={{
              color: "#4A2C0A",
              fontSize: "clamp(14px, 3.8vw, 18px)",
              fontFamily: "KGPerfectPenmanship",
            }}
          >
            BOM DIA, {name.toUpperCase()}!
          </p>
          <p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#6B4C2A", marginTop: 2 }}>
            Vamos ler a Palavra do Papai do Céu?
          </p>
        </div>
        <img
          src={bibiMascot}
          alt="Bibi"
          loading="eager"
          decoding="async"
          style={{ height: 90, width: "auto", objectFit: "contain", marginBottom: -8, flex: "0 0 30%" }}
        />
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col items-center" style={{ gap: 12 }}>
        {/* 1. Devocional */}
        <button style={stdBtn} onClick={() => onNavigate("devotional")}>
          Devocional do Dia
        </button>

        {/* 2. BibliaFlix */}
        <button style={stdBtn} onClick={() => onNavigate("bibliaflix")}>
          BibliaFlix
        </button>

        {/* 3. Ler a Bíblia Card */}
        <div
          onClick={() => onNavigate("bible")}
          style={{
            width: "92%",
            maxWidth: 380,
            borderRadius: 20,
            border: "3px solid #D4B896",
            background: "#FFF8EE",
            padding: 16,
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            cursor: "pointer",
          }}
        >
          <div className="flex flex-col items-center" style={{ gap: 8 }}>
            <p
              className="font-bold"
              style={{
                color: "#4A2C0A",
                fontSize: "clamp(18px, 5vw, 24px)",
                fontFamily: "KGPerfectPenmanship",
              }}
            >
              Ler a Bíblia
            </p>
            <div className="flex w-full" style={{ gap: 8 }}>
              <button
                className="font-bold text-white font-penmanship"
                style={{
                  flex: 1,
                  background: "#4CAF50",
                  borderRadius: 12,
                  padding: "10px 0",
                  fontSize: "clamp(12px, 3.2vw, 14px)",
                  minHeight: 44,
                  borderBottom: "3px solid #2E7D32",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("bible");
                }}
              >
                Velho Testamento
              </button>
              <button
                className="font-bold text-white font-penmanship"
                style={{
                  flex: 1,
                  background: "#4A90D9",
                  borderRadius: 12,
                  padding: "10px 0",
                  fontSize: "clamp(12px, 3.2vw, 14px)",
                  minHeight: 44,
                  borderBottom: "3px solid #2B65A8",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("bible");
                }}
              >
                Novo Testamento
              </button>
            </div>
          </div>
        </div>

        {/* 4. Mini-games */}
        <button style={stdBtn} onClick={() => onNavigate("miniGames")}>
          Mini-games
        </button>

        {/* 5. Lojinha Bibloo */}
        <button
          style={{
            ...stdBtn,
            background: "#3D1F00",
            borderBottom: "4px solid #1A0A00",
          }}
          onClick={() => onNavigate("shop")}
        >
          Lojinha Bibloo
        </button>

        {/* 6. Área dos Pais */}
        <button
          className="font-penmanship font-bold"
          style={{
            background: "transparent",
            border: "2px solid #D4B896",
            color: "#4A2C0A",
            borderRadius: 50,
            width: "92%",
            maxWidth: 380,
            padding: "16px 0",
            minHeight: 44,
            fontSize: "clamp(16px, 4vw, 18px)",
            cursor: "pointer",
          }}
          onClick={() => setShowPinModal(true)}
        >
          🔒 Área dos Pais
        </button>
      </div>

      {/* PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowPinModal(false); setPin(""); setPinError(false); }}
          >
            <motion.div
              className="flex flex-col items-center"
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                width: "min(340px, 85vw)",
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-bold font-penmanship" style={{ fontSize: 20, color: "#4A2C0A" }}>
                Área dos Pais
              </p>
              <p style={{ fontSize: 14, color: "#6B4C2A", marginTop: 4, marginBottom: 16 }}>
                Digite o PIN parental
              </p>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                style={{
                  width: "100%",
                  height: 56,
                  fontSize: 24,
                  textAlign: "center",
                  border: "2px solid #D4B896",
                  borderRadius: 12,
                  outline: "none",
                }}
                autoFocus
              />
              {pinError && (
                <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>
                  PIN incorreto. Tente novamente.
                </p>
              )}
              <button
                style={{ ...stdBtn, width: "100%", marginTop: 16 }}
                onClick={handlePinSubmit}
              >
                Entrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
