import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, ShieldCheck } from "lucide-react";
import bibiMascot from "@/assets/bibi-mascot.png";
import FrameMenino from "@/assets/FrameMenino.png";
import FrameMenina from "@/assets/Frame_Menina.png";

interface ChildProfile {
  id: string;
  name: string;
  gender: "menino" | "menina";
  age: string;
}

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  profiles?: ChildProfile[];
  activeProfileId?: string;
  onSwitchProfile?: (id: string) => void;
  onAddProfile?: () => void;
}

const PARENTAL_PIN = "1234";

type PinPurpose = "parentalArea" | "logout";

const DrawerMenu = ({
  isOpen,
  onClose,
  onNavigate,
  profiles = [{ id: "1", name: "Maria", gender: "menina", age: "7" }],
  activeProfileId = "1",
}: DrawerMenuProps) => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinPurpose, setPinPurpose] = useState<PinPurpose>("parentalArea");
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0];

  const handleNav = (page: string) => {
    onNavigate(page);
    onClose();
  };

  const openPin = (purpose: PinPurpose) => {
    setPinPurpose(purpose);
    setPin("");
    setPinError(false);
    setShowPinModal(true);
  };

  const handlePinSubmit = () => {
    if (pin === PARENTAL_PIN) {
      setShowPinModal(false);
      setPin("");
      setPinError(false);
      if (pinPurpose === "parentalArea") handleNav("parentalArea");
      else handleNav("welcome"); // logout → back to welcome
    } else {
      setPinError(true);
    }
  };

  const pinLabel = pinPurpose === "parentalArea" ? "Área dos Pais" : "Confirmar Saída";
  const pinSubtitle = pinPurpose === "parentalArea"
    ? "Digite o PIN parental para continuar"
    : "Digite o PIN parental para sair da conta";
  const pinIcon = pinPurpose === "parentalArea" ? <ShieldCheck size={26} className="text-white" /> : <LogOut size={26} className="text-white" />;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.55)" }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-50 overflow-y-auto"
            style={{
              width: "78%",
              maxWidth: 300,
              background: "linear-gradient(180deg, #FFF8F0 0%, #FFF3E0 100%)",
              borderRadius: "0 28px 28px 0",
              boxShadow: "6px 0 28px rgba(0,0,0,0.22)",
            }}
          >
            {/* Profile header */}
            <div
              className="p-5 pt-12 pb-6 flex flex-col items-center relative"
              style={{ background: "linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)" }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div
                className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-3"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
              >
                <img
                  src={activeProfile?.gender === "menino" ? FrameMenino : FrameMenina}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-penmanship font-bold text-white text-xl">
                Oi, {activeProfile?.name}! 🐑
              </h2>
              <p className="font-penmanship text-white/80 text-sm mt-1">
                {activeProfile?.age} anos
              </p>
            </div>

            {/* Menu items — only two */}
            <div className="p-5 space-y-3">
              {/* Área dos Pais */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => openPin("parentalArea")}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-penmanship font-bold text-left"
                style={{
                  background: "rgba(21,101,192,0.10)",
                  border: "1.5px solid rgba(21,101,192,0.2)",
                  color: "#1565C0",
                  cursor: "pointer",
                }}
              >
                <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p style={{ fontSize: 15 }}>Área dos Pais</p>
                  <p className="font-penmanship text-blue-400 font-normal" style={{ fontSize: 11, marginTop: 1 }}>
                    Requer PIN parental
                  </p>
                </div>
              </motion.button>

              {/* Sair */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => openPin("logout")}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-penmanship font-bold text-left"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1.5px solid rgba(239,68,68,0.18)",
                  color: "#DC2626",
                  cursor: "pointer",
                }}
              >
                <LogOut className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p style={{ fontSize: 15 }}>Sair</p>
                  <p className="font-penmanship text-red-400 font-normal" style={{ fontSize: 11, marginTop: 1 }}>
                    Requer PIN parental
                  </p>
                </div>
              </motion.button>
            </div>

            {/* Bibi mascot */}
            <div className="flex flex-col items-center pb-10 mt-4">
              <img src={bibiMascot} alt="" className="w-16 h-16 opacity-20" />
              <p className="font-penmanship text-amber-300 text-xs mt-2 opacity-60">Bibloo v1.0.0</p>
            </div>
          </motion.div>

          {/* PIN Modal */}
          <AnimatePresence>
            {showPinModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-[60]"
                style={{ background: "rgba(0,0,0,0.65)" }}
                onClick={() => { setShowPinModal(false); setPin(""); setPinError(false); }}
              >
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="flex flex-col items-center rounded-3xl p-6"
                  style={{
                    background: "#FFF8F0",
                    width: "min(320px, 88vw)",
                    border: "2px solid rgba(255,215,0,0.4)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                    style={{ background: "linear-gradient(180deg, #FFB800, #FF8C00)" }}
                  >
                    {pinIcon}
                  </div>
                  <p className="font-penmanship font-bold text-amber-900 text-lg">{pinLabel}</p>
                  <p className="font-penmanship text-sm text-gray-600 mt-1 mb-4 text-center">{pinSubtitle}</p>

                  {/* Dot-style PIN entry */}
                  <div className="flex gap-4 mb-4">
                    {[0,1,2,3].map((i) => (
                      <div key={i} style={{
                        width: 16, height: 16, borderRadius: "50%",
                        background: i < pin.length ? "#FFB800" : "rgba(0,0,0,0.12)",
                        border: "2px solid rgba(255,184,0,0.4)",
                        transition: "background 0.15s",
                      }} />
                    ))}
                  </div>

                  <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                    onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
                    className="w-full text-center text-2xl tracking-[0.5em] rounded-2xl py-3 px-4 outline-none"
                    style={{
                      border: pinError ? "2px solid #EF4444" : "2px solid rgba(255,215,0,0.4)",
                      background: "white", color: "#4A2C0A",
                    }}
                    autoFocus
                  />
                  {pinError && (
                    <p className="font-penmanship text-xs text-red-500 mt-2">PIN incorreto. Tente novamente.</p>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-2xl py-3 font-penmanship font-bold text-white mt-4"
                    style={{
                      background: "linear-gradient(180deg, #FFB800, #FF8C00)",
                      borderBottom: "4px solid #CC6600",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                    onClick={handlePinSubmit}
                  >
                    Confirmar
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerMenu;
