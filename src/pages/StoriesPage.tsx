import { useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import storyNoah from "@/assets/story-noah.jpg";
import storyMoses from "@/assets/story-moses.jpg";
import storyCreation from "@/assets/story-creation.jpg";
import storyJesus from "@/assets/story-jesus-children.jpg";

const storyCategories = [
  {
    title: "🌈 Histórias Favoritas",
    stories: [
      { id: "1", title: "A Criação", thumbnail: storyCreation, duration: "3:00" },
      { id: "2", title: "Noé e a Arca", thumbnail: storyNoah, duration: "2:45" },
      { id: "3", title: "Moisés no Cesto", thumbnail: storyMoses, duration: "2:30" },
    ],
  },
  {
    title: "⭐ Histórias de Jesus",
    stories: [
      { id: "4", title: "Jesus e as Crianças", thumbnail: storyJesus, duration: "3:10" },
      { id: "5", title: "A Criação", thumbnail: storyCreation, duration: "3:00" },
      { id: "6", title: "Noé e a Arca", thumbnail: storyNoah, duration: "2:45" },
    ],
  },
];

const StoriesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 pt-8 pb-6 text-center shadow-cartoon">
        <h1 className="font-display text-2xl text-primary-foreground font-bold">
          📚 Histórias para Crianças
        </h1>
        <p className="font-body text-sm text-primary-foreground/80 mt-1">
          Histórias bíblicas para crianças
        </p>
      </div>

      <div className="py-4 space-y-6">
        {storyCategories.map((cat) => (
          <StoryRow key={cat.title} category={cat} />
        ))}
      </div>
    </div>
  );
};

const StoryRow = ({
  category,
}: {
  category: { title: string; stories: { id: string; title: string; thumbnail: string; duration: string }[] };
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <h3 className="font-display text-base font-bold text-foreground px-4 mb-2">{category.title}</h3>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 scrollbar-hide snap-x snap-mandatory"
      >
        {category.stories.map((story) => (
          <motion.button
            key={story.id}
            className="flex-shrink-0 w-44 md:w-52 snap-start"
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img src={story.thumbnail} alt={story.title} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-display text-sm text-primary-foreground font-bold">{story.title}</p>
                <p className="font-body text-xs text-primary-foreground/70">{story.duration}</p>
              </div>
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-secondary/90 flex items-center justify-center shadow-cartoon">
                <Play className="w-4 h-4 text-secondary-foreground ml-0.5" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
