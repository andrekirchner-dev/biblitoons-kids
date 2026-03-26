import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Check } from "lucide-react";

interface AddSiblingPageProps {
  onNavigate: (page: string) => void;
}

const GLOW = "drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))";
const AVATARS = ["🦁", "🐻", "🐯", "🦊", "🐸", "🐬", "🦋", "🐧", "🌟", "👼"];
const AGES = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];

type Step = "info" | "success";

const AddSiblingPage = ({ onNavigate }: AddSiblingPageProps) => {
  const [step, setStep] = useState<Step>("info");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"menino" | "menina" | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [avatar, setAvatar] = useState("🐧");
  const [nameError, setNameError] = useState(false);

  const handleSave = () => {
    if (!name.trim()) { setNameError(true); return; }
    if (!gender || !age) return;
    setNameError(false);
    setStep("success");
  };

  if (step === "success") {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(180deg, #1A0D40 0%, #0D1A3A 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "32px 24px",
      }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, #FFB800, #FF8C00)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 40px rgba(255,184,0,0.6)", marginBottom: 16,
          }}
        >
          <Check size={40} color="white" strokeWidth={3} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 64, marginBottom: 12 }}
        >
          {avatar}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="font-penmanship font-bold text-white text-2xl text-center"
        >
          {name} entrou na família! 🎉
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="font-penmanship text-white/60 text-sm text-center mt-2"
          style={{ maxWidth: 260 }}
        >
          O perfil de {name} foi criado com sucesso. Bem-vindo(a) ao Bibloo!
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate("parentalArea")}
          className="w-full max-w-xs py-4 rounded-2xl font-penmanship font-bold text-white mt-10"
          style={{
            background: "linear-gradient(90deg, #FFB800, #FF8C00)",
            boxShadow: "0 4px 20px rgba(255,184,0,0.5)", fontSize: 16,
          }}
        >
          Voltar à Área dos Pais
        </motion.button>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "linear-gradient(180deg, #1A0D40 0%, #0D1A3A 100%)",
      display: "flex", flexDirection: "column",
      paddingTop: "env(safe-area-inset-top, 0px)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      <div style={{ maxWidth: 428, width: "100%", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 flex-shrink-0">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => onNavigate("parentalArea")}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,215,0,0.35)",
              filter: GLOW, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          >
            <ChevronLeft className="text-white" size={22} />
          </motion.button>
          <div>
            <p className="font-penmanship font-bold text-white text-base">Adicionar Irmão</p>
            <p className="font-penmanship text-white/50 text-xs">Crie um novo perfil infantil</p>
          </div>
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5" style={{ minHeight: 0 }}>

          {/* Avatar picker */}
          <div>
            <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-3">
              Escolha um Avatar
            </p>
            <div className="grid grid-cols-5 gap-2">
              {AVATARS.map((a) => (
                <motion.button
                  key={a}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setAvatar(a)}
                  className="aspect-square rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: avatar === a ? "rgba(80,50,0,0.85)" : "rgba(6,18,58,0.82)",
                    border: avatar === a ? "2px solid rgba(255,215,0,0.9)" : "1px solid rgba(100,160,255,0.4)",
                    filter: avatar === a ? GLOW : "none",
                  }}
                >
                  {a}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-2">
              Nome da Criança
            </p>
            <input
              type="text"
              placeholder="Como chamamos esse irmão?"
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(false); }}
              className="w-full px-4 py-3 rounded-2xl font-penmanship text-sm outline-none"
              style={{
                background: "rgba(6,18,58,0.88)",
                border: `1.5px solid ${nameError ? "rgba(239,68,68,0.7)" : "rgba(100,160,255,0.45)"}`,
                color: "white",
              }}
            />
            {nameError && (
              <p className="font-penmanship text-red-400 text-xs mt-1 ml-1">Digite o nome da criança</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-3">
              É menino ou menina?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(["menino", "menina"] as const).map((g) => (
                <motion.button
                  key={g}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setGender(g)}
                  className="py-4 rounded-2xl flex flex-col items-center gap-2"
                  style={{
                    background: gender === g
                      ? (g === "menino" ? "rgba(30,80,200,0.75)" : "rgba(180,30,100,0.75)")
                      : "rgba(6,18,58,0.82)",
                    border: gender === g
                      ? (g === "menino" ? "2px solid rgba(100,160,255,0.8)" : "2px solid rgba(255,100,180,0.8)")
                      : "1px solid rgba(100,160,255,0.35)",
                  }}
                >
                  <span style={{ fontSize: 32 }}>{g === "menino" ? "👦" : "👧"}</span>
                  <span className="font-penmanship font-bold text-white text-sm capitalize">{g}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-3">
              Quantos anos tem?
            </p>
            <div className="flex flex-wrap gap-2">
              {AGES.map((a) => (
                <motion.button
                  key={a}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAge(a)}
                  className="font-penmanship font-bold rounded-xl px-4 py-2"
                  style={{
                    background: age === a ? "rgba(20,60,140,0.85)" : "rgba(6,18,58,0.82)",
                    border: age === a ? "2px solid rgba(100,160,255,0.8)" : "1px solid rgba(100,160,255,0.35)",
                    color: age === a ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                    fontSize: 15,
                  }}
                >
                  {a}
                </motion.button>
              ))}
            </div>
            {!age && (
              <p className="font-penmanship text-white/30 text-xs mt-2 ml-1">Selecione a idade</p>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pb-6 flex-shrink-0">
          <AnimatePresence>
            {!gender || !age ? (
              <div className="py-3 rounded-2xl text-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="font-penmanship text-white/30 text-sm">
                  Preencha todos os campos para continuar
                </p>
              </div>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSave}
                className="w-full py-4 rounded-2xl font-penmanship font-bold text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(90deg, #FFB800, #FF8C00)",
                  boxShadow: "0 4px 24px rgba(255,184,0,0.5)", fontSize: 16,
                }}
              >
                Criar perfil de {name || "irmão"} ✨
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AddSiblingPage;
