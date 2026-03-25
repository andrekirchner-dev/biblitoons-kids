import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bibiMascot from "@/assets/bibi-mascot.png";
import storyJesus from "@/assets/story-jesus-children.jpg";
import BG5 from "@/assets/BG5.png";

const GLOW_FILTER =
  "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

interface DevotionalPageProps {
  onNavigate?: (page: string) => void;
}

const DEVOTIONALS = [
  {
    verse: '"O meu mandamento é este: amem-se uns aos outros como eu os amei."',
    ref: "João 15:12",
    title: "Amor de Jesus",
    bibi: "Vamos refletir e orar sobre essa mensagem hoje? Converse com seus pais! 🙏",
  },
  {
    verse: '"Porque Deus tanto amou o mundo que deu o seu Filho Unigênito."',
    ref: "João 3:16",
    title: "O Maior Amor",
    bibi: "Jesus te ama tanto! Que tal desenhar como você se sente? 🎨",
  },
  {
    verse: '"Alegrem-se sempre no Senhor. Novamente digo: Alegrem-se!"',
    ref: "Filipenses 4:4",
    title: "Alegria no Senhor",
    bibi: "A alegria de Jesus enche o coração! Sorria hoje! 😊",
  },
  {
    verse: '"O Senhor é o meu pastor; de nada me faltará."',
    ref: "Salmos 23:1",
    title: "O Bom Pastor",
    bibi: "Jesus cuida de você como um pastor cuida das ovelhinhas! 🐑",
  },
  {
    verse: '"Deixai vir a mim as crianças, pois o Reino de Deus é delas."',
    ref: "Lucas 18:16",
    title: "Crianças de Jesus",
    bibi: "Você é muito especial para Jesus! Ele quer você perto Dele! 💛",
  },
  {
    verse: '"Tudo posso naquele que me fortalece."',
    ref: "Filipenses 4:13",
    title: "Força de Deus",
    bibi: "Com Jesus você consegue! Nunca desista! 💪",
  },
  {
    verse: '"Sede bondosos uns para com os outros, misericordiosos."',
    ref: "Efésios 4:32",
    title: "Bondade",
    bibi: "Que você seja bondoso com todos hoje! Isso agrada a Jesus! 🌟",
  },
];

const TOTAL_WEEKS = 52;
const DAYS_PER_WEEK = 7;

type DayStatus = "done" | "today" | "locked";

function getDayStatus(
  week: number,
  day: number,
  daysCompleted: number
): DayStatus {
  const absoluteDay = (week - 1) * 7 + day;
  const todayAbsolute = daysCompleted + 1;
  if (absoluteDay < todayAbsolute) return "done";
  if (absoluteDay === todayAbsolute) return "today";
  return "locked";
}

const DevotionalPage = ({ onNavigate }: DevotionalPageProps) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [daysCompleted] = useState(2);
  const [devotionalIndex, setDevotionalIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<{ week: number; day: number } | null>(null);

  const devotional = DEVOTIONALS[devotionalIndex % DEVOTIONALS.length];

  const goNextWeek = () => setCurrentWeek((w) => Math.min(w + 1, TOTAL_WEEKS));
  const goPrevWeek = () => setCurrentWeek((w) => Math.max(w - 1, 1));

  const handleDayClick = (day: number) => {
    const status = getDayStatus(currentWeek, day, daysCompleted);
    if (status === "locked") return;
    setSelectedDay({ week: currentWeek, day });
    const idx = (currentWeek - 1) * 7 + day - 1;
    setDevotionalIndex(idx);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        overflowY: "auto",
        backgroundImage: `url(${BG5})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)", zIndex: 0 }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 428,
          margin: "0 auto",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* Back button */}
        {onNavigate && (
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center justify-center"
            style={{
              margin: "16px 0 0 12px",
              minHeight: 44,
              minWidth: 44,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.3)",
              border: "none",
              cursor: "pointer",
              filter: GLOW_FILTER,
            }}
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
        )}

        {/* Header */}
        <div className="text-center px-4 py-3">
          <h1
            className="font-penmanship font-bold text-white"
            style={{
              fontSize: "clamp(22px, 6vw, 30px)",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            🌅 Devocional do Dia
          </h1>
          <p className="font-penmanship text-white/80 text-sm mt-1">Mensagens de Jesus</p>
        </div>

        <div className="px-4 space-y-4 pb-4">
          {/* Devotional card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={devotionalIndex}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ border: "2px solid rgba(255,215,0,0.4)" }}
            >
              <img
                src={storyJesus}
                alt="Devocional"
                className="w-full object-cover"
                style={{ height: 160, filter: "brightness(0.85)" }}
              />
              <div className="p-4" style={{ background: "rgba(255,248,235,0.97)" }}>
                <h2 className="font-penmanship font-bold text-amber-900 text-base mb-1">
                  {devotional.title}
                </h2>
                <p className="font-penmanship text-sm text-gray-700 leading-relaxed italic">
                  {devotional.verse}
                </p>
                <p className="font-penmanship text-xs text-amber-600 font-bold mt-2">
                  {devotional.ref}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bibi card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-3 rounded-2xl p-3 shadow-md"
            style={{
              background: "rgba(255,248,235,0.93)",
              border: "1.5px solid rgba(255,215,0,0.35)",
            }}
          >
            <img src={bibiMascot} alt="Bibi" className="w-12 h-12 flex-shrink-0" />
            <div>
              <p className="font-penmanship font-bold text-amber-900 text-sm">A Bibi diz:</p>
              <p className="font-penmanship text-sm text-gray-600 mt-0.5 leading-relaxed">
                {devotional.bibi}
              </p>
            </div>
          </motion.div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              className="flex-1 rounded-2xl py-3.5 font-penmanship font-bold text-white text-sm shadow-lg"
              style={{
                background: "linear-gradient(180deg, #FFB800 0%, #FF8C00 100%)",
                borderBottom: "4px solid #CC6600",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => onNavigate && onNavigate("reflect")}
            >
              🙏 Refletir e Orar
            </button>
            <button
              className="flex-1 rounded-2xl py-3.5 font-penmanship font-bold text-amber-900 text-sm shadow-md"
              style={{
                background: "rgba(255,248,235,0.93)",
                border: "2px solid rgba(255,215,0,0.4)",
                cursor: "pointer",
              }}
              onClick={() => setDevotionalIndex((i) => i + 1)}
            >
              Próximo →
            </button>
          </div>

          {/* 365-day challenge */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-4 shadow-lg"
            style={{
              background: "rgba(255,248,235,0.96)",
              border: "2px solid rgba(255,215,0,0.4)",
            }}
          >
            {/* Week navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={goPrevWeek}
                disabled={currentWeek <= 1}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
                style={{
                  background: "#FFB800",
                  border: "none",
                  cursor: currentWeek <= 1 ? "default" : "pointer",
                }}
              >
                <ChevronLeft size={16} className="text-white" />
              </button>
              <div className="text-center">
                <h3 className="font-penmanship font-bold text-amber-900 text-sm">
                  🏆 Desafio 365 Dias
                </h3>
                <p className="font-penmanship text-xs text-amber-600 mt-0.5">
                  Semana {currentWeek} de {TOTAL_WEEKS}
                </p>
              </div>
              <button
                onClick={goNextWeek}
                disabled={currentWeek >= TOTAL_WEEKS}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
                style={{
                  background: "#FFB800",
                  border: "none",
                  cursor: currentWeek >= TOTAL_WEEKS ? "default" : "pointer",
                }}
              >
                <ChevronRight size={16} className="text-white" />
              </button>
            </div>

            {/* Day buttons */}
            <div className="flex gap-1.5 justify-between">
              {Array.from({ length: DAYS_PER_WEEK }, (_, i) => i + 1).map((day) => {
                const status = getDayStatus(currentWeek, day, daysCompleted);
                const isSelected =
                  selectedDay?.week === currentWeek && selectedDay?.day === day;
                return (
                  <motion.button
                    key={day}
                    whileTap={status !== "locked" ? { scale: 0.88 } : {}}
                    onClick={() => handleDayClick(day)}
                    className="flex-1 rounded-xl flex items-center justify-center font-penmanship font-bold text-xs"
                    style={{
                      aspectRatio: "1",
                      background:
                        status === "done"
                          ? "linear-gradient(180deg, #FFB800, #FF8C00)"
                          : status === "today"
                          ? "linear-gradient(180deg, #4CAF50, #388E3C)"
                          : "rgba(0,0,0,0.07)",
                      color:
                        status === "done" || status === "today" ? "white" : "#9CA3AF",
                      border: isSelected
                        ? "2.5px solid #FFD700"
                        : status === "today"
                        ? "2px solid #2E7D32"
                        : "1.5px solid rgba(0,0,0,0.08)",
                      cursor: status === "locked" ? "default" : "pointer",
                      boxShadow:
                        status !== "locked" ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
                      transform: isSelected ? "scale(1.1)" : "scale(1)",
                      transition: "transform 0.15s",
                    }}
                  >
                    {status === "done" ? "✓" : day}
                  </motion.button>
                );
              })}
            </div>

            {/* Progress bar */}
            <div
              className="mt-3 rounded-full overflow-hidden"
              style={{ height: 6, background: "rgba(0,0,0,0.08)" }}
            >
              <motion.div
                animate={{
                  width: `${((daysCompleted + 1) / (TOTAL_WEEKS * DAYS_PER_WEEK)) * 100}%`,
                }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #FFB800, #FF8C00)" }}
              />
            </div>
            <p className="font-penmanship text-xs text-amber-600 text-center mt-1">
              {daysCompleted + 1} / 365 dias completos
            </p>
          </motion.div>
        </div>
      </div>

      {/* Day detail overlay */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-end justify-center z-50"
            style={{ background: "rgba(0,0,0,0.65)" }}
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="w-full rounded-t-3xl p-6"
              style={{ background: "#FFF8F0", maxWidth: 428 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto mb-4" />
              <h3 className="font-penmanship font-bold text-amber-900 text-base text-center mb-2">
                Semana {selectedDay.week} — Dia {selectedDay.day}
              </h3>
              <p className="font-penmanship text-sm text-gray-600 italic text-center leading-relaxed">
                {
                  DEVOTIONALS[
                    ((selectedDay.week - 1) * 7 + selectedDay.day - 1) %
                      DEVOTIONALS.length
                  ].verse
                }
              </p>
              <p className="font-penmanship text-xs text-amber-600 font-bold text-center mt-2">
                {
                  DEVOTIONALS[
                    ((selectedDay.week - 1) * 7 + selectedDay.day - 1) %
                      DEVOTIONALS.length
                  ].ref
                }
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setSelectedDay(null);
                    onNavigate && onNavigate("reflect");
                  }}
                  className="flex-1 rounded-2xl py-3 font-penmanship font-bold text-white text-sm"
                  style={{
                    background: "linear-gradient(180deg, #FFB800, #FF8C00)",
                    borderBottom: "3px solid #CC6600",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🙏 Refletir
                </button>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="flex-1 rounded-2xl py-3 font-penmanship font-bold text-amber-900 text-sm"
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    border: "1.5px solid rgba(0,0,0,0.12)",
                    cursor: "pointer",
                  }}
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DevotionalPage;
