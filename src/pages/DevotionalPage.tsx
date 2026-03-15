import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import bibiMascot from "@/assets/bibi-mascot.png";
import storyJesus from "@/assets/story-jesus-children.jpg";

const GLOW_FILTER = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

interface DevotionalPageProps {
  onNavigate?: (page: string) => void;
}

const DevotionalPage = ({ onNavigate }: DevotionalPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Back button */}
      {onNavigate && (
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
      )}

      <div className="bg-gradient-gold p-4 pt-8 pb-6 text-center shadow-cartoon">
        <h1 className="font-display text-2xl text-primary-foreground font-bold">🌅 Devocional do Dia</h1>
        <p className="font-body text-sm text-primary-foreground/80 mt-1">Mensagens de Jesus</p>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-bibloo-parchment rounded-2xl overflow-hidden shadow-card border border-border"
        >
          <img src={storyJesus} alt="Devocional" className="w-full aspect-video object-cover" />
          <div className="p-5">
            <h2 className="font-display text-lg text-foreground font-bold mb-2">Mensagem de Hoje</h2>
            <p className="font-body text-sm text-foreground/80 leading-relaxed italic">
              "O meu mandamento é este: amem-se uns aos outros como eu os amei."
            </p>
            <p className="font-body text-xs text-muted-foreground mt-2">João 15:12</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-3 bg-bibloo-cream rounded-2xl p-4 shadow-card"
        >
          <img src={bibiMascot} alt="Bibi" className="w-14 h-14 flex-shrink-0" />
          <div>
            <p className="font-display text-sm text-foreground font-bold">A Bibi diz:</p>
            <p className="font-body text-sm text-foreground/70 mt-1">
              Vamos refletir e orar sobre essa mensagem hoje? Converse com seus pais! 🙏
            </p>
          </div>
        </motion.div>

        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-gold rounded-xl py-3 font-display text-sm text-primary-foreground font-bold shadow-button btn-press">
            Refletir e Orar
          </button>
          <button className="flex-1 bg-bibloo-parchment rounded-xl py-3 font-display text-sm text-foreground font-bold shadow-card btn-press border border-border">
            Próximo →
          </button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 shadow-card border border-primary/20"
        >
          <h3 className="font-display text-base text-foreground font-bold">🏆 Desafio 365 Dias</h3>
          <p className="font-body text-xs text-muted-foreground mt-1">Semana 1 • 3 de 7 mensagens lidas</p>
          <div className="flex gap-1.5 mt-3">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-display text-xs font-bold ${
                  day <= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevotionalPage;
