import { ChevronLeft } from "lucide-react";
import coinbibloo from "@/assets/coinbibloo.png";

const GLOW_FILTER = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

interface BiblooCoinsPageProps {
  onNavigate: (page: string) => void;
}

const BiblooCoinsPage = ({ onNavigate }: BiblooCoinsPageProps) => {
  return (
    <div
      className="mx-auto overflow-x-hidden flex flex-col"
      style={{ width: "100%", maxWidth: 428, minHeight: "100dvh", paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      {/* Back button */}
      <button
        onClick={() => onNavigate("home")}
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          minHeight: 44,
          minWidth: 44,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          border: "none",
          cursor: "pointer",
          filter: GLOW_FILTER,
          zIndex: 10,
        }}
      >
        <ChevronLeft className="text-white" size={24} />
      </button>

      <h1
        className="font-penmanship font-bold text-white text-center mt-20"
        style={{ fontSize: "clamp(20px, 5.5vw, 28px)" }}
      >
        Minhas BiblooCoins
      </h1>

      <div className="flex flex-col items-center mt-10" style={{ gap: 16 }}>
        <img src={coinbibloo} alt="BiblooCoins" style={{ width: 120, height: 120, objectFit: "contain" }} />
        <p
          className="font-penmanship font-bold"
          style={{ fontSize: 32, color: "#FFD700" }}
        >
          27 BiblooCoins
        </p>
      </div>

      <div className="px-6 mt-10">
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <p className="font-penmanship font-bold text-white" style={{ fontSize: 16, marginBottom: 8 }}>
            Como ganhar mais?
          </p>
          <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 2 }}>
            <li>📖 Ler devocionais diários</li>
            <li>🎮 Completar mini-games</li>
            <li>📚 Ler capítulos da Bíblia</li>
            <li>⭐ Sequência de dias seguidos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BiblooCoinsPage;
