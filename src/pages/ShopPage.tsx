import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronLeft, Lock } from "lucide-react";

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

const PARENTAL_PIN = "1234";

const ShopPage = ({ onNavigate }: ShopPageProps) => {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const handlePinSubmit = () => {
    if (pin === PARENTAL_PIN) {
      setUnlocked(true);
      setPin("");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // PIN gate
  if (!unlocked) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        {onNavigate && (
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center justify-center absolute top-4 left-4"
            style={{
              minHeight: 44,
              minWidth: 44,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.25)",
              border: "none",
              cursor: "pointer",
              filter: GLOW_FILTER,
            }}
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
        )}

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm rounded-3xl p-6 flex flex-col items-center"
          style={{
            background: "rgba(255,248,235,0.97)",
            border: "2px solid rgba(255,215,0,0.4)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
            style={{ background: "linear-gradient(180deg, #FFB800, #FF8C00)" }}
          >
            <Lock size={28} className="text-white" />
          </div>
          <h2 className="font-penmanship font-bold text-amber-900 text-xl mb-1">
            Lojinha Bibloo
          </h2>
          <p className="font-penmanship text-sm text-gray-600 text-center mb-4">
            Esta área requer autorização dos pais. Digite o PIN parental para continuar.
          </p>
          <input
            type="password"
            maxLength={4}
            inputMode="numeric"
            pattern="[0-9]*"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setPinError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
            placeholder="● ● ● ●"
            autoFocus
            className="w-full text-center text-2xl tracking-[0.5em] rounded-2xl py-3 px-4 outline-none mb-2"
            style={{
              border: pinError ? "2px solid #EF4444" : "2px solid rgba(255,215,0,0.4)",
              background: "white",
              color: "#4A2C0A",
            }}
          />
          {pinError && (
            <p className="font-penmanship text-xs text-red-500 mb-2">
              PIN incorreto. Tente novamente.
            </p>
          )}
          <button
            onClick={handlePinSubmit}
            className="w-full rounded-2xl py-3 font-penmanship font-bold text-white mt-2"
            style={{
              background: "linear-gradient(180deg, #FFB800, #FF8C00)",
              borderBottom: "4px solid #CC6600",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Entrar
          </button>
          <p className="font-penmanship text-xs text-gray-400 mt-3 text-center">
            PIN padrão: 1234. Altere em Área dos Pais.
          </p>
        </motion.div>
      </div>
    );
  }

  // Shop content
  return (
    <div
      className="min-h-screen"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "calc(68px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {onNavigate && (
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center justify-center"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.45)",
            border: "2px solid rgba(255,215,0,0.5)",
            cursor: "pointer",
            filter: GLOW_FILTER,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
      )}

      <div
        className="p-4 pt-10 pb-5 text-center"
        style={{
          background: "rgba(255,215,0,0.1)",
          borderBottom: "1px solid rgba(255,215,0,0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h1
          className="font-penmanship font-bold text-white"
          style={{ fontSize: "clamp(22px, 6vw, 28px)", textShadow: "0 2px 8px rgba(0,0,0,0.5)", filter: GLOW_FILTER }}
        >
          🛍️ Lojinha Bibloo
        </h1>
        <p className="font-penmanship text-white/75 text-sm mt-1">
          Produtos especiais para você!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 max-w-lg mx-auto">
        {shopItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-4 shadow-lg flex flex-col items-center text-center"
            style={{
              background: "rgba(255,248,235,0.95)",
              border: "1.5px solid rgba(255,215,0,0.3)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <span className="text-4xl mb-2">{item.emoji}</span>
            <h3 className="font-penmanship font-bold text-amber-900 text-sm leading-snug">
              {item.name}
            </h3>
            <p className="font-penmanship font-bold text-amber-600 text-sm mt-1">{item.price}</p>
            <button
              className="mt-3 w-full rounded-xl py-2 font-penmanship font-bold text-white text-xs flex items-center justify-center gap-1 shadow-md"
              style={{
                background: "linear-gradient(180deg, #FFB800, #FF8C00)",
                borderBottom: "3px solid #CC6600",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Comprar
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
