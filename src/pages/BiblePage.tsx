import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

const oldTestamentBooks = [
  "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
];

const newTestamentBooks = [
  "Mateus", "Marcos", "Lucas", "João", "Atos",
];

interface BiblePageProps {
  onNavigate?: (page: string) => void;
}

const BiblePage = ({ onNavigate }: BiblePageProps) => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [chapter, setChapter] = useState(1);

  if (selectedBook) {
    return (
      <div
        className="mx-auto overflow-x-hidden"
        style={{ width: "100%", maxWidth: 428, minHeight: "100dvh", paddingBottom: 80 }}
      >
        <div className="flex items-center px-4 pt-6 mb-4">
          <button
            onClick={() => setSelectedBook(null)}
            className="flex items-center justify-center"
            style={{ minHeight: 44, minWidth: 44 }}
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <h1
            className="font-penmanship font-bold text-white flex-1 text-center mr-11"
            style={{ fontSize: "clamp(18px, 5vw, 24px)" }}
          >
            {selectedBook}
          </h1>
        </div>

        <motion.div
          key={chapter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4"
        >
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 20,
              padding: 20,
              minHeight: "60vh",
            }}
          >
            <h2 className="font-penmanship font-bold mb-4" style={{ color: "#4A2C0A" }}>
              {selectedBook} {chapter}
            </h2>
            <p style={{ color: "#6B4C2A", fontSize: "clamp(13px, 3.5vw, 16px)", lineHeight: 1.8 }}>
              <span className="font-bold" style={{ color: "#FF8C00" }}>1.</span> No princípio, Deus criou os céus e a terra.
            </p>
            <p className="text-center mt-8 italic" style={{ color: "#9CA3AF", fontSize: 12 }}>
              (Conteúdo será carregado via API)
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto overflow-x-hidden"
      style={{ width: "100%", maxWidth: 428, minHeight: "100dvh", paddingBottom: 80 }}
    >
      <div className="flex items-center px-4 pt-6 mb-4">
        {onNavigate && (
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center justify-center"
            style={{ minHeight: 44, minWidth: 44 }}
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
        )}
        <h1
          className="font-penmanship font-bold text-white flex-1 text-center"
          style={{ fontSize: "clamp(20px, 5.5vw, 28px)", marginRight: onNavigate ? 44 : 0 }}
        >
          Ler a Bíblia
        </h1>
      </div>

      {/* Two columns */}
      <div className="flex px-4 gap-3" style={{ minHeight: 0 }}>
        {/* Old Testament */}
        <div className="flex-1 flex flex-col">
          <h2
            className="font-penmanship font-bold text-white text-center mb-2"
            style={{ fontSize: "clamp(13px, 3.5vw, 16px)", color: "#4CAF50" }}
          >
            Velho Testamento
          </h2>
          <div
            className="overflow-y-auto flex flex-col gap-2"
            style={{ maxHeight: "60dvh" }}
          >
            {oldTestamentBooks.map((book) => (
              <button
                key={book}
                onClick={() => { setSelectedBook(book); setChapter(1); }}
                className="font-penmanship text-white font-bold"
                style={{
                  background: "#4CAF50",
                  borderRadius: 12,
                  padding: "10px 8px",
                  fontSize: "clamp(12px, 3.2vw, 14px)",
                  minHeight: 44,
                  borderBottom: "3px solid #2E7D32",
                  cursor: "pointer",
                }}
              >
                {book}
              </button>
            ))}
          </div>
        </div>

        {/* New Testament */}
        <div className="flex-1 flex flex-col">
          <h2
            className="font-penmanship font-bold text-white text-center mb-2"
            style={{ fontSize: "clamp(13px, 3.5vw, 16px)", color: "#4A90D9" }}
          >
            Novo Testamento
          </h2>
          <div
            className="overflow-y-auto flex flex-col gap-2"
            style={{ maxHeight: "60dvh" }}
          >
            {newTestamentBooks.map((book) => (
              <button
                key={book}
                onClick={() => { setSelectedBook(book); setChapter(1); }}
                className="font-penmanship text-white font-bold"
                style={{
                  background: "#4A90D9",
                  borderRadius: 12,
                  padding: "10px 8px",
                  fontSize: "clamp(12px, 3.2vw, 14px)",
                  minHeight: 44,
                  borderBottom: "3px solid #2B65A8",
                  cursor: "pointer",
                }}
              >
                {book}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiblePage;
