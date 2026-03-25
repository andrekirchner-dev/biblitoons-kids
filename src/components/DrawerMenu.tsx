import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, User, LogOut, Clock, UserPlus, ChevronRight, Users, ShieldCheck } from "lucide-react";
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

const DrawerMenu = ({
  isOpen,
  onClose,
  onNavigate,
  profiles = [{ id: "1", name: "Maria", gender: "menina", age: "7" }],
  activeProfileId = "1",
  onSwitchProfile,
  onAddProfile,
}: DrawerMenuProps) => {
  const screenTime = "1h 25min";
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState<"menino" | "menina">("menino");
  const [newAge, setNewAge] = useState("6");

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0];

  const handleNav = (page: string) => {
    onNavigate(page);
    onClose();
  };

  const handleParentalPin = () => {
    if (pin === PARENTAL_PIN) {
      setShowPinModal(false);
      setPin("");
      setPinError(false);
      handleNav("parentalArea");
    } else {
      setPinError(true);
    }
  };

  const handleAddProfile = () => {
    if (!newName.trim()) return;
    onAddProfile && onAddProfile();
    setShowAddProfile(false);
    setNewName("");
  };

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
              width: "80%",
              maxWidth: 320,
              background: "linear-gradient(180deg, #FFF8F0 0%, #FFF3E0 100%)",
              borderRadius: "0 24px 24px 0",
              boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
            }}
          >
            {/* Active profile header */}
            <div
              className="p-5 pt-12 pb-5 flex flex-col items-center relative"
              style={{
                background: "linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div
                className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-2"
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
              <div
                className="flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <Clock className="w-3.5 h-3.5 text-white" />
                <span className="font-penmanship text-sm text-white">{screenTime} hoje</span>
              </div>
            </div>

            {/* Profile switcher */}
            {profiles.length > 1 && (
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-center gap-1.5 mb-2">
                  <Users size={14} className="text-amber-600" />
                  <p className="font-penmanship font-bold text-amber-900 text-xs">Trocar perfil</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSwitchProfile && onSwitchProfile(p.id);
                      }}
                      className="flex flex-col items-center gap-1 flex-shrink-0"
                      style={{ opacity: p.id === activeProfileId ? 1 : 0.6 }}
                    >
                      <div
                        className="w-12 h-12 rounded-full overflow-hidden"
                        style={{
                          border: p.id === activeProfileId ? "2.5px solid #FFB800" : "2px solid #D4B896",
                          boxShadow: p.id === activeProfileId ? "0 0 8px rgba(255,184,0,0.5)" : "none",
                        }}
                      >
                        <img
                          src={p.gender === "menino" ? FrameMenino : FrameMenina}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-penmanship text-amber-900 text-[10px] font-bold truncate max-w-[48px]">
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-amber-100 mt-3" />
              </div>
            )}

            {/* Menu items */}
            <div className="p-4 space-y-1.5">
              {/* Add sibling button */}
              <button
                onClick={() => setShowAddProfile(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-penmanship font-semibold text-left transition-colors"
                style={{ color: "#2E7D32", background: "rgba(76,175,80,0.08)" }}
              >
                <UserPlus className="w-5 h-5 text-green-600" />
                <span>Adicionar irmão/irmã</span>
                <ChevronRight className="w-4 h-4 ml-auto text-green-400" />
              </button>

              <DrawerButton
                icon={<Settings className="w-5 h-5" />}
                label="Ajustes Gerais"
                onClick={() => handleNav("settings")}
              />
              <DrawerButton
                icon={<User className="w-5 h-5" />}
                label="Ajustes de Perfil"
                onClick={() => handleNav("profile")}
              />

              <div className="border-t border-amber-100 my-2" />

              {/* Área dos Pais */}
              <button
                onClick={() => setShowPinModal(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-penmanship font-semibold text-left transition-colors"
                style={{ color: "#1565C0", background: "rgba(21,101,192,0.07)" }}
              >
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>Área dos Pais</span>
                <ChevronRight className="w-4 h-4 ml-auto text-blue-300" />
              </button>

              <div className="border-t border-amber-100 my-2" />

              <DrawerButton
                icon={<LogOut className="w-5 h-5" />}
                label="Sair"
                onClick={() => handleNav("logout")}
                variant="destructive"
              />
            </div>

            {/* Bibi watermark */}
            <div className="flex justify-center pb-8 mt-2">
              <img src={bibiMascot} alt="" className="w-14 h-14 opacity-15" />
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
                onClick={() => {
                  setShowPinModal(false);
                  setPin("");
                  setPinError(false);
                }}
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
                    <ShieldCheck size={26} className="text-white" />
                  </div>
                  <p className="font-penmanship font-bold text-amber-900 text-lg">Área dos Pais</p>
                  <p className="font-penmanship text-sm text-gray-600 mt-1 mb-4 text-center">
                    Digite o PIN parental
                  </p>
                  <input
                    type="password"
                    maxLength={4}
                    inputMode="numeric"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setPinError(false);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleParentalPin()}
                    className="w-full text-center text-2xl tracking-[0.5em] rounded-2xl py-3 px-4 outline-none"
                    style={{
                      border: pinError ? "2px solid #EF4444" : "2px solid rgba(255,215,0,0.4)",
                      background: "white",
                      color: "#4A2C0A",
                    }}
                    autoFocus
                  />
                  {pinError && (
                    <p className="font-penmanship text-xs text-red-500 mt-2">
                      PIN incorreto. Tente novamente.
                    </p>
                  )}
                  <button
                    className="w-full rounded-2xl py-3 font-penmanship font-bold text-white mt-4"
                    style={{
                      background: "linear-gradient(180deg, #FFB800, #FF8C00)",
                      borderBottom: "4px solid #CC6600",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                    onClick={handleParentalPin}
                  >
                    Entrar
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Profile Modal */}
          <AnimatePresence>
            {showAddProfile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-[60]"
                style={{ background: "rgba(0,0,0,0.65)" }}
                onClick={() => setShowAddProfile(false)}
              >
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  className="flex flex-col rounded-3xl p-6"
                  style={{
                    background: "#FFF8F0",
                    width: "min(320px, 88vw)",
                    border: "2px solid rgba(255,215,0,0.4)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-penmanship font-bold text-amber-900 text-lg text-center mb-4">
                    👨‍👧‍👦 Adicionar Perfil
                  </h3>

                  {/* Name */}
                  <label className="font-penmanship text-xs text-amber-700 font-bold mb-1 block">
                    Nome da criança
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Pedro, Ana..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 font-penmanship text-sm outline-none mb-3"
                    style={{
                      border: "1.5px solid rgba(255,215,0,0.4)",
                      background: "white",
                      color: "#4A2C0A",
                    }}
                    autoFocus
                  />

                  {/* Gender */}
                  <label className="font-penmanship text-xs text-amber-700 font-bold mb-1 block">
                    Gênero
                  </label>
                  <div className="flex gap-2 mb-3">
                    {(["menino", "menina"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setNewGender(g)}
                        className="flex-1 rounded-xl py-2 font-penmanship font-bold text-sm"
                        style={{
                          background: newGender === g ? "linear-gradient(180deg, #FFB800, #FF8C00)" : "rgba(0,0,0,0.05)",
                          color: newGender === g ? "white" : "#4A2C0A",
                          border: newGender === g ? "none" : "1.5px solid rgba(0,0,0,0.12)",
                          cursor: "pointer",
                        }}
                      >
                        {g === "menino" ? "👦 Menino" : "👧 Menina"}
                      </button>
                    ))}
                  </div>

                  {/* Age */}
                  <label className="font-penmanship text-xs text-amber-700 font-bold mb-1 block">
                    Idade
                  </label>
                  <input
                    type="number"
                    min={3}
                    max={12}
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 font-penmanship text-sm outline-none mb-4"
                    style={{
                      border: "1.5px solid rgba(255,215,0,0.4)",
                      background: "white",
                      color: "#4A2C0A",
                    }}
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddProfile(false)}
                      className="flex-1 rounded-xl py-3 font-penmanship font-bold text-sm"
                      style={{
                        background: "rgba(0,0,0,0.06)",
                        border: "1.5px solid rgba(0,0,0,0.12)",
                        cursor: "pointer",
                        color: "#4A2C0A",
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAddProfile}
                      disabled={!newName.trim()}
                      className="flex-1 rounded-xl py-3 font-penmanship font-bold text-white text-sm disabled:opacity-50"
                      style={{
                        background: "linear-gradient(180deg, #4CAF50, #388E3C)",
                        borderBottom: "3px solid #2E7D32",
                        border: "none",
                        cursor: newName.trim() ? "pointer" : "default",
                      }}
                    >
                      Adicionar ✓
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

const DrawerButton = ({
  icon,
  label,
  onClick,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-penmanship font-semibold text-left transition-colors ${
      variant === "destructive"
        ? "text-red-500 hover:bg-red-50"
        : "text-amber-900 hover:bg-amber-50"
    }`}
  >
    <span className={variant === "destructive" ? "text-red-400" : "text-amber-600"}>
      {icon}
    </span>
    {label}
  </button>
);

export default DrawerMenu;
