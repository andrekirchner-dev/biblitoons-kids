import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, User, LogOut, Clock } from "lucide-react";
import bibiMascot from "@/assets/bibi-mascot.png";

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const DrawerMenu = ({ isOpen, onClose, onNavigate }: DrawerMenuProps) => {
  const profileName = "Maria";
  const screenTime = "1h 25min";

  const handleNav = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[80%] max-w-[320px] z-50 bg-gradient-parchment rounded-r-3xl shadow-cartoon overflow-hidden"
          >
            {/* Profile Section */}
            <div className="bg-gradient-gold p-6 pt-12 pb-8 flex flex-col items-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center btn-press"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
              
              <div className="w-20 h-20 rounded-full border-4 border-primary-foreground overflow-hidden shadow-cartoon mb-3">
                <img src={bibiMascot} alt="Perfil" className="w-full h-full object-cover" />
              </div>
              <h2 className="font-display text-xl text-primary-foreground font-bold">
                Oi, {profileName}! 🐑
              </h2>
              <div className="flex items-center gap-1.5 mt-2 bg-primary-foreground/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground font-semibold">{screenTime} hoje</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
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
              <div className="border-t border-border my-4" />
              <DrawerButton
                icon={<LogOut className="w-5 h-5" />}
                label="Sair"
                onClick={() => handleNav("logout")}
                variant="destructive"
              />
            </div>

            {/* Bibi at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20">
              <img src={bibiMascot} alt="" className="w-16 h-16" />
            </div>
          </motion.div>
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
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body font-semibold text-left btn-press transition-colors ${
      variant === "destructive"
        ? "text-destructive hover:bg-destructive/10"
        : "text-foreground hover:bg-muted"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default DrawerMenu;
