import { ChevronLeft } from "lucide-react";

interface MiniGamesPageProps {
  onNavigate: (page: string) => void;
}

const MiniGamesPage = ({ onNavigate }: MiniGamesPageProps) => {
  return (
    <div
      className="mx-auto overflow-x-hidden flex flex-col"
      style={{ width: "100%", maxWidth: 428, minHeight: "100dvh" }}
    >
      <div className="flex items-center px-4 pt-6 mb-8">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center justify-center"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <h1
          className="font-penmanship font-bold text-white flex-1 text-center mr-11"
          style={{ fontSize: "clamp(20px, 5.5vw, 28px)" }}
        >
          Mini-games
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="font-penmanship font-bold text-white" style={{ fontSize: "clamp(20px, 5.5vw, 28px)" }}>
          Em breve!
        </p>
      </div>
    </div>
  );
};

export default MiniGamesPage;
