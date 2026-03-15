import BG4 from "@/assets/BG4.png";
import LogoApp from "@/assets/LogoApp1-3.png";
import suadacao from "@/assets/suadacaoBibi.png";

interface WelcomePageProps {
  onNavigate: (page: string) => void;
}

const WelcomePage = ({ onNavigate }: WelcomePageProps) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Layer 1 — Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BG4})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* Layer 2 — Logo */}
      <img
        src={LogoApp}
        alt="Bibloo"
        loading="eager"
        decoding="async"
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          maxWidth: 280,
          zIndex: 2,
        }}
      />

      {/* Layer 3 — Saudação Bibi */}
      <img
        src={suadacao}
        alt="Bibi te dá boas-vindas"
        loading="eager"
        decoding="async"
        style={{
          position: "absolute",
          top: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "85%",
          maxWidth: 340,
          zIndex: 2,
        }}
      />

      {/* Layer 4 — CTA Button */}
      <button
        onClick={() => onNavigate("login")}
        style={{
          position: "absolute",
          bottom: 48,
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "fit-content",
          whiteSpace: "nowrap",
          zIndex: 3,
          background: "#F5A623",
          color: "white",
          fontWeight: "bold",
          borderRadius: 50,
          padding: "16px 40px",
          borderBottom: "4px solid #C47D0E",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          fontFamily: "KGPerfectPenmanship",
          fontSize: 18,
          minHeight: 44,
          cursor: "pointer",
          textTransform: "uppercase",
        }}
      >
        Vamos começar! →
      </button>
    </div>
  );
};

export default WelcomePage;
