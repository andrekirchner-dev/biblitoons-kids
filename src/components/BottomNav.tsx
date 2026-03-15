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
  { id: "bibliaflix", label: "BibliaFlix", icon: playIcon },
  { id: "bible", label: "Bíblia", icon: bibleIcon },
  { id: "home", label: "Início", icon: houseIcon },
  { id: "miniGames", label: "Mini-games", icon: gameIcon },
  { id: "search", label: "Buscar", icon: searchIcon },
];

const BottomNav = ({ currentPage, onNavigate }: BottomNavProps) => {
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [circlePos, setCirclePos] = useState({ left: 0, top: 0 });

  const activeIndex = tabs.findIndex((t) => t.id === currentPage);
  const idx = activeIndex >= 0 ? activeIndex : 2;

  const updateCircle = useCallback(() => {
    const el = tabRefs.current[idx];
    const nav = navRef.current;
    if (el && nav) {
      const rect = el.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setCirclePos({
        left: rect.left - navRect.left + rect.width / 2 - 24,
        top: rect.top - navRect.top + rect.height / 2 - 24,
      });
    }
  }, [idx]);

  useEffect(() => {
    updateCircle();
    window.addEventListener("resize", updateCircle);
    return () => window.removeEventListener("resize", updateCircle);
  }, [updateCircle]);

  return (
    <nav
      ref={navRef}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
      style={{
        width: "100%",
        maxWidth: 428,
        height: "calc(68px + env(safe-area-inset-bottom, 0px))",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        background: "#FFFBEE",
        borderTop: "1px solid #E5E7EB",
      }}
    >
      {/* Sliding circle */}
      <motion.div
        style={{
          position: "absolute",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(245, 166, 35, 0.2)",
          border: "2px solid rgba(245, 166, 35, 0.5)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        animate={{ left: circlePos.left, top: circlePos.top }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />

      <div className="flex items-center justify-around h-full px-2" style={{ position: "relative", zIndex: 1 }}>
        {tabs.map((tab, i) => {
          const isActive = currentPage === tab.id;
          const isCenter = tab.id === "home";
          const iconSize = isCenter ? 32 : 22;

          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center justify-center"
              style={{ minWidth: 44, minHeight: 44, background: "none", border: "none", cursor: "pointer" }}
            >
              <img
                src={tab.icon}
                alt={tab.label}
                style={{
                  width: iconSize,
                  height: iconSize,
                  objectFit: "contain",
                  opacity: isActive ? 1 : 0.45,
                  filter: isActive ? GLOW_FILTER : "none",
                }}
              />
              <span
                className="font-penmanship"
                style={{
                  fontSize: 10,
                  color: isActive ? "#F5A623" : "#9CA3AF",
                  marginTop: 2,
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
