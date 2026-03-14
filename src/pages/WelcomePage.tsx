import BG3 from "@/assets/BG3.png";

interface WelcomePageProps {
  onNavigate: (page: string) => void;
}

const WelcomePage = ({ onNavigate }: WelcomePageProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${BG3})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <button
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          zIndex: 10,
          background: "#F5A623",
          color: "white",
          fontWeight: "bold",
          borderRadius: "50px",
          padding: "16px 40px",
          borderBottom: "4px solid #C47D0E",
          fontFamily: "KGPerfectPenmanship",
          fontSize: "18px",
          minHeight: "44px",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          cursor: "pointer",
        }}
        onClick={() => onNavigate("signup")}
      >
        Vamos começar! →
      </button>
    </div>
  );
};

export default WelcomePage;
