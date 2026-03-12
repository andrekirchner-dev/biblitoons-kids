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

const BibliaFlixPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-foreground">
        {/* Video Player */}
        <div className="relative aspect-video bg-foreground">
          <img
            src={selectedVideo.thumbnail}
            alt={selectedVideo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-glow btn-press"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-primary-foreground" />
              ) : (
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              )}
            </button>
          </div>
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-foreground/50 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-foreground/60 rounded-lg px-3 py-2 backdrop-blur-sm">
              <p className="font-display text-sm text-primary-foreground font-bold">{selectedVideo.title}</p>
              <p className="font-body text-xs text-primary-foreground/70">{selectedVideo.duration}</p>
            </div>
          </div>
        </div>

        {/* Remaining catalog below player */}
        <div className="bg-background rounded-t-3xl -mt-4 relative z-10 pt-6 pb-24 min-h-[50vh]">
          <h2 className="font-display text-lg text-foreground px-4 mb-4">Mais vídeos</h2>
          {videoCategories.slice(0, 1).map((cat) => (
            <VideoRow key={cat.title} category={cat} onSelect={setSelectedVideo} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 pt-8 pb-6 text-center shadow-cartoon">
        <h1 className="font-display text-2xl text-primary-foreground font-bold">🎬 BíbliaFlix</h1>
        <p className="font-body text-sm text-primary-foreground/80 mt-1">Vídeos das histórias da Bíblia</p>
      </div>

      <div className="py-4 space-y-6">
        {videoCategories.map((cat) => (
          <VideoRow key={cat.title} category={cat} onSelect={setSelectedVideo} />
        ))}
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
      <h3 className="font-display text-base font-bold text-foreground px-4 mb-2">{category.title}</h3>
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
            <div className="relative rounded-xl overflow-hidden shadow-card aspect-[3/4]">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="font-display text-xs text-primary-foreground font-bold">{video.title}</p>
                <p className="font-body text-[10px] text-primary-foreground/70">{video.duration}</p>
              </div>
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-primary-foreground ml-0.5" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BibliaFlixPage;
