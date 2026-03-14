import { motion } from "framer-motion";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Início", emoji: "🏠" },
  { id: "bible", label: "Bíblia", emoji: "📖" },
  { id: "bibliaflix", label: "BibliaFlix", emoji: "▶️" },
  { id: "stories", label: "Histórias", emoji: "📚" },
  { id: "search", label: "Buscar", emoji: "🔍" },
];

const BottomNav = ({ currentPage, onNavigate }: BottomNavProps) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-30"
      style={{ borderTop: "1px solid #E5E7EB" }}
    >
      <div
        className="flex items-center justify-around py-2 px-1"
        style={{ background: "#FFFBEE" }}
      >
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl min-w-[56px]"
            >
              <span className="text-xl">{item.emoji}</span>
              <span
                className="text-[10px] font-bold"
                style={{ color: isActive ? "#4CAF50" : "#9CA3AF" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
