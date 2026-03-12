import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const oldTestamentBooks = [
  "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
  "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
  "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas",
];

const newTestamentBooks = [
  "Mateus", "Marcos", "Lucas", "João", "Atos",
  "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas",
  "Efésios", "Filipenses", "Colossenses",
];

const BiblePage = () => {
  const [testament, setTestament] = useState<"old" | "new">("old");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [chapter, setChapter] = useState(1);

  const books = testament === "old" ? oldTestamentBooks : newTestamentBooks;

  if (selectedBook) {
    return (
      <div className="min-h-screen bg-bibloo-parchment">
        {/* Reader Header */}
        <div className="bg-gradient-wood p-4 pt-8 flex items-center gap-3">
          <button
            onClick={() => setSelectedBook(null)}
            className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center btn-press"
          >
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <h1 className="font-display text-lg text-primary-foreground font-bold">{selectedBook}</h1>
          <span className="font-body text-sm text-primary-foreground/70 ml-auto">Cap. {chapter}</span>
        </div>

        {/* Bible Text Area */}
        <motion.div
          key={chapter}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 max-w-lg mx-auto"
          style={{ perspective: "1000px" }}
        >
          <div className="bg-primary-foreground/80 rounded-2xl p-6 shadow-card border border-border min-h-[60vh]">
            <h2 className="font-display text-xl text-foreground mb-4">{selectedBook} {chapter}</h2>
            <div className="font-body text-foreground/80 leading-relaxed space-y-3 text-sm">
              <p><span className="font-bold text-primary">1.</span> No princípio, Deus criou os céus e a terra.</p>
              <p><span className="font-bold text-primary">2.</span> E a terra era sem forma e vazia; e havia trevas sobre a face do abismo.</p>
              <p><span className="font-bold text-primary">3.</span> E disse Deus: "Haja luz"; e houve luz.</p>
              <p><span className="font-bold text-primary">4.</span> E viu Deus que a luz era boa; e fez Deus separação entre a luz e as trevas.</p>
              <p className="text-center text-muted-foreground text-xs mt-8 italic">
                (Conteúdo da Bíblia será carregado via API)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chapter Navigation */}
        <div className="fixed bottom-28 left-0 right-0 flex justify-center gap-4 px-6">
          <button
            onClick={() => setChapter(Math.max(1, chapter - 1))}
            disabled={chapter === 1}
            className="flex items-center gap-1 bg-gradient-gold rounded-full px-5 py-2.5 shadow-button btn-press font-display text-sm text-primary-foreground disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>
          <button
            onClick={() => setChapter(chapter + 1)}
            className="flex items-center gap-1 bg-gradient-gold rounded-full px-5 py-2.5 shadow-button btn-press font-display text-sm text-primary-foreground"
          >
            Próximo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-gradient-wood p-4 pt-8 pb-6 text-center">
        <h1 className="font-display text-2xl text-primary-foreground font-bold">📖 Bíblia</h1>
        <p className="font-body text-sm text-primary-foreground/70 mt-1">Selecione um livro para ler</p>
      </div>

      {/* Testament Toggle */}
      <div className="flex gap-2 px-4 -mt-4 max-w-md mx-auto">
        <button
          onClick={() => setTestament("old")}
          className={`flex-1 py-2.5 rounded-xl font-display text-sm font-bold btn-press shadow-cartoon transition-colors ${
            testament === "old"
              ? "bg-gradient-gold text-primary-foreground"
              : "bg-bibloo-parchment text-foreground"
          }`}
        >
          Velho Testamento
        </button>
        <button
          onClick={() => setTestament("new")}
          className={`flex-1 py-2.5 rounded-xl font-display text-sm font-bold btn-press shadow-cartoon transition-colors ${
            testament === "new"
              ? "bg-gradient-gold text-primary-foreground"
              : "bg-bibloo-parchment text-foreground"
          }`}
        >
          Novo Testamento
        </button>
      </div>

      {/* Books Grid */}
      <motion.div
        key={testament}
        initial={{ opacity: 0, x: testament === "old" ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="grid grid-cols-2 gap-2.5 p-4 max-w-md mx-auto"
      >
        {books.map((book) => (
          <motion.button
            key={book}
            onClick={() => { setSelectedBook(book); setChapter(1); }}
            className="bg-bibloo-parchment/90 rounded-xl py-3 px-4 shadow-card btn-press text-left border border-border hover:border-primary transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-display text-sm font-semibold text-foreground">{book}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default BiblePage;
