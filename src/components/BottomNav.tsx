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

const GLOW = "drop-shadow(0 0 8px rgba(255,215,0,0.9)) drop-shadow(0 0 16px rgba(255,165,0,0.6))";

const leftTabs = [
  { id: "bibliaflix", label: "Vídeos", icon: playIcon },
  { id: "bible",     label: "Bíblia", icon: bibleIcon },
];
const rightTabs = [
  { id: "miniGames", label: "Jogos",  icon: gameIcon },
  { id: "search",    label: "Buscar", icon: searchIcon },
];

interface TabItemProps {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onNavigate: (page: string) => void;
}

function TabItem({ id, label, icon, isActive, onNavigate }: TabItemProps) {
  return (
    <motion.button
      onClick={() => onNavigate(id)}
      whileTap={{ scale: 0.88 }}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 6,
        paddingBottom: 4,
        position: "relative",
        background: "none",
        border: "none",
        cursor: "pointer",
        minHeight: 52,
        gap: 2,
      }}
    >
      {/* Active cloud bubble */}
      {isActive && (
        <motion.div
          layoutId="nav-bubble"
          initial={false}
          style={{
            position: "absolute",
            top: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 44,
            height: 36,
            borderRadius: 18,
            background: "linear-gradient(180deg, rgba(255,215,0,0.3) 0%, rgba(255,165,0,0.15) 100%)",
            border: "1.5px solid rgba(255,215,0,0.5)",
            zIndex: 0,
            boxShadow: "0 2px 8px rgba(255,165,0,0.2)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      )}

      <div style={{ position: "relative", zIndex: 1 }}>
        <img
          src={icon}
          alt={label}
          style={{
            width: isActive ? 22 : 20,
            height: isActive ? 22 : 20,
            objectFit: "contain",
            opacity: isActive ? 1 : 0.4,
            filter: isActive ? GLOW : "none",
            transition: "all 0.2s",
          }}
        />
      </div>

      <span
        style={{
          fontFamily: "KGPerfectPenmanship",
          fontSize: isActive ? 10 : 9,
          color: isActive ? "#D97706" : "#9CA3AF",
          fontWeight: isActive ? "bold" : "normal",
          position: "relative",
          zIndex: 1,
          transition: "all 0.2s",
          letterSpacing: 0.2,
        }}
      >
        {label}
      </span>

      {/* Active dot */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#D97706",
            boxShadow: "0 0 6px rgba(217,119,6,0.8)",
            position: "relative",
            zIndex: 1,
          }}
        />
      )}
    </motion.button>
  );
}

const BottomNav = ({ currentPage, onNavigate }: BottomNavProps) => {
  const isHome = currentPage === "home";

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
      style={{
        width: "100%",
        maxWidth: 428,
        height: "calc(72px + env(safe-area-inset-bottom, 0px))",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        background: "linear-gradient(180deg, #FFFAED 0%, #FFF5CC 100%)",
        borderRadius: "26px 26px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.13), 0 -1px 0 rgba(255,215,0,0.3)",
        overflow: "visible",
      }}
    >
      {/* Gold sparkle bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 3,
          borderRadius: "0 0 3px 3px",
          background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.7) 30%, rgba(255,165,0,0.9) 50%, rgba(255,215,0,0.7) 70%, transparent)",
        }}
      />

      {/* Elevated HOME button */}
      <div
        style={{
          position: "absolute",
          top: -24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      >
        <motion.button
          onClick={() => onNavigate("home")}
          whileTap={{ scale: 0.90 }}
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: isHome
              ? "linear-gradient(145deg, #FFD700 0%, #FF8C00 100%)"
              : "linear-gradient(145deg, #FFE082 0%, #FFC107 100%)",
            border: "3.5px solid #FFFAED",
            boxShadow: isHome
              ? "0 6px 22px rgba(255,140,0,0.65), 0 0 0 2px rgba(255,215,0,0.5)"
              : "0 4px 14px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            filter: isHome ? GLOW : "none",
            transition: "all 0.25s",
          }}
        >
          <img
            src={houseIcon}
            alt="Início"
            style={{
              width: 26,
              height: 26,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          {/* Stars decoration when active */}
          {isHome && (
            <>
              <div style={{ position:"absolute", top:-4, right:-4, fontSize:10 }}>⭐</div>
              <div style={{ position:"absolute", bottom:-4, left:-4, fontSize:8 }}>✨</div>
            </>
          )}
        </motion.button>
      </div>

      {/* Tab row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          height: "72px",
          paddingTop: 2,
        }}
      >
        {leftTabs.map((tab) => (
          <TabItem
            key={tab.id}
            {...tab}
            isActive={currentPage === tab.id}
            onNavigate={onNavigate}
          />
        ))}

        {/* Center spacer + home label */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 6, minHeight: 52 }}>
          <span
            style={{
              fontFamily: "KGPerfectPenmanship",
              fontSize: isHome ? 10 : 9,
              color: isHome ? "#D97706" : "#9CA3AF",
              fontWeight: isHome ? "bold" : "normal",
              transition: "all 0.2s",
              marginTop: 2,
            }}
          >
            Início
          </span>
          {isHome && (
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#D97706", boxShadow: "0 0 6px rgba(217,119,6,0.8)", marginTop: 2 }} />
          )}
        </div>

        {rightTabs.map((tab) => (
          <TabItem
            key={tab.id}
            {...tab}
            isActive={currentPage === tab.id}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
