import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, Clock, Star } from "lucide-react";
import storyNoah from "@/assets/story-noah.jpg";
import storyDavid from "@/assets/story-david.jpg";
import storyMoses from "@/assets/story-moses.jpg";
import storyCreation from "@/assets/story-creation.jpg";
import storyJesus from "@/assets/story-jesus-children.jpg";

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  synopsis: string;
  verse: string;
  ageRange: string;
}

interface BibliaFlixPageProps {
  onNavigate?: (page: string) => void;
}

const videoCategories = [
  {
    title: "🔥 Populares",
    videos: [
      {
        id: "1", title: "A Criação", thumbnail: storyCreation, duration: "5:21",
        synopsis: "No princípio, Deus criou o céu e a terra. Em seis dias, Ele criou a luz, o mar, as plantas, os animais e, por fim, o homem e a mulher. Uma história incrível sobre o poder e o amor de Deus por toda a criação.",
        verse: "Gênesis 1:1", ageRange: "4–8 anos",
      },
      {
        id: "2", title: "Noé e a Arca", thumbnail: storyNoah, duration: "4:07",
        synopsis: "Noé era um homem justo que obedecia a Deus. Quando Deus decidiu mandar uma chuva grande, Ele pediu a Noé que construísse uma arca enorme e colocasse nela dois animais de cada espécie para salvá-los.",
        verse: "Gênesis 6:9", ageRange: "4–8 anos",
      },
      {
        id: "3", title: "Davi e Golias", thumbnail: storyDavid, duration: "3:45",
        synopsis: "O jovem pastor Davi enfrentou o gigante Golias com apenas uma pedra e muita fé em Deus. Essa história mostra que com Deus ao nosso lado, podemos superar qualquer obstáculo, por maior que pareça!",
        verse: "1 Samuel 17:45", ageRange: "5–9 anos",
      },
    ],
  },
  {
    title: "✨ Novo Testamento",
    videos: [
      {
        id: "4", title: "Jesus e as Crianças", thumbnail: storyJesus, duration: "4:30",
        synopsis: "Quando as crianças queriam se aproximar de Jesus, os discípulos tentaram afastá-las. Mas Jesus disse: 'Deixai as crianças virem a mim!' Ele as abraçou e abençoou cada uma delas com muito amor.",
        verse: "Marcos 10:14", ageRange: "3–7 anos",
      },
      {
        id: "5", title: "Moisés no Cesto", thumbnail: storyMoses, duration: "3:40",
        synopsis: "Para salvar o bebê Moisés, sua mãe o colocou em um cestinho no Rio Nilo. A princesa do Egito encontrou o cesto e adotou Moisés como seu filho — Deus tinha um grande plano para ele!",
        verse: "Êxodo 2:2", ageRange: "4–8 anos",
      },
      {
        id: "6", title: "A Criação", thumbnail: storyCreation, duration: "5:21",
        synopsis: "No princípio, Deus criou o céu e a terra. Em seis dias, Ele criou a luz, o mar, as plantas, os animais e, por fim, o homem e a mulher. Uma história incrível sobre o poder e o amor de Deus.",
        verse: "Gênesis 1:1", ageRange: "4–8 anos",
      },
    ],
  },
  {
    title: "🌟 Velho Testamento",
    videos: [
      {
        id: "7", title: "Noé e a Arca", thumbnail: storyNoah, duration: "4:07",
        synopsis: "Noé era um homem justo que obedecia a Deus. Quando Deus decidiu mandar uma chuva grande, Ele pediu a Noé que construísse uma arca enorme para salvar os animais e sua família.",
        verse: "Gênesis 6:9", ageRange: "4–8 anos",
      },
      {
        id: "8", title: "Davi e Golias", thumbnail: storyDavid, duration: "3:45",
        synopsis: "O jovem pastor Davi enfrentou o gigante Golias com apenas uma pedra e muita fé em Deus. Uma história de coragem e confiança que inspira crianças a nunca desistir!",
        verse: "1 Samuel 17:45", ageRange: "5–9 anos",
      },
      {
        id: "9", title: "Moisés no Cesto", thumbnail: storyMoses, duration: "3:40",
        synopsis: "Para salvar o bebê Moisés, sua mãe o colocou em um cestinho no Rio Nilo. A princesa do Egito encontrou o cesto e adotou Moisés — o início de uma história de libertação e fé!",
        verse: "Êxodo 2:2", ageRange: "4–8 anos",
      },
    ],
  },
];

const GLOW = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

const BibliaFlixPage = ({ onNavigate }: BibliaFlixPageProps) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (selectedVideo) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0D0D1A",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* Video Player — fixed height, no overlap */}
        <div
          className="relative flex-shrink-0"
          style={{
            background: "#111",
            aspectRatio: "16/9",
            maxHeight: "42dvh",
            overflow: "hidden",
          }}
        >
          <img
            src={selectedVideo.thumbnail}
            alt={selectedVideo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "rgba(255,165,0,0.9)" }}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-1" />
              )}
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { setSelectedVideo(null); setIsPlaying(false); }}
            className="absolute top-4 left-4"
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(0,0,0,0.45)", border: "2px solid rgba(255,215,0,0.5)",
              filter: GLOW, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Synopsis card — scrollable area below video */}
        <div
          className="flex-1 overflow-y-auto pt-4 pb-4 px-4 space-y-4"
          style={{ background: "#1A1A2E", borderRadius: "24px 24px 0 0" }}
        >
          {/* Title & meta */}
          <div>
            <h2 className="font-penmanship font-bold text-white text-xl leading-tight">{selectedVideo.title}</h2>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-amber-400" />
                <span className="font-penmanship text-xs text-white/60">{selectedVideo.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-amber-400" />
                <span className="font-penmanship text-xs text-amber-400">{selectedVideo.ageRange}</span>
              </div>
              <span
                className="font-penmanship text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,215,0,0.2)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}
              >
                📖 {selectedVideo.verse}
              </span>
            </div>
          </div>

          {/* Synopsis */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-2">📝 Sobre esta história</p>
            <p className="font-penmanship text-white/80 text-sm leading-relaxed">{selectedVideo.synopsis}</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 py-3 rounded-2xl font-penmanship font-bold text-white flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(90deg,#FFB800,#FF8C00)", cursor: "pointer" }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? "Pausar" : "Assistir agora"}
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflowY: "auto",
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "calc(68px + env(safe-area-inset-bottom, 0px))",
      }}
    >

      <div style={{ position: "relative", zIndex: 1, maxWidth: 428, margin: "0 auto" }}>
        {/* Header with back button */}
        <div className="flex items-center px-3 pt-4 pb-3">
          {onNavigate && (
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => onNavigate("home")}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(0,0,0,0.45)", border: "2px solid rgba(255,215,0,0.5)",
                filter: GLOW, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}
            >
              <ChevronLeft className="text-white" size={22} />
            </motion.button>
          )}
          <div className="flex-1 text-center" style={{ marginRight: onNavigate ? 44 : 0 }}>
            <h1
              className="font-penmanship font-bold text-white"
              style={{
                fontSize: "clamp(20px, 5.5vw, 28px)",
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              🎬 BíbliaFlix
            </h1>
            <p className="font-penmanship text-white/75 text-xs mt-0.5">
              Vídeos das histórias da Bíblia
            </p>
          </div>
        </div>

        {/* Category rows */}
        <div className="py-2 space-y-5">
          {videoCategories.map((cat) => (
            <VideoRow key={cat.title} category={cat} onSelect={setSelectedVideo} />
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoRow = ({
  category,
  onSelect,
}: {
  category: { title: string; videos: VideoItem[] };
  onSelect: (v: VideoItem) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <h3
        className="font-penmanship font-bold text-white px-4 mb-2"
        style={{ fontSize: 14, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
      >
        {category.title}
      </h3>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 scrollbar-hide snap-x snap-mandatory"
      >
        {category.videos.map((video) => (
          <motion.button
            key={video.id}
            onClick={() => onSelect(video)}
            className="flex-shrink-0 w-40 md:w-48 snap-start"
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "3/4",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                border: "1.5px solid rgba(255,255,255,0.15)",
              }}
            >
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="font-penmanship font-bold text-white text-xs">{video.title}</p>
                <p className="font-penmanship text-[10px] text-white/70">{video.duration}</p>
              </div>
              <div
                className="absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,165,0,0.88)" }}
              >
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BibliaFlixPage;
