import { ChevronLeft } from "lucide-react";

interface ParentalAreaPageProps {
  onNavigate: (page: string) => void;
}

const ParentalAreaPage = ({ onNavigate }: ParentalAreaPageProps) => {
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
          Área dos Pais
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <p className="text-white text-center" style={{ fontSize: "clamp(14px, 3.5vw, 16px)" }}>
          Configurações parentais em breve.
        </p>
      </div>
    </div>
  );
};

export default ParentalAreaPage;
