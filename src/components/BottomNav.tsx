import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, BookOpen, Home, BookMarked, Search } from "lucide-react";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const tabs = [
  { id: "bibliaflix", label: "BibliaFlix", Icon: Play, color: "#E50000" },
  { id: "bible", label: "Bíblia", Icon: BookOpen, color: "#8B4513" },
  { id: "home", label: "Início", Icon: Home, color: "#4CAF50" },
  { id: "stories", label: "Histórias", Icon: BookMarked, color: "#FF8C00" },
  { id: "search", label: "Buscar", Icon: Search, color: "#4A90D9" },
];

const BottomNav = ({ currentPage, onNavigate }: BottomNavProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const activeIndex = tabs.findIndex((t) => t.id === currentPage);
  const activeTab = tabs[activeIndex >= 0 ? activeIndex : 2];

  const updateIndicator = useCallback(() => {
    const idx = activeIndex >= 0 ? activeIndex : 2;
    const el = tabRefs.current[idx];
    const container = containerRef.current;
    if (el && container) {
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicator({ left: rect.left - containerRect.left, width: rect.width });
    }
  }, [activeIndex]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <nav
      ref={containerRef}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
      style={{
        width: "100%",
        maxWidth: 428,
        height: 64,
        background: "#FFFBEE",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      {/* Sliding indicator */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          height: 3,
          borderRadius: 2,
          backgroundColor: activeTab.color,
        }}
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      <div className="flex items-center justify-around h-full px-2">
        {tabs.map((tab, i) => {
          const isActive = currentPage === tab.id;
          const isCenter = tab.id === "home";
          const iconColor = isActive ? tab.color : "#9CA3AF";

          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center justify-center relative"
              style={{ minWidth: 44, minHeight: 44, background: "none", border: "none", cursor: "pointer" }}
            >
              {isCenter ? (
                <div
                  className="flex items-center justify-center"
                  style={{
                    background: "white",
                    borderRadius: "50%",
                    width: 52,
                    height: 52,
                    marginTop: -20,
                    boxShadow: "0 -2px 12px rgba(0,0,0,0.15)",
                    border: "2px solid #E5E7EB",
                  }}
                >
                  <tab.Icon size={28} color={iconColor} />
                </div>
              ) : (
                <tab.Icon size={22} color={iconColor} />
              )}
              <span
                className="font-penmanship"
                style={{
                  fontSize: 10,
                  color: iconColor,
                  marginTop: isCenter ? 0 : 2,
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
