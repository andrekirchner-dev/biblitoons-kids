import { motion } from "framer-motion";
import { Book, Film, Baby, Sun, ShoppingBag, Menu } from "lucide-react";
import logoBibloo from "@/assets/logo-bibloo.jpeg";
import bibiMascot from "@/assets/bibi-mascot.png";


interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenDrawer: () => void;
}

const menuButtons = [
  { id: "bible", label: "Ler a Bíblia", icon: Book, color: "from-amber-500 to-amber-600" },
  { id: "devotional", label: "Devocional do Dia", icon: Sun, color: "from-yellow-400 to-orange-400" },
  { id: "bibliaflix", label: "BíbliaFlix", icon: Film, color: "from-red-400 to-red-500" },
  { id: "stories", label: "Histórias", icon: Baby, color: "from-green-400 to-green-500" },
  { id: "shop", label: "Lojinha Bibloo", icon: ShoppingBag, color: "from-sky-400 to-sky-500" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};

const HomePage = ({ onNavigate, onOpenDrawer }: HomePageProps) => {
  return (
    <div className="min-h-screen relative">
      {/* Content */}
      <div className="relative z-10 px-4 pt-6 pb-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onOpenDrawer}
            className="w-10 h-10 rounded-full bg-bibloo-parchment/90 shadow-cartoon flex items-center justify-center btn-press"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <img src={logoBibloo} alt="Bibloo" className="h-12 rounded-xl shadow-card" />
          <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden shadow-cartoon">
            <img src={bibiMascot} alt="Perfil" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Greeting */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground text-shadow-cartoon">
            Bom dia, Maria! 🌞
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            O que vamos aprender hoje?
          </p>
        </motion.div>

        {/* Bibi floating */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.3 }}
        >
          <img src={bibiMascot} alt="Bibi" className="w-28 h-28 md:w-36 md:h-36 animate-float drop-shadow-lg" />
        </motion.div>

        {/* Main Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto"
        >
          {menuButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <motion.button
                key={btn.id}
                variants={itemVariants}
                onClick={() => onNavigate(btn.id)}
                className={`bg-gradient-to-br ${btn.color} rounded-2xl p-4 md:p-5 shadow-button btn-press flex flex-col items-center gap-2 text-center`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </div>
                <span className="font-display text-sm md:text-base font-bold text-primary-foreground">
                  {btn.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
