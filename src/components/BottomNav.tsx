import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import playIcon from "@/assets/play.png";
import bibleIcon from "@/assets/bible.png";
import houseIcon from "@/assets/house.png";
import gameIcon from "@/assets/game.png";
import searchIcon from "@/assets/search.png";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const GLOW_FILTER = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

const tabs = [
  { id: "bibliaflix", label: "BibliaFlix", icon: playIcon, color: "#E50000" },
  { id: "bible", label: "Bíblia", icon: bibleIcon, color: "#8B4513" },
  { id: "home", label: "Início", icon: houseIcon, color: "#4CAF50" },
  { id: "miniGames", label: "Mini-games", icon: gameIcon, color: "#FF8C00" },
  { id: "search", label: "Buscar", icon: searchIcon, color: "#4A90D9" },
];

const BottomNav = ({ currentPage, onNavigate }: BottomNavProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const activeIndex = tabs.findIndex((t) => t.id === currentPage);

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

  const activeTab = tabs[activeIndex >= 0 ? activeIndex : 2];

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
                  <img
                    src={tab.icon}
                    alt={tab.label}
                    style={{
                      width: 28,
                      height: 28,
                      objectFit: "contain",
                      opacity: isActive ? 1 : 0.45,
                      filter: isActive ? GLOW_FILTER : "none",
                    }}
                  />
                </div>
              ) : (
                <img
                  src={tab.icon}
                  alt={tab.label}
                  style={{
                    width: 22,
                    height: 22,
                    objectFit: "contain",
                    opacity: isActive ? 1 : 0.45,
                    filter: isActive ? GLOW_FILTER : "none",
                  }}
                />
              )}
              <span
                className="font-penmanship"
                style={{
                  fontSize: 10,
                  color: isActive ? "#F5A623" : "#9CA3AF",
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
