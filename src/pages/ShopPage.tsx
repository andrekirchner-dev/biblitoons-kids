import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft } from "lucide-react";

const GLOW_FILTER = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

const shopItems = [
  { id: "1", name: "Bíblia Ilustrada Bibloo", price: "R$ 49,90", emoji: "📖" },
  { id: "2", name: "Pelúcia Bibi", price: "R$ 79,90", emoji: "🐑" },
  { id: "3", name: "Kit Colorir Bíblico", price: "R$ 29,90", emoji: "🎨" },
  { id: "4", name: "Camiseta Bibloo", price: "R$ 39,90", emoji: "👕" },
  { id: "5", name: "Quebra-cabeça Arca", price: "R$ 34,90", emoji: "🧩" },
  { id: "6", name: "Caneca Bibi", price: "R$ 24,90", emoji: "☕" },
];

interface ShopPageProps {
  onNavigate?: (page: string) => void;
}

const ShopPage = ({ onNavigate }: ShopPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-sky">
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

      <div className="bg-gradient-to-r from-sky-400 to-sky-500 p-4 pt-8 pb-6 text-center shadow-cartoon">
        <h1 className="font-display text-2xl text-primary-foreground font-bold">🛍️ Lojinha Bibloo</h1>
        <p className="font-body text-sm text-primary-foreground/80 mt-1">Produtos especiais para você!</p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 max-w-lg mx-auto">
        {shopItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-bibloo-parchment rounded-2xl p-4 shadow-card border border-border flex flex-col items-center text-center"
          >
            <span className="text-4xl mb-2">{item.emoji}</span>
            <h3 className="font-display text-sm text-foreground font-bold">{item.name}</h3>
            <p className="font-body text-xs text-primary font-bold mt-1">{item.price}</p>
            <button className="mt-3 w-full bg-gradient-gold rounded-lg py-2 font-display text-xs text-primary-foreground font-bold shadow-button btn-press flex items-center justify-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" /> Comprar
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
