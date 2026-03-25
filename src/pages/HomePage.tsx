import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import LogoApp1 from "@/assets/LogoApp1.png";
import bibiHomepage from "@/assets/bibiHomepage.png";
import coinbibloo from "@/assets/coinbibloo.png";
import devocionalImg from "@/assets/devocional.png";
import minigamesImg from "@/assets/minigames.png";
import lerImg from "@/assets/ler.png";
import bibliaflixImg from "@/assets/bibliaflix2.png";
import lojinhaImg from "@/assets/lojinhabibloo.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenDrawer: () => void;
  age?: string;
  name?: string;
  gender?: "menina" | "menino";
}

const GLOW_FILTER = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 6 && h < 13) return "BOM DIA";
  if (h >= 13 && h < 19) return "BOA TARDE";
  return "BOA NOITE";
}

const HomePage = ({ onNavigate, onOpenDrawer, gender = "menina", name }: HomePageProps) => {
  const displayName = name || (gender === "menina" ? "Maria" : "João");
  const greeting = getGreeting();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        paddingTop: "env(safe-area-inset-top, 56px)",
        paddingBottom: "calc(68px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 428,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Top Bar */}
        <div
          className="flex items-center justify-between relative"
          style={{ height: 52, padding: "0 16px", flexShrink: 0, marginTop: 8 }}
        >
          <button
            onClick={onOpenDrawer}
            className="flex items-center justify-center"
            style={{
              minHeight: 44,
              minWidth: 44,
              filter: GLOW_FILTER,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Menu className="text-white" size={22} />
          </button>

          <img
            src={LogoApp1}
            alt="Bibloo"
            loading="eager"
            decoding="async"
            style={{
              maxHeight: 44,
              width: "auto",
              objectFit: "contain",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <button
            onClick={() => onNavigate("biblooCoins")}
            className="flex items-center font-bold text-white"
            style={{
              background: "rgba(0,0,0,0.55)",
              padding: "4px 10px 4px 4px",
              borderRadius: 20,
              fontSize: 13,
              minHeight: 36,
              gap: 5,
              border: "1px solid rgba(255,215,0,0.3)",
              cursor: "pointer",
            }}
          >
            <img src={coinbibloo} alt="coin" style={{ width: 22, height: 22 }} />
            <span style={{ color: "#FFD700" }}>27</span>
          </button>
        </div>

        {/* Greeting Bubble */}
        <div
          className="flex items-end"
          style={{ gap: 0, flexShrink: 0, padding: "4px 12px 0 12px", marginTop: 4 }}
        >
          <div
            style={{
              flex: "0 0 62%",
              marginRight: -12,
              zIndex: 2,
              background: "#F5E6C8",
              border: "2px solid #D4B896",
              borderRadius: 16,
              padding: "8px 12px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
            }}
          >
            <p
              className="font-bold uppercase"
              style={{
                color: "#4A2C0A",
                fontSize: "clamp(13px, 3.5vw, 16px)",
                fontFamily: "KGPerfectPenmanship",
              }}
            >
              {greeting}, {displayName.toUpperCase()}!
            </p>
            <p style={{ fontSize: "clamp(10px, 2.8vw, 12px)", color: "#6B4C2A", marginTop: 1 }}>
              Vamos ler a Palavra do Papai do Céu?
            </p>
          </div>
          <img
            src={bibiHomepage}
            alt="Bibi"
            loading="eager"
            decoding="async"
            style={{
              height: 78,
              width: "auto",
              objectFit: "contain",
              marginBottom: -4,
              flex: "0 0 38%",
              zIndex: 1,
            }}
          />
        </div>

        {/* Image Buttons — 3 rows */}
        <div
          className="flex flex-col items-center"
          style={{
            gap: 0,
            padding: "4px 10px 6px 10px",
            flex: 1,
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {/* ROW 1 — Devocional + BibliaFlix */}
          <div className="flex justify-center" style={{ gap: 10, width: "100%" }}>
            {[
              { src: devocionalImg, alt: "Devocional", page: "devotional" },
              { src: bibliaflixImg, alt: "BibliaFlix",  page: "bibliaflix"  },
            ].map(({ src, alt, page }) => (
              <motion.div
                key={page}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(page)}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(255,215,0,0.18)",
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "calc((100dvh - 56px - 84px - 72px) * 0.28)",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* ROW 2 — Ler a Bíblia (hero) */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%",
              cursor: "pointer",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,215,0,0.25)",
            }}
            onClick={() => onNavigate("bible")}
          >
            <img
              src={lerImg}
              alt="Ler a Bíblia"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "calc((100dvh - 56px - 84px - 72px) * 0.34)",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>

          {/* ROW 3 — Minigames + Lojinha */}
          <div className="flex justify-center" style={{ gap: 10, width: "100%" }}>
            {[
              { src: minigamesImg, alt: "Mini-games",    page: "miniGames" },
              { src: lojinhaImg,   alt: "Lojinha Bibloo", page: "shop"      },
            ].map(({ src, alt, page }) => (
              <motion.div
                key={page}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(page)}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(255,215,0,0.18)",
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "calc((100dvh - 56px - 84px - 72px) * 0.28)",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
