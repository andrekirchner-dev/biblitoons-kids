import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingBag, Check, MapPin, Package } from "lucide-react";
import coinbibloo from "@/assets/coinbibloo.png";

interface ProductPageProps {
  productId: string;
  onNavigate: (page: string) => void;
}

const GLOW = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";

const PRODUCTS: Record<string, {
  emoji: string;
  label: string;
  price: number;
  description: string;
  longDesc: string;
  type: "digital" | "physical";
  color: string;
  border: string;
  glow: string;
  features: string[];
}> = {
  "product-avatar-leao": {
    emoji: "🦁",
    label: "Avatar Leão",
    price: 50,
    description: "Um avatar exclusivo de Leão para o seu perfil!",
    longDesc: "Mostre sua coragem com o Avatar Leão! Assim como Davi enfrentou o leão com fé, você pode usar esse avatar incrível para mostrar ao mundo que você é corajoso e tem fé em Deus.",
    type: "digital",
    color: "rgba(255,184,0,0.18)",
    border: "rgba(255,184,0,0.45)",
    glow: "0 0 30px rgba(255,184,0,0.4)",
    features: ["Disponível imediatamente", "Aparece no seu perfil", "Edição limitada", "Para sempre seu"],
  },
  "product-coroa": {
    emoji: "👑",
    label: "Coroa Dourada",
    price: 100,
    description: "Uma coroa dourada exclusiva para o seu perfil!",
    longDesc: "A Coroa Dourada mostra que você é um verdadeiro rei ou rainha de Deus! Decore seu perfil com esta coroa especial e lembre-se que você é filho(a) do Rei dos reis.",
    type: "digital",
    color: "rgba(255,215,0,0.18)",
    border: "rgba(255,215,0,0.5)",
    glow: "0 0 30px rgba(255,215,0,0.45)",
    features: ["Disponível imediatamente", "Aparece no seu perfil", "Efeito brilhante especial", "Para sempre seu"],
  },
  "product-cores": {
    emoji: "🎨",
    label: "Cores Especiais",
    price: 30,
    description: "Desbloqueie paletas de cores exclusivas para desenhar!",
    longDesc: "Com as Cores Especiais, você ganha acesso a paletas de cores únicas e exclusivas para usar no Refletir. Pinte suas histórias bíblicas com cores que brilham de um jeito especial!",
    type: "digital",
    color: "rgba(147,51,234,0.18)",
    border: "rgba(147,51,234,0.45)",
    glow: "0 0 30px rgba(147,51,234,0.35)",
    features: ["Disponível imediatamente", "8 novas paletas de cores", "Cores com brilho e glitter", "Para sempre seu"],
  },
  "product-bibi-pelucia": {
    emoji: "🧸",
    label: "Bibi de Pelúcia",
    price: 1500,
    description: "O mascote Bibi em pelúcia macio para abraçar!",
    longDesc: "O Bibi de Pelúcia é a versão física e quentinha do nosso mascote favorito! Super macio, fofo e cheio de amor. Um presente incrível que vai acompanhar você nas suas aventuras bíblicas todos os dias.",
    type: "physical",
    color: "rgba(255,107,107,0.18)",
    border: "rgba(255,107,107,0.45)",
    glow: "0 0 30px rgba(255,107,107,0.35)",
    features: ["Enviado pelos Correios", "Material hipoalergênico", "Tamanho: 25cm", "Certificado de qualidade"],
  },
};

type CheckoutStep = "detail" | "address" | "confirm" | "success";

const ProductPage = ({ productId, onNavigate }: ProductPageProps) => {
  const product = PRODUCTS[productId];
  const [step, setStep] = useState<CheckoutStep>("detail");
  const [address, setAddress] = useState({ name: "", street: "", city: "", state: "", zip: "" });
  const [fieldError, setFieldError] = useState<string | null>(null);
  const USER_COINS = 27; // would come from global state in a real app

  if (!product) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#0F0726", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <p className="font-penmanship text-white text-xl">Produto não encontrado 😕</p>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => onNavigate("biblooCoins")}
          className="font-penmanship text-white px-6 py-3 rounded-2xl"
          style={{ background: "rgba(255,215,0,0.2)", border: "1.5px solid rgba(255,215,0,0.4)" }}>
          Voltar à Loja
        </motion.button>
      </div>
    );
  }

  const canAfford = USER_COINS >= product.price;

  const handlePurchaseDigital = () => {
    setStep("success");
  };

  const handleAddressNext = () => {
    if (!address.name || !address.street || !address.city || !address.state || !address.zip) {
      setFieldError("Preencha todos os campos para continuar.");
      return;
    }
    setFieldError(null);
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("success");
  };

  // ── SUCCESS screen ─────────────────────────────────────────
  if (step === "success") {
    return (
      <div
        style={{
          position: "fixed", inset: 0,
          background: "linear-gradient(180deg, #0F0726 0%, #1A0D40 40%, #0D1A3A 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "32px 24px",
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: 90, height: 90, borderRadius: "50%",
            background: "linear-gradient(135deg, #FFB800, #FF8C00)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 40px rgba(255,184,0,0.6)", marginBottom: 20,
          }}
        >
          <Check size={44} color="white" strokeWidth={3} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-penmanship font-bold text-white text-2xl text-center"
        >
          {product.type === "physical" ? "Pedido Confirmado! 🎉" : "Desbloqueado! 🎉"}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="font-penmanship text-white/60 text-sm text-center mt-2"
          style={{ maxWidth: 280 }}
        >
          {product.type === "physical"
            ? `Seu ${product.label} foi pedido e chegará em breve! Obrigado por usar seus BiblooCoins! 🧸`
            : `O ${product.label} foi adicionado ao seu perfil! Aproveite! ✨`}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ fontSize: 64, marginTop: 28, marginBottom: 28 }}
        >
          {product.emoji}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate("biblooCoins")}
          className="w-full max-w-xs py-4 rounded-2xl font-penmanship font-bold text-white"
          style={{
            background: "linear-gradient(90deg, #FFB800, #FF8C00)",
            boxShadow: "0 4px 20px rgba(255,184,0,0.5)",
            fontSize: 16,
          }}
        >
          Voltar à Loja
        </motion.button>
      </div>
    );
  }

  // ── ADDRESS screen (physical only) ────────────────────────
  if (step === "address") {
    return (
      <div
        style={{
          position: "fixed", inset: 0,
          background: "linear-gradient(180deg, #0F0726 0%, #1A0D40 40%, #0D1A3A 100%)",
          display: "flex", flexDirection: "column",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div style={{ maxWidth: 428, width: "100%", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setStep("detail")}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,215,0,0.35)",
                filter: GLOW, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <ChevronLeft className="text-white" size={22} />
            </motion.button>
            <div>
              <p className="font-penmanship font-bold text-white text-base">Endereço de Entrega</p>
              <p className="font-penmanship text-white/50 text-xs">Onde devemos enviar o Bibi?</p>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
            <div className="flex items-center gap-2 py-3 px-4 rounded-2xl mb-2"
              style={{ background: "rgba(255,107,107,0.12)", border: "1px solid rgba(255,107,107,0.25)" }}>
              <MapPin size={16} style={{ color: "#FF6B6B", flexShrink: 0 }} />
              <p className="font-penmanship text-white/70 text-xs">Pedimos a seus pais que preencham o endereço corretamente.</p>
            </div>

            {[
              { key: "name", label: "Nome completo", placeholder: "Quem vai receber?" },
              { key: "street", label: "Rua e número", placeholder: "Ex: Rua das Flores, 123" },
              { key: "city", label: "Cidade", placeholder: "Sua cidade" },
              { key: "state", label: "Estado (UF)", placeholder: "Ex: SP" },
              { key: "zip", label: "CEP", placeholder: "00000-000" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <p className="font-penmanship text-white/60 text-xs mb-1 ml-1">{label}</p>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={address[key as keyof typeof address]}
                  onChange={(e) => setAddress((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl font-penmanship text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "white",
                  }}
                />
              </div>
            ))}

            {fieldError && (
              <p className="font-penmanship text-xs text-red-400 mt-1 text-center">{fieldError}</p>
            )}
          </div>

          {/* CTA */}
          <div className="px-4 pb-6 flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAddressNext}
              className="w-full py-4 rounded-2xl font-penmanship font-bold text-white"
              style={{
                background: "linear-gradient(90deg, #FFB800, #FF8C00)",
                boxShadow: "0 4px 20px rgba(255,184,0,0.4)",
                fontSize: 16,
              }}
            >
              Continuar →
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // ── CONFIRM screen (physical only) ────────────────────────
  if (step === "confirm") {
    return (
      <div
        style={{
          position: "fixed", inset: 0,
          background: "linear-gradient(180deg, #0F0726 0%, #1A0D40 40%, #0D1A3A 100%)",
          display: "flex", flexDirection: "column",
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div style={{ maxWidth: 428, width: "100%", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflowY: "auto" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setStep("address")}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,215,0,0.35)",
                filter: GLOW, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <ChevronLeft className="text-white" size={22} />
            </motion.button>
            <p className="font-penmanship font-bold text-white text-base">Confirmar Pedido</p>
          </div>

          <div className="px-4 pb-6 space-y-4">
            {/* Product summary */}
            <div className="flex items-center gap-4 py-4 px-5 rounded-2xl"
              style={{ background: product.color, border: `1.5px solid ${product.border}`, boxShadow: product.glow }}>
              <span style={{ fontSize: 40 }}>{product.emoji}</span>
              <div className="flex-1">
                <p className="font-penmanship font-bold text-white text-base">{product.label}</p>
                <p className="font-penmanship text-white/60 text-xs">{product.description}</p>
              </div>
            </div>

            {/* Address */}
            <div className="py-4 px-5 rounded-2xl space-y-1"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} style={{ color: "#FFB800" }} />
                <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider">Endereço de Entrega</p>
              </div>
              <p className="font-penmanship text-white text-sm">{address.name}</p>
              <p className="font-penmanship text-white/60 text-xs">{address.street}</p>
              <p className="font-penmanship text-white/60 text-xs">{address.city}, {address.state} — {address.zip}</p>
            </div>

            {/* Shipping info */}
            <div className="flex items-center gap-3 py-3 px-4 rounded-2xl"
              style={{ background: "rgba(52,199,89,0.12)", border: "1px solid rgba(52,199,89,0.25)" }}>
              <Package size={18} style={{ color: "#34C759", flexShrink: 0 }} />
              <div>
                <p className="font-penmanship font-bold text-white/80 text-sm">Entrega estimada</p>
                <p className="font-penmanship text-white/50 text-xs">7–15 dias úteis via Correios</p>
              </div>
            </div>

            {/* Cost */}
            <div className="flex items-center justify-between py-4 px-5 rounded-2xl"
              style={{ background: "rgba(255,215,0,0.1)", border: "1.5px solid rgba(255,215,0,0.3)" }}>
              <p className="font-penmanship font-bold text-white/80 text-sm">Total</p>
              <div className="flex items-center gap-2">
                <img src={coinbibloo} style={{ width: 18, height: 18 }} alt="" />
                <span className="font-penmanship font-bold text-xl" style={{ color: "#FFD700" }}>
                  {product.price.toLocaleString()}
                </span>
                <span className="font-penmanship text-white/50 text-xs">coins</span>
              </div>
            </div>

            {!canAfford && (
              <div className="py-3 px-4 rounded-2xl text-center"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>
                <p className="font-penmanship text-red-400 text-sm">Coins insuficientes 😕</p>
                <p className="font-penmanship text-white/40 text-xs mt-0.5">
                  Você tem {USER_COINS} coins, mas precisa de {product.price}
                </p>
              </div>
            )}

            <motion.button
              whileTap={{ scale: canAfford ? 0.96 : 1 }}
              onClick={canAfford ? handleConfirm : undefined}
              className="w-full py-4 rounded-2xl font-penmanship font-bold text-white"
              style={{
                background: canAfford ? "linear-gradient(90deg, #FFB800, #FF8C00)" : "rgba(255,255,255,0.1)",
                boxShadow: canAfford ? "0 4px 20px rgba(255,184,0,0.4)" : "none",
                color: canAfford ? "white" : "rgba(255,255,255,0.3)",
                fontSize: 16,
                cursor: canAfford ? "pointer" : "not-allowed",
              }}
            >
              {canAfford ? "Confirmar Pedido ✓" : "Coins insuficientes"}
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // ── DETAIL screen (default) ────────────────────────────────
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(180deg, #0F0726 0%, #1A0D40 40%, #0D1A3A 100%)",
        display: "flex", flexDirection: "column",
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div style={{ maxWidth: 428, width: "100%", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2 flex-shrink-0">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => onNavigate("biblooCoins")}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,215,0,0.35)",
              filter: GLOW, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          >
            <ChevronLeft className="text-white" size={22} />
          </motion.button>
          <p className="font-penmanship font-bold text-white text-base flex-1">Loja de Prêmios</p>
          {/* Coin balance */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(255,215,0,0.12)", border: "1.5px solid rgba(255,215,0,0.3)" }}>
            <img src={coinbibloo} style={{ width: 16, height: 16 }} alt="" />
            <span className="font-penmanship font-bold text-sm" style={{ color: "#FFD700" }}>{USER_COINS}</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4" style={{ minHeight: 0 }}>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center py-8"
          >
            <div
              style={{
                width: 140, height: 140, borderRadius: "50%",
                background: product.color,
                border: `2px solid ${product.border}`,
                boxShadow: product.glow,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 72,
                marginBottom: 16,
              }}
            >
              {product.emoji}
            </div>

            <h1 className="font-penmanship font-bold text-white text-2xl text-center">{product.label}</h1>
            <p className="font-penmanship text-white/60 text-sm text-center mt-1 px-4">{product.description}</p>

            {/* Price badge */}
            <div className="flex items-center gap-2 mt-4 px-5 py-2.5 rounded-2xl"
              style={{
                background: canAfford ? "rgba(255,215,0,0.18)" : "rgba(239,68,68,0.15)",
                border: `1.5px solid ${canAfford ? "rgba(255,215,0,0.5)" : "rgba(239,68,68,0.4)"}`,
              }}>
              <img src={coinbibloo} style={{ width: 22, height: 22 }} alt="" />
              <span className="font-penmanship font-bold text-2xl" style={{ color: canAfford ? "#FFD700" : "#FF6B6B" }}>
                {product.price.toLocaleString()}
              </span>
              <span className="font-penmanship text-white/50 text-sm">BiblooCoins</span>
            </div>

            {!canAfford && (
              <p className="font-penmanship text-red-400 text-xs mt-2">
                Faltam {(product.price - USER_COINS).toLocaleString()} coins
              </p>
            )}
          </motion.div>

          {/* Long description */}
          <div className="rounded-2xl p-4 mb-4"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-2">📝 Sobre o produto</p>
            <p className="font-penmanship text-white/70 text-sm leading-relaxed">{product.longDesc}</p>
          </div>

          {/* Features */}
          <div className="rounded-2xl p-4 mb-6"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-3">
              {product.type === "physical" ? "📦 Detalhes do produto" : "✨ O que você ganha"}
            </p>
            <div className="space-y-2">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "rgba(52,199,89,0.2)", border: "1px solid rgba(52,199,89,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Check size={11} style={{ color: "#34C759" }} strokeWidth={3} />
                  </div>
                  <span className="font-penmanship text-white/70 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Physical product notice */}
          {product.type === "physical" && (
            <div className="flex items-start gap-3 py-3 px-4 rounded-2xl mb-6"
              style={{ background: "rgba(255,215,0,0.08)", border: "1px dashed rgba(255,215,0,0.3)" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>👨‍👩‍👧</span>
              <p className="font-penmanship text-white/60 text-xs leading-relaxed">
                Este é um produto físico! Peça ajuda a um responsável para finalizar o pedido e fornecer o endereço de entrega.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-4 pb-6 flex-shrink-0">
          <AnimatePresence>
            {!canAfford ? (
              <div className="space-y-2">
                <div className="py-3 px-4 rounded-2xl text-center"
                  style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}>
                  <p className="font-penmanship text-red-400 text-sm">Coins insuficientes 😕</p>
                  <p className="font-penmanship text-white/40 text-xs mt-0.5">
                    Você tem {USER_COINS} coins. Ganhe mais jogando e lendo!
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate("biblooCoins")}
                  className="w-full py-3 rounded-2xl font-penmanship font-bold"
                  style={{
                    background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.6)", fontSize: 15,
                  }}
                >
                  Ganhar mais coins
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={product.type === "physical" ? () => setStep("address") : handlePurchaseDigital}
                className="w-full py-4 rounded-2xl font-penmanship font-bold text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(90deg, #FFB800, #FF8C00)",
                  boxShadow: "0 4px 24px rgba(255,184,0,0.5)",
                  fontSize: 16,
                }}
              >
                <ShoppingBag size={18} />
                {product.type === "physical" ? "Pedir agora" : "Desbloquear agora"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
