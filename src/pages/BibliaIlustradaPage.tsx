import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

// ── Story data (mapped from Turma da Mônica — Minha Primeira Bíblia) ────────

interface Story {
  id: number;
  title: string;
  subtitle: string;
  pages: number[]; // 1-based PDF page numbers
  testament: "OT" | "NT";
  emoji: string;
}

const STORIES: Story[] = [
  // ── ANTIGO TESTAMENTO ──
  { id: 1,  title: "O Começo",                 subtitle: "Gênesis 1–2",           pages: [12,13],         testament:"OT", emoji:"🌍" },
  { id: 2,  title: "A Desobediência",          subtitle: "Gênesis 3",             pages: [14,15,16],      testament:"OT", emoji:"🍎" },
  { id: 3,  title: "A Grande Arca de Noé",     subtitle: "Gênesis 6",             pages: [17],            testament:"OT", emoji:"⛵" },
  { id: 4,  title: "Abraão",                   subtitle: "Gênesis 12;18;25",      pages: [18,19],         testament:"OT", emoji:"🌟" },
  { id: 5,  title: "José, o Sonhador",         subtitle: "Gênesis 37–50",         pages: [20,21],         testament:"OT", emoji:"⭐" },
  { id: 6,  title: "Uma Criança no Palácio",   subtitle: "Êxodo 1–3",             pages: [22,23],         testament:"OT", emoji:"👶" },
  { id: 7,  title: "O Libertador",             subtitle: "Êxodo 4–14",            pages: [24,25],         testament:"OT", emoji:"🌊" },
  { id: 8,  title: "Os Mandamentos",           subtitle: "Êxodo 15–20",           pages: [26,27],         testament:"OT", emoji:"📜" },
  { id: 9,  title: "A Terra Prometida",        subtitle: "Josué 1–24",            pages: [28,29],         testament:"OT", emoji:"🏔️" },
  { id: 10, title: "Sansão e Dalila",          subtitle: "Juízes 13–16",          pages: [30,31],         testament:"OT", emoji:"💪" },
  { id: 11, title: "Mulheres Heroínas",        subtitle: "Rute; Judite; Ester",   pages: [32,33],         testament:"OT", emoji:"👑" },
  { id: 12, title: "O Menino Samuel",          subtitle: "1Samuel 3",             pages: [34,35],         testament:"OT", emoji:"🙏" },
  { id: 13, title: "Davi e Golias",            subtitle: "1Samuel 17",            pages: [36,37],         testament:"OT", emoji:"⚔️" },
  { id: 14, title: "Salomão, o Rei Sábio",     subtitle: "1Reis 2–3",             pages: [38,39],         testament:"OT", emoji:"🦁" },
  { id: 15, title: "Jó",                       subtitle: "Livro de Jó",           pages: [40,41],         testament:"OT", emoji:"🌤️" },
  { id: 16, title: "O Salmo do Pastor",        subtitle: "Salmo 23",              pages: [42,43],         testament:"OT", emoji:"🐑" },
  { id: 17, title: "Jonas na Baleia",          subtitle: "Jonas",                 pages: [44,45],         testament:"OT", emoji:"🐋" },
  { id: 18, title: "Os Profetas",              subtitle: "18 Livros Proféticos",  pages: [46,47,48],      testament:"OT", emoji:"📢" },
  // ── NOVO TESTAMENTO ──
  { id: 19, title: "A Visita do Anjo",         subtitle: "Lucas 1",               pages: [50,51],         testament:"NT", emoji:"👼" },
  { id: 20, title: "Nascimento de Jesus",      subtitle: "Mateus 1–2; Lucas 2",   pages: [52,53],         testament:"NT", emoji:"✨" },
  { id: 21, title: "Os Reis Magos",            subtitle: "Mateus 2",              pages: [54,55],         testament:"NT", emoji:"🌟" },
  { id: 22, title: "Jesus Criança",            subtitle: "Lucas 2",               pages: [56,57],         testament:"NT", emoji:"🕊️" },
  { id: 23, title: "Batismo de Jesus",         subtitle: "Mateus 3",              pages: [58,59],         testament:"NT", emoji:"💧" },
  { id: 24, title: "Jesus no Deserto",         subtitle: "Mateus 4",              pages: [60,61],         testament:"NT", emoji:"🏜️" },
  { id: 25, title: "Os Apóstolos",             subtitle: "Mateus 4; Marcos 1",    pages: [62,63],         testament:"NT", emoji:"👥" },
  { id: 26, title: "Sermão da Montanha",       subtitle: "Mateus 5",              pages: [64,65],         testament:"NT", emoji:"⛰️" },
  { id: 27, title: "O Filho Pródigo",          subtitle: "Lucas 15",              pages: [66,67],         testament:"NT", emoji:"🏠" },
  { id: 28, title: "O Homem Cego",             subtitle: "Mateus 20",             pages: [68,69],         testament:"NT", emoji:"👁️" },
  { id: 29, title: "A Samaritana",             subtitle: "João 4",                pages: [70,71],         testament:"NT", emoji:"🪣" },
  { id: 30, title: "Multiplicação dos Pães",   subtitle: "Mateus 14",             pages: [72,73],         testament:"NT", emoji:"🍞" },
  { id: 31, title: "Sobre as Águas",           subtitle: "Mateus 14",             pages: [74,75],         testament:"NT", emoji:"🌊" },
  { id: 32, title: "A Santa Ceia",             subtitle: "Mateus 26",             pages: [76,77],         testament:"NT", emoji:"🥖" },
  { id: 33, title: "Paixão de Cristo",         subtitle: "Mateus 27",             pages: [78,79],         testament:"NT", emoji:"✝️" },
  { id: 34, title: "Ressurreição",             subtitle: "Mateus 28",             pages: [80,81],         testament:"NT", emoji:"🌅" },
  { id: 35, title: "Jesus Reaparece",          subtitle: "Mateus 28; Lucas 24",   pages: [82,83],         testament:"NT", emoji:"☀️" },
  { id: 36, title: "O Espírito Santo",         subtitle: "Atos 2",                pages: [84,85],         testament:"NT", emoji:"🔥" },
  { id: 37, title: "Missão dos Discípulos",    subtitle: "Atos 2",                pages: [86,87],         testament:"NT", emoji:"🌍" },
  { id: 38, title: "A História Continua",      subtitle: "Mateus 28",             pages: [88,89],         testament:"NT", emoji:"📖" },
];

const OT_STORIES = STORIES.filter((s) => s.testament === "OT");
const NT_STORIES = STORIES.filter((s) => s.testament === "NT");

const GLOW = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";
const OT_COLOR = "#4CAF50";
const OT_BORDER = "#2E7D32";
const NT_COLOR = "#4A90D9";
const NT_BORDER = "#2B65A8";

// Public-folder images served at /biblia-ilustrada/page_NNN.jpg
function pageUrl(n: number) {
  return `/biblia-ilustrada/page_${String(n).padStart(3, "0")}.jpg`;
}

// ── Back Button ──────────────────────────────────────────────────────────────
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.45)",
        border: "2px solid rgba(255,215,0,0.5)",
        filter: GLOW,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <ChevronLeft className="text-white" size={22} />
    </button>
  );
}

// ── Story Card ───────────────────────────────────────────────────────────────
function StoryCard({ story, onSelect }: { story: Story; onSelect: (s: Story) => void }) {
  const isOT = story.testament === "OT";
  const accent = isOT ? OT_COLOR : NT_COLOR;
  const border = isOT ? OT_BORDER : NT_BORDER;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(story)}
      className="flex flex-col items-center text-left w-full"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <div
        className="w-full rounded-2xl overflow-hidden relative"
        style={{
          border: `2px solid ${accent}`,
          boxShadow: `0 4px 12px rgba(0,0,0,0.35)`,
          background: "#111",
        }}
      >
        <img
          src={pageUrl(story.pages[0])}
          alt={story.title}
          loading="lazy"
          className="w-full object-cover"
          style={{ display: "block", aspectRatio: "3/4" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 pt-6 pb-2 px-2"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
        >
          <p
            className="font-penmanship font-bold text-white leading-tight"
            style={{ fontSize: "clamp(9px, 2.6vw, 12px)" }}
          >
            {story.emoji} {story.title}
          </p>
        </div>
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full font-penmanship font-bold text-white"
          style={{
            background: accent,
            borderBottom: `2px solid ${border}`,
            fontSize: 8,
          }}
        >
          {story.subtitle}
        </div>
      </div>
    </motion.button>
  );
}

// ── Reader View ──────────────────────────────────────────────────────────────
function ReaderView({ story, onBack }: { story: Story; onBack: () => void }) {
  const [pageIdx, setPageIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const totalPages = story.pages.length;
  const currentPageNum = story.pages[pageIdx];

  const goPrev = () => setPageIdx((i) => Math.max(0, i - 1));
  const goNext = () => setPageIdx((i) => Math.min(totalPages - 1, i + 1));

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (dx < -50) goNext();
      else if (dx > 50) goPrev();
      touchStartX.current = null;
    },
    [pageIdx, totalPages]
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-3 py-2 flex-shrink-0"
        style={{
          paddingTop: "max(env(safe-area-inset-top, 0px), 12px)",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <BackBtn onClick={onBack} />
        <div className="flex flex-col flex-1 min-w-0">
          <h2 className="font-penmanship font-bold text-white truncate" style={{ fontSize: 15 }}>
            {story.emoji} {story.title}
          </h2>
          <p className="font-penmanship text-white/60" style={{ fontSize: 11 }}>
            {story.subtitle}
          </p>
        </div>
        <div
          className="flex items-center gap-1 font-penmanship px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,215,0,0.15)",
            border: "1px solid rgba(255,215,0,0.35)",
            color: "#FFD700",
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          <BookOpen size={12} />
          {pageIdx + 1}/{totalPages}
        </div>
      </div>

      {/* Page image */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPageNum}
            src={pageUrl(currentPageNum)}
            alt={`Página ${currentPageNum}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </AnimatePresence>

        {/* Tap zones for prev/next */}
        <button
          onClick={goPrev}
          disabled={pageIdx === 0}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "25%",
            background: "transparent",
            border: "none",
            cursor: pageIdx > 0 ? "pointer" : "default",
          }}
        />
        <button
          onClick={goNext}
          disabled={pageIdx === totalPages - 1}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "25%",
            background: "transparent",
            border: "none",
            cursor: pageIdx < totalPages - 1 ? "pointer" : "default",
          }}
        />
      </div>

      {/* Bottom nav bar */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 flex-shrink-0"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={goPrev}
          disabled={pageIdx === 0}
          className="flex items-center gap-1 font-penmanship font-bold text-white px-4 py-2 rounded-2xl"
          style={{
            background: pageIdx > 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            opacity: pageIdx > 0 ? 1 : 0.3,
            cursor: pageIdx > 0 ? "pointer" : "default",
            fontSize: 13,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ChevronLeft size={16} /> Anterior
        </motion.button>

        {/* Dot indicators */}
        <div className="flex gap-1.5 items-center">
          {story.pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPageIdx(i)}
              style={{
                width: i === pageIdx ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === pageIdx ? "#FFD700" : "rgba(255,255,255,0.3)",
                transition: "all 0.2s",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={goNext}
          disabled={pageIdx === totalPages - 1}
          className="flex items-center gap-1 font-penmanship font-bold text-white px-4 py-2 rounded-2xl"
          style={{
            background: pageIdx < totalPages - 1 ? "rgba(255,215,0,0.25)" : "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,215,0,0.3)",
            opacity: pageIdx < totalPages - 1 ? 1 : 0.3,
            cursor: pageIdx < totalPages - 1 ? "pointer" : "default",
            fontSize: 13,
            flex: 1,
            justifyContent: "center",
          }}
        >
          Próxima <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}

// ── Story List View ──────────────────────────────────────────────────────────
function StoryListView({
  onSelectStory,
  onBack,
}: {
  onSelectStory: (s: Story) => void;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div style={{ maxWidth: 428, margin: "0 auto", paddingTop: "env(safe-area-inset-top, 0px)" }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <BackBtn onClick={onBack} />
          <div className="flex-1">
            <h1
              className="font-penmanship font-bold text-white"
              style={{ fontSize: "clamp(18px, 5vw, 24px)", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}
            >
              🎨 Bíblia Ilustrada Bibloo
            </h1>
            <p className="font-penmanship text-white/70 text-xs mt-0.5">
              Turma da Mônica • 38 histórias
            </p>
          </div>
        </div>

        {/* Section: Old Testament */}
        <div className="px-4 mb-4">
          <div
            className="flex items-center gap-2 py-2 mb-3 rounded-xl px-3"
            style={{ background: `${OT_COLOR}22`, border: `1px solid ${OT_COLOR}44` }}
          >
            <span style={{ fontSize: 18 }}>📜</span>
            <h2
              className="font-penmanship font-bold"
              style={{ color: OT_COLOR, fontSize: "clamp(13px, 3.5vw, 16px)" }}
            >
              Antigo Testamento
            </h2>
            <span
              className="ml-auto font-penmanship px-2 py-0.5 rounded-full text-white"
              style={{ background: OT_COLOR, fontSize: 11 }}
            >
              {OT_STORIES.length}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {OT_STORIES.map((story) => (
              <StoryCard key={story.id} story={story} onSelect={onSelectStory} />
            ))}
          </div>
        </div>

        {/* Section: New Testament */}
        <div className="px-4 mb-4">
          <div
            className="flex items-center gap-2 py-2 mb-3 rounded-xl px-3"
            style={{ background: `${NT_COLOR}22`, border: `1px solid ${NT_COLOR}44` }}
          >
            <span style={{ fontSize: 18 }}>✝️</span>
            <h2
              className="font-penmanship font-bold"
              style={{ color: NT_COLOR, fontSize: "clamp(13px, 3.5vw, 16px)" }}
            >
              Novo Testamento
            </h2>
            <span
              className="ml-auto font-penmanship px-2 py-0.5 rounded-full text-white"
              style={{ background: NT_COLOR, fontSize: 11 }}
            >
              {NT_STORIES.length}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {NT_STORIES.map((story) => (
              <StoryCard key={story.id} story={story} onSelect={onSelectStory} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
interface BibliaIlustradaPageProps {
  onNavigate?: (page: string) => void;
  initialStoryId?: number;
}

const BibliaIlustradaPage = ({ onNavigate, initialStoryId }: BibliaIlustradaPageProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(
    initialStoryId ? (STORIES.find((s) => s.id === initialStoryId) ?? null) : null
  );

  if (selectedStory) {
    return (
      <ReaderView
        story={selectedStory}
        onBack={() => setSelectedStory(null)}
      />
    );
  }

  return (
    <StoryListView
      onSelectStory={setSelectedStory}
      onBack={() => onNavigate?.("bible")}
    />
  );
};

export default BibliaIlustradaPage;
export { STORIES };
