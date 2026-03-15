import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import LogoApp1 from "@/assets/LogoApp1.png";
import bibiHomepage from "@/assets/bibiHomepage.png";
import coinbibloo from "@/assets/coinbibloo.png";
import devocionalImg from "@/assets/devocional.png";
import minigamesImg from "@/assets/minigames.png";
import lerImg from "@/assets/ler.png";
import bibliaflixImg from "@/assets/bibliaflix2.png";
import lojinhaImg from "@/assets/lojinhabibloo.png";
import areaDospaisImg from "@/assets/areadospais.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenDrawer: () => void;
  age?: string;
  name?: string;
  gender?: "menina" | "menino";
}

const GLOW_FILTER = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 6 && h < 13) return "BOM DIA";
  if (h >= 13 && h < 19) return "BOA TARDE";
  return "BOA NOITE";
}

const HomePage = ({ onNavigate, onOpenDrawer, gender = "menina", name }: HomePageProps) => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const displayName = name || (gender === "menina" ? "Maria" : "João");
  const greeting = getGreeting();

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

  const pinBtnStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 0",
    borderRadius: 50,
    background: "linear-gradient(180deg, #FFB800 0%, #FF8C00 100%)",
    borderBottom: "4px solid #CC6600",
    color: "white",
    fontFamily: "KGPerfectPenmanship",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    minHeight: 44,
    cursor: "pointer",
    border: "none",
    marginTop: 16,
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", maxWidth: 428, margin: "0 auto", display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        {/* Top Bar */}
        <div
          className="flex items-center justify-between relative"
          style={{ height: 44, padding: "0 12px", flexShrink: 0 }}
        >
          <button
            onClick={onOpenDrawer}
            className="flex items-center justify-center"
            style={{ minHeight: 44, minWidth: 44, filter: GLOW_FILTER, background: "none", border: "none", cursor: "pointer" }}
          >
            <Menu className="text-white" size={22} />
          </button>

          <img
            src={LogoApp1}
            alt="Bibloo"
            loading="eager"
            decoding="async"
            style={{
              maxHeight: 40,
              width: "auto",
              objectFit: "contain",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <button
            onClick={() => onNavigate("biblooCoins")}
            className="flex items-center font-bold text-white"
            style={{
              background: "rgba(0,0,0,0.55)",
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 13,
              minHeight: 36,
              gap: 5,
              border: "1px solid #FFD700",
              cursor: "pointer",
            }}
          >
            <img src={coinbibloo} alt="coin" style={{ width: 18, height: 18 }} />
            <span style={{ color: "#FFD700" }}>27</span>
          </button>
        </div>

        {/* Greeting Bubble */}
        <div className="flex items-end" style={{ gap: 6, flexShrink: 0, maxHeight: 64, padding: "6px 12px" }}>
          <div
            style={{
              flex: "0 0 65%",
              background: "#F5E6C8",
              border: "2px solid #D4B896",
              borderRadius: 16,
              padding: "6px 12px",
            }}
          >
            <p
              className="font-bold uppercase"
              style={{
                color: "#4A2C0A",
                fontSize: "clamp(12px, 3.2vw, 15px)",
                fontFamily: "KGPerfectPenmanship",
              }}
            >
              {greeting}, {displayName.toUpperCase()}!
            </p>
            <p style={{ fontSize: "clamp(10px, 2.6vw, 12px)", color: "#6B4C2A", marginTop: 1 }}>
              Vamos ler a Palavra do Papai do Céu?
            </p>
          </div>
          <img
            src={bibiHomepage}
            alt="Bibi"
            loading="eager"
            decoding="async"
            style={{ height: 75, width: "auto", objectFit: "contain", marginBottom: -4, flex: "0 0 30%" }}
          />
        </div>

        {/* Image Buttons */}
        <div className="flex flex-col items-center" style={{ gap: 6, padding: "6px 12px 0 12px", flex: 1, justifyContent: "flex-start" }}>
          {/* ROW 1 — Devocional + BibliaFlix */}
          <div className="flex" style={{ gap: 6, width: "92%" }}>
            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate("devotional")}
              style={{ flex: 1, cursor: "pointer", borderRadius: 12, overflow: "hidden" }}
            >
              <img src={devocionalImg} alt="Devocional" style={{ width: "100%", height: "auto", maxHeight: 90, objectFit: "contain", display: "block", borderRadius: 12 }} />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate("bibliaflix")}
              style={{ flex: 1, cursor: "pointer", borderRadius: 12, overflow: "hidden" }}
            >
              <img src={bibliaflixImg} alt="BibliaFlix" style={{ width: "100%", height: "auto", maxHeight: 90, objectFit: "contain", display: "block", borderRadius: 12 }} />
            </motion.div>
          </div>

          {/* ROW 2 — Ler a Bíblia */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            style={{ width: "92%", maxWidth: 380, cursor: "pointer", borderRadius: 12, overflow: "hidden", position: "relative" }}
            onClick={() => onNavigate("bible")}
          >
            <img src={lerImg} alt="Ler a Bíblia" style={{ width: "100%", height: "auto", maxHeight: 100, objectFit: "contain", display: "block", borderRadius: 12 }} />
            <div
              onClick={(e) => { e.stopPropagation(); onNavigate("bible"); }}
              style={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "35%", cursor: "pointer" }}
            />
            <div
              onClick={(e) => { e.stopPropagation(); onNavigate("bible"); }}
              style={{ position: "absolute", bottom: 0, right: 0, width: "50%", height: "35%", cursor: "pointer" }}
            />
          </motion.div>

          {/* ROW 3 — Minigames + Lojinha */}
          <div className="flex" style={{ gap: 6, width: "92%" }}>
            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate("miniGames")}
              style={{ flex: 1, cursor: "pointer", borderRadius: 12, overflow: "hidden" }}
            >
              <img src={minigamesImg} alt="Mini-games" style={{ width: "100%", height: "auto", maxHeight: 90, objectFit: "contain", display: "block", borderRadius: 12 }} />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate("shop")}
              style={{ flex: 1, cursor: "pointer", borderRadius: 12, overflow: "hidden" }}
            >
              <img src={lojinhaImg} alt="Lojinha Bibloo" style={{ width: "100%", height: "auto", maxHeight: 90, objectFit: "contain", display: "block", borderRadius: 12 }} />
            </motion.div>
          </div>

          {/* ROW 4 — Área dos Pais (image button) */}
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowPinModal(true)}
            style={{ width: "92%", maxWidth: 380, cursor: "pointer" }}
          >
            <img
              src={areaDospaisImg}
              alt="Área dos Pais"
              style={{ width: "100%", height: "auto", maxHeight: 80, objectFit: "contain", borderRadius: 12, display: "block" }}
            />
          </motion.div>
        </div>
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
              <button style={pinBtnStyle} onClick={handlePinSubmit}>
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
