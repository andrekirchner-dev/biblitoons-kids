import { motion } from "framer-motion";
import { Book, Film, Baby, Sun, Home } from "lucide-react";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Início", icon: Home },
  { id: "bible", label: "Bíblia", icon: Book },
  { id: "bibliaflix", label: "BíbliaFlix", icon: Film },
  { id: "stories", label: "Histórias", icon: Baby },
  { id: "devotional", label: "Devocional", icon: Sun },
];

const BottomNav = ({ currentPage, onNavigate }: BottomNavProps) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-30 safe-bottom"
    >
      <div className="mx-3 mb-3 bg-bibloo-parchment/95 backdrop-blur-md rounded-2xl shadow-cartoon border-2 border-border">
        <div className="flex items-center justify-around py-2 px-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl btn-press min-w-[56px] relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gradient-gold rounded-xl"
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 relative z-10 transition-colors ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-[10px] font-display font-semibold relative z-10 transition-colors ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
