import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft } from "lucide-react";
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
}

interface BibliaFlixPageProps {
  onNavigate?: (page: string) => void;
}

const videoCategories = [
  {
    title: "🔥 Populares",
    videos: [
      { id: "1", title: "A Criação", thumbnail: storyCreation, duration: "5:21" },
      { id: "2", title: "Noé e a Arca", thumbnail: storyNoah, duration: "4:07" },
      { id: "3", title: "Davi e Golias", thumbnail: storyDavid, duration: "3:45" },
    ],
  },
  {
    title: "✨ Novo Testamento",
    videos: [
      { id: "4", title: "Jesus e as Crianças", thumbnail: storyJesus, duration: "4:30" },
      { id: "5", title: "Moisés no Cesto", thumbnail: storyMoses, duration: "3:40" },
      { id: "6", title: "A Criação", thumbnail: storyCreation, duration: "5:21" },
    ],
  },
  {
    title: "🌟 Velho Testamento",
    videos: [
      { id: "7", title: "Noé e a Arca", thumbnail: storyNoah, duration: "4:07" },
      { id: "8", title: "Davi e Golias", thumbnail: storyDavid, duration: "3:45" },
      { id: "9", title: "Moisés no Cesto", thumbnail: storyMoses, duration: "3:40" },
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
          background: "#000",
          overflowY: "auto",
          paddingBottom: "calc(68px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* Video Player */}
        <div className="relative aspect-video" style={{ background: "#111" }}>
          <img
            src={selectedVideo.thumbnail}
            alt={selectedVideo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg btn-press"
              style={{ background: "rgba(255,165,0,0.9)" }}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-1" />
              )}
            </button>
          </div>
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 left-4"
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
            }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="rounded-xl px-3 py-2" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
              <p className="font-penmanship font-bold text-white text-sm">{selectedVideo.title}</p>
              <p className="font-penmanship text-xs text-white/70">{selectedVideo.duration}</p>
            </div>
          </div>
        </div>

        {/* More videos */}
        <div className="rounded-t-3xl -mt-4 relative z-10 pt-6 pb-8" style={{ background: "#1A1A2E" }}>
          <h2 className="font-penmanship font-bold text-white px-4 mb-4 text-base">Mais vídeos</h2>
          {videoCategories.slice(0, 1).map((cat) => (
            <VideoRow key={cat.title} category={cat} onSelect={setSelectedVideo} />
          ))}
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
            <button
              onClick={() => onNavigate("home")}
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
