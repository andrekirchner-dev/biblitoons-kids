import { motion, LayoutGroup } from "framer-motion";
import playIcon from "@/assets/play.png";
import bibleIcon from "@/assets/bible.png";
import houseIcon from "@/assets/house.png";
import gameIcon from "@/assets/game.png";
import searchIcon from "@/assets/search.png";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const ALL_TABS = [
  { id: "bibliaflix", label: "Vídeos",  icon: playIcon,    home: false },
  { id: "bible",     label: "Bíblia",   icon: bibleIcon,   home: false },
  { id: "home",      label: "Início",   icon: houseIcon,   home: true  },
  { id: "miniGames", label: "Jogos",    icon: gameIcon,    home: false },
  { id: "search",    label: "Buscar",   icon: searchIcon,  home: false },
];

/* Bouncy "gota caindo" spring */
const dropTransition = {
  type: "spring" as const,
  stiffness: 420,
  damping: 22,
  mass: 0.6,
};

const BottomNav = ({ currentPage, onNavigate }: BottomNavProps) => {
  const activePage = ALL_TABS.find(t => t.id === currentPage) ? currentPage : "home";

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
      style={{
        width: "100%",
        maxWidth: 428,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        style={{
          margin: "0 12px 10px 12px",
          background: "rgba(255,255,255,0.97)",
          borderRadius: 36,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.6)",
          padding: "4px 6px",
        }}
      >
        <LayoutGroup id="bottom-nav">
          <div style={{ display: "flex", alignItems: "center" }}>
            {ALL_TABS.map((tab) => {
              const isActive = activePage === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  whileTap={{ scale: 0.86 }}
                  style={{
                    flex: tab.home ? "0 0 72px" : 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    paddingTop: tab.home ? 4 : 6,
                    paddingBottom: tab.home ? 4 : 5,
                    minHeight: tab.home ? 60 : 54,
                    gap: 2,
                    zIndex: 0,
                  }}
                >
                  {/* Shared drop indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="drop-bubble"
                      transition={dropTransition}
                      style={{
                        position: "absolute",
                        inset: tab.home ? "0px" : "2px",
                        borderRadius: 28,
                        background: tab.home
                          ? "linear-gradient(145deg, #FFD700 0%, #FF8C00 100%)"
                          : "rgba(255,184,0,0.15)",
                        border: tab.home ? "none" : "1.5px solid rgba(255,184,0,0.45)",
                        zIndex: 0,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <img
                      src={tab.icon}
                      alt={tab.label}
                      style={{
                        width: tab.home ? 26 : isActive ? 22 : 20,
                        height: tab.home ? 26 : isActive ? 22 : 20,
                        objectFit: "contain",
                        opacity: isActive ? 1 : 0.35,
                        filter: isActive
                          ? tab.home
                            ? "brightness(0) invert(1)"
                            : "drop-shadow(0 0 5px rgba(255,165,0,0.8))"
                          : "none",
                        transition: "all 0.2s",
                      }}
                    />
                    {tab.home && isActive && (
                      <>
                        <span style={{ position: "absolute", top: -8, right: -6, fontSize: 10, pointerEvents: "none" }}>⭐</span>
                        <span style={{ position: "absolute", bottom: -6, left: -5, fontSize: 8, pointerEvents: "none" }}>✨</span>
                      </>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontFamily: "KGPerfectPenmanship",
                      fontSize: 9,
                      color: isActive ? (tab.home ? "#7C3900" : "#D97706") : "#C0C0C0",
                      fontWeight: isActive ? "bold" : "normal",
                      position: "relative",
                      zIndex: 1,
                      transition: "all 0.2s",
                      letterSpacing: 0.2,
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </nav>
  );
};

export default BottomNav;
