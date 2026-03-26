import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, User, Settings, Shield, Clock,
  Bell, HardDrive, CreditCard, HelpCircle, Lock, Edit3,
  Check, X, Plus, Minus, ChevronDown, ChevronUp, Star,
} from 'lucide-react';

const GLOW = 'drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))';

interface ParentalAreaPageProps {
  onNavigate: (page: string) => void;
}

type View =
  | 'main' | 'profile' | 'pin' | 'screenTime'
  | 'notifications' | 'storage' | 'payment' | 'help' | 'general';

/* ── shared sub-components ── */

const BackBtn = ({ onBack, label = '' }: { onBack: () => void; label?: string }) => (
  <div className="flex items-center px-3 pt-4 pb-3" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}>
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onBack}
      style={{
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)', border: '2px solid rgba(255,215,0,0.5)',
        filter: GLOW, cursor: 'pointer', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <ChevronLeft className="text-white" size={24} />
    </motion.button>
    {label && (
      <h1 className="font-penmanship font-bold text-white flex-1 text-center mr-11"
        style={{ fontSize: 'clamp(16px, 4.5vw, 22px)' }}>
        {label}
      </h1>
    )}
  </div>
);

const SectionRow = ({
  icon, label, sublabel, onPress, danger = false,
}: {
  icon: React.ReactNode; label: string; sublabel?: string; onPress?: () => void; danger?: boolean;
}) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={onPress}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl"
    style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}
  >
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: danger ? 'rgba(255,60,60,0.2)' : 'rgba(255,215,0,0.15)' }}>
      <span style={{ color: danger ? '#FF6B6B' : '#FFD700' }}>{icon}</span>
    </div>
    <div className="flex-1 text-left">
      <p className="font-penmanship font-bold text-white text-sm"
        style={{ color: danger ? '#FF8080' : undefined }}>{label}</p>
      {sublabel && <p className="font-penmanship text-xs text-white/50 mt-0.5">{sublabel}</p>}
    </div>
    <ChevronRight size={16} className="text-white/30" />
  </motion.button>
);

const ToggleRow = ({
  icon, label, sublabel, value, onChange,
}: {
  icon: React.ReactNode; label: string; sublabel?: string; value: boolean; onChange: (v: boolean) => void;
}) => (
  <div className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl"
    style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(255,215,0,0.15)' }}>
      <span style={{ color: '#FFD700' }}>{icon}</span>
    </div>
    <div className="flex-1">
      <p className="font-penmanship font-bold text-white text-sm">{label}</p>
      {sublabel && <p className="font-penmanship text-xs text-white/50 mt-0.5">{sublabel}</p>}
    </div>
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onChange(!value)}
      style={{
        width: 48, height: 28, borderRadius: 14, position: 'relative', cursor: 'pointer',
        background: value ? 'linear-gradient(90deg,#FFB800,#FF8C00)' : 'rgba(255,255,255,0.15)',
        border: value ? '1px solid rgba(255,184,0,0.5)' : '1px solid rgba(255,255,255,0.2)',
        transition: 'background 0.25s',
      }}
    >
      <motion.div
        animate={{ x: value ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        style={{
          position: 'absolute', top: 3, width: 20, height: 20,
          borderRadius: '50%', background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      />
    </motion.button>
  </div>
);

const Screen = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.22 }}
    style={{ minHeight: '100dvh' }}
  >
    {children}
  </motion.div>
);

/* ── AVATARS ── */
const AVATARS = ['🦁', '🐻', '🐯', '🦊', '🐸', '🐬', '🦋', '🐧', '🌟', '👼'];

/* ── PAGE COMPONENT ── */
const ParentalAreaPage = ({ onNavigate }: ParentalAreaPageProps) => {
  const [view, setView] = useState<View>('main');

  // Profile
  const [avatar, setAvatar] = useState('🦁');
  const [childName, setChildName] = useState('Bibloo Kid');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(childName);

  // PIN
  const [pinStep, setPinStep] = useState<'verify' | 'new' | 'confirm'>('verify');
  const [pinInput, setPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);
  const CURRENT_PIN = '1234'; // demo

  // Screen time
  const [screenTimeEnabled, setScreenTimeEnabled] = useState(true);
  const [dailyLimit, setDailyLimit] = useState(60); // minutes

  // Notifications
  const [notifDevotional, setNotifDevotional] = useState(true);
  const [notifGame, setNotifGame] = useState(false);
  const [notifStory, setNotifStory] = useState(true);
  const [notifUpdate, setNotifUpdate] = useState(true);
  const [notifParent, setNotifParent] = useState(false);

  const go = (v: View) => setView(v);

  /* ───────── MAIN HUB ───────── */
  const MainView = () => (
    <Screen>
      <BackBtn onBack={() => onNavigate('home')} />
      <div className="px-4 pb-8 space-y-5">
        {/* Profile banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{ background: 'rgba(255,215,0,0.12)', border: '1.5px solid rgba(255,215,0,0.3)' }}
        >
          <div className="text-5xl">{avatar}</div>
          <div className="flex-1">
            <p className="font-penmanship font-bold text-white text-base">{childName}</p>
            <p className="font-penmanship text-xs text-white/60 mt-0.5">Perfil ativo</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => go('profile')}
            className="px-3 py-1.5 rounded-xl font-penmanship text-xs font-bold"
            style={{ background: 'rgba(255,215,0,0.2)', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700' }}
          >
            Editar
          </motion.button>
        </motion.div>

        {/* Parental controls */}
        <div>
          <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-2 px-1">
            🔒 Controles Parentais
          </p>
          <div className="space-y-2">
            <SectionRow icon={<Lock size={17} />} label="Alterar PIN" sublabel="Mude o PIN de acesso parental" onPress={() => { setPinStep('verify'); setPinInput(''); setNewPin(''); setPinError(''); setPinSuccess(false); go('pin'); }} />
            <SectionRow icon={<Clock size={17} />} label="Tempo de Tela" sublabel={screenTimeEnabled ? `Limite: ${dailyLimit} min/dia` : 'Desativado'} onPress={() => go('screenTime')} />
            <SectionRow icon={<Plus size={17} />} label="Adicionar Irmão" sublabel="Crie outro perfil infantil" />
          </div>
        </div>

        {/* General settings */}
        <div>
          <p className="font-penmanship font-bold text-white/80 text-xs uppercase tracking-wider mb-2 px-1">
            ⚙️ Configurações Gerais
          </p>
          <div className="space-y-2">
            <SectionRow icon={<Bell size={17} />} label="Notificações" sublabel="Gerencie alertas do app" onPress={() => go('notifications')} />
            <SectionRow icon={<HardDrive size={17} />} label="Armazenamento" sublabel="Gerencie cache e dados" onPress={() => go('storage')} />
            <SectionRow icon={<CreditCard size={17} />} label="Assinatura" sublabel="Plano atual e pagamento" onPress={() => go('payment')} />
            <SectionRow icon={<HelpCircle size={17} />} label="Ajuda & Feedback" sublabel="FAQ e suporte" onPress={() => go('help')} />
          </div>
        </div>

        {/* App version */}
        <p className="font-penmanship text-center text-white/25 text-xs pt-2">Bibloo v1.0.0 • Feito com ❤️</p>
      </div>
    </Screen>
  );

  /* ───────── PROFILE ───────── */
  const ProfileView = () => (
    <Screen>
      <BackBtn onBack={() => go('main')} label="👤 Perfil" />
      <div className="px-4 pb-8 space-y-5">
        {/* Avatar grid */}
        <div>
          <p className="font-penmanship font-bold text-white text-sm mb-3">Escolha um Avatar</p>
          <div className="grid grid-cols-5 gap-3">
            {AVATARS.map((a) => (
              <motion.button
                key={a} whileTap={{ scale: 0.88 }}
                onClick={() => setAvatar(a)}
                className="aspect-square rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: avatar === a ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.18)',
                  border: avatar === a ? '2px solid rgba(255,215,0,0.7)' : '1px solid rgba(255,255,255,0.25)',
                  filter: avatar === a ? GLOW : 'none',
                }}
              >
                {a}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Name editor */}
        <div>
          <p className="font-penmanship font-bold text-white text-sm mb-2">Nome da Criança</p>
          {editingName ? (
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-xl px-4 py-2 font-penmanship text-sm outline-none"
                style={{ background: 'rgba(255,248,240,0.92)', color: '#4A2C0A', border: '2px solid rgba(255,215,0,0.4)' }}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
              />
              <motion.button whileTap={{ scale: 0.9 }}
                onClick={() => { setChildName(tempName); setEditingName(false); }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(52,199,89,0.3)', border: '1px solid rgba(52,199,89,0.5)' }}>
                <Check size={18} className="text-green-400" />
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }}
                onClick={() => { setTempName(childName); setEditingName(false); }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,80,80,0.2)', border: '1px solid rgba(255,80,80,0.4)' }}>
                <X size={18} className="text-red-400" />
              </motion.button>
            </div>
          ) : (
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => { setTempName(childName); setEditingName(true); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <span className="font-penmanship text-white flex-1 text-left text-sm">{childName}</span>
              <Edit3 size={15} className="text-white/40" />
            </motion.button>
          )}
        </div>

        {/* Save button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => go('main')}
          className="w-full font-penmanship font-bold text-white rounded-2xl py-4"
          style={{
            background: 'linear-gradient(180deg,#FFB800 0%,#FF8C00 100%)',
            borderBottom: '4px solid #CC6600', fontSize: 15, cursor: 'pointer',
          }}>
          ✅ Salvar Perfil
        </motion.button>
      </div>
    </Screen>
  );

  /* ───────── PIN ───────── */
  const PinView = () => {
    const handlePinKey = (key: string) => {
      if (key === 'del') {
        setPinInput((p) => p.slice(0, -1));
        return;
      }
      if (pinInput.length >= 4) return;
      const next = pinInput + key;
      setPinInput(next);
      if (next.length === 4) {
        setTimeout(() => {
          if (pinStep === 'verify') {
            if (next === CURRENT_PIN) { setPinStep('new'); setPinInput(''); setPinError(''); }
            else { setPinError('PIN incorreto. Tente novamente.'); setPinInput(''); }
          } else if (pinStep === 'new') {
            setNewPin(next); setPinStep('confirm'); setPinInput('');
          } else if (pinStep === 'confirm') {
            if (next === newPin) { setPinSuccess(true); }
            else { setPinError('PINs não coincidem.'); setPinInput(''); setPinStep('new'); setNewPin(''); }
          }
        }, 200);
      }
    };

    const stepLabel = pinStep === 'verify' ? 'Digite o PIN atual' : pinStep === 'new' ? 'Crie um novo PIN' : 'Confirme o novo PIN';

    return (
      <Screen>
        <BackBtn onBack={() => go('main')} label="🔑 Alterar PIN" />
        <div className="px-4 pb-8 flex flex-col items-center space-y-6 pt-4">
          {pinSuccess ? (
            <div className="flex flex-col items-center gap-4 pt-8">
              <div className="text-7xl">✅</div>
              <p className="font-penmanship font-bold text-white text-xl">PIN alterado!</p>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => go('main')}
                className="px-8 py-3 rounded-2xl font-penmanship font-bold text-white"
                style={{ background: 'linear-gradient(180deg,#FFB800,#FF8C00)', borderBottom: '3px solid #CC6600' }}>
                Voltar
              </motion.button>
            </div>
          ) : (
            <>
              <p className="font-penmanship font-bold text-white text-base">{stepLabel}</p>
              {/* Dots */}
              <div className="flex gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: i < pinInput.length ? '#FFB800' : 'rgba(255,255,255,0.2)',
                    border: '2px solid rgba(255,184,0,0.4)',
                    transition: 'background 0.15s',
                  }} />
                ))}
              </div>
              {pinError && <p className="font-penmanship text-red-400 text-sm">{pinError}</p>}
              {/* Keypad */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                {['1','2','3','4','5','6','7','8','9','','0','del'].map((k) => (
                  k === '' ? <div key="empty" /> :
                  <motion.button key={k} whileTap={{ scale: 0.88 }}
                    onClick={() => handlePinKey(k)}
                    className="aspect-square rounded-2xl flex items-center justify-center font-penmanship font-bold text-white text-xl"
                    style={{
                      background: k === 'del' ? 'rgba(255,80,80,0.2)' : 'rgba(255,255,255,0.25)',
                      border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
                    }}>
                    {k === 'del' ? '⌫' : k}
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </div>
      </Screen>
    );
  };

  /* ───────── SCREEN TIME ───────── */
  const ScreenTimeView = () => {
    const weekData = [45, 72, 30, 60, 90, 55, 40]; // mock minutes per day
    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const maxVal = Math.max(...weekData, dailyLimit);

    return (
      <Screen>
        <BackBtn onBack={() => go('main')} label="⏱️ Tempo de Tela" />
        <div className="px-4 pb-8 space-y-5">
          <ToggleRow
            icon={<Clock size={17} />}
            label="Ativar limite diário"
            sublabel="Bloqueia após atingir o limite"
            value={screenTimeEnabled}
            onChange={setScreenTimeEnabled}
          />

          {screenTimeEnabled && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="rounded-2xl p-4 space-y-4"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <p className="font-penmanship font-bold text-white text-sm">Limite por dia</p>
              <div className="flex items-center gap-4">
                <motion.button whileTap={{ scale: 0.88 }}
                  onClick={() => setDailyLimit((l) => Math.max(15, l - 15))}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Minus size={16} className="text-white" />
                </motion.button>
                <div className="flex-1 text-center">
                  <span className="font-penmanship font-bold text-white text-2xl">{dailyLimit}</span>
                  <span className="font-penmanship text-white/60 text-sm ml-1">min</span>
                </div>
                <motion.button whileTap={{ scale: 0.88 }}
                  onClick={() => setDailyLimit((l) => Math.min(180, l + 15))}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Plus size={16} className="text-white" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Weekly chart */}
          <div className="rounded-2xl p-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <p className="font-penmanship font-bold text-white text-sm">📊 Esta semana</p>
            <div className="flex items-end gap-2 h-24">
              {weekData.map((val, i) => {
                const pct = val / maxVal;
                const overLimit = screenTimeEnabled && val > dailyLimit;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full relative flex items-end" style={{ height: 80 }}>
                      {screenTimeEnabled && (
                        <div style={{
                          position: 'absolute', bottom: (dailyLimit / maxVal) * 80,
                          left: 0, right: 0, height: 1,
                          background: 'rgba(255,215,0,0.4)', borderTop: '1px dashed rgba(255,215,0,0.4)',
                        }} />
                      )}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: pct * 80 }}
                        transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                        className="w-full rounded-t-md"
                        style={{ background: overLimit ? 'rgba(255,80,80,0.7)' : 'rgba(255,184,0,0.7)' }}
                      />
                    </div>
                    <span className="font-penmanship text-white/50 text-xs">{days[i]}</span>
                  </div>
                );
              })}
            </div>
            <p className="font-penmanship text-white/40 text-xs text-center">Barra laranja = dentro do limite · vermelha = acima</p>
          </div>
        </div>
      </Screen>
    );
  };

  /* ───────── NOTIFICATIONS ───────── */
  const NotificationsView = () => (
    <Screen>
      <BackBtn onBack={() => go('main')} label="🔔 Notificações" />
      <div className="px-4 pb-8 space-y-2 pt-2">
        <ToggleRow icon={<Bell size={17} />} label="Devocional diário" sublabel="Lembrete às 8h da manhã" value={notifDevotional} onChange={setNotifDevotional} />
        <ToggleRow icon={<Star size={17} />} label="Novos jogos" sublabel="Quando novos mini-games chegam" value={notifGame} onChange={setNotifGame} />
        <ToggleRow icon={<Bell size={17} />} label="Nova história bíblica" sublabel="Alertas de novos conteúdos" value={notifStory} onChange={setNotifStory} />
        <ToggleRow icon={<Settings size={17} />} label="Atualizações do app" sublabel="Novidades e melhorias" value={notifUpdate} onChange={setNotifUpdate} />
        <ToggleRow icon={<Shield size={17} />} label="Relatório parental" sublabel="Resumo semanal de uso" value={notifParent} onChange={setNotifParent} />
      </div>
    </Screen>
  );

  /* ───────── STORAGE ───────── */
  const StorageView = () => {
    const items = [
      { label: 'Bíblia Ilustrada', size: '5.0 MB', pct: 0.62, color: '#FFB800' },
      { label: 'Vídeos em cache', size: '1.8 MB', pct: 0.22, color: '#34C759' },
      { label: 'Outros dados', size: '1.3 MB', pct: 0.16, color: '#5856D6' },
    ];
    return (
      <Screen>
        <BackBtn onBack={() => go('main')} label="💾 Armazenamento" />
        <div className="px-4 pb-8 space-y-4 pt-2">
          <div className="rounded-2xl p-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <p className="font-penmanship font-bold text-white text-sm mb-1">Uso total: ~8.1 MB</p>
            {/* Stacked bar */}
            <div className="w-full h-4 rounded-full overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.25)' }}>
              {items.map((it) => (
                <motion.div key={it.label} initial={{ flex: 0 }} animate={{ flex: it.pct }}
                  transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
                  style={{ background: it.color }} />
              ))}
            </div>
            {items.map((it) => (
              <div key={it.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: it.color }} />
                <span className="font-penmanship text-white/80 text-xs flex-1">{it.label}</span>
                <span className="font-penmanship text-white/50 text-xs">{it.size}</span>
              </div>
            ))}
          </div>

          <motion.button whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-2xl font-penmanship font-bold text-sm"
            style={{ background: 'rgba(255,80,80,0.2)', border: '1px solid rgba(255,80,80,0.4)', color: '#FF8080', cursor: 'pointer' }}>
            🗑️ Limpar cache de vídeos (1.8 MB)
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-2xl font-penmanship font-bold text-sm"
            style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
            📂 Redownload Bíblia Ilustrada
          </motion.button>
        </div>
      </Screen>
    );
  };

  /* ───────── PAYMENT ───────── */
  const PaymentView = () => (
    <Screen>
      <BackBtn onBack={() => go('main')} label="💳 Assinatura" />
      <div className="px-4 pb-8 space-y-4 pt-2">
        {/* Current plan */}
        <div className="rounded-2xl p-4"
          style={{ background: 'rgba(255,215,0,0.1)', border: '1.5px solid rgba(255,215,0,0.35)' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">⭐</div>
            <div>
              <p className="font-penmanship font-bold text-white text-base">Plano Gratuito</p>
              <p className="font-penmanship text-white/50 text-xs">Acesso limitado aos conteúdos</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['Bíblia básica', '3 mini-jogos', 'Devocional'].map((f) => (
              <span key={f} className="px-2 py-0.5 rounded-lg font-penmanship text-xs"
                style={{ background: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Premium upsell */}
        <div className="rounded-2xl overflow-hidden"
          style={{ border: '2px solid rgba(255,215,0,0.5)', boxShadow: '0 4px 20px rgba(255,140,0,0.2)' }}>
          <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg,#1A1240,#2D1B6E)' }}>
            <p className="font-penmanship font-bold text-white text-sm flex items-center gap-2">
              👑 Bibloo Premium
              <span className="px-2 py-0.5 rounded-lg text-xs font-penmanship"
                style={{ background: 'rgba(255,215,0,0.25)', color: '#FFD700' }}>POPULAR</span>
            </p>
          </div>
          <div className="px-4 py-3 space-y-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {['Bíblia ilustrada completa', 'Todos os mini-jogos', 'Vídeos BíbliaFlix ilimitados',
              'Perfis múltiplos (até 3 filhos)', 'Sem anúncios'].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <Check size={13} className="text-green-400 flex-shrink-0" />
                <span className="font-penmanship text-white/80 text-xs">{f}</span>
              </div>
            ))}
            <motion.button whileTap={{ scale: 0.95 }} className="w-full py-3 rounded-xl mt-3 font-penmanship font-bold text-sm"
              style={{ background: 'linear-gradient(90deg,#FFB800,#FF8C00)', color: '#fff', cursor: 'pointer' }}>
              ✨ Assinar por R$9,90/mês
            </motion.button>
          </div>
        </div>
      </div>
    </Screen>
  );

  /* ───────── HELP ───────── */
  const HelpView = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [feedback, setFeedback] = useState('');
    const faqs = [
      { q: 'Como mudar o PIN parental?', a: 'Vá em Controles Parentais > Alterar PIN. Você precisará do PIN atual.' },
      { q: 'Como cancelar a assinatura?', a: 'Acesse Assinatura > Gerenciar e escolha cancelar. O acesso dura até o fim do período.' },
      { q: 'Os dados ficam salvos se eu desinstalar?', a: 'Desenhos e orações ficam salvos no dispositivo. Reinstalar pode apagar esses dados.' },
      { q: 'O app funciona sem internet?', a: 'A Bíblia Ilustrada e jogos básicos funcionam offline. Vídeos precisam de conexão.' },
    ];
    return (
      <Screen>
        <BackBtn onBack={() => go('main')} label="❓ Ajuda" />
        <div className="px-4 pb-8 space-y-4 pt-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.25)' }}>
              <motion.button whileTap={{ scale: 0.98 }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.18)', cursor: 'pointer' }}>
                <span className="font-penmanship font-bold text-white text-sm flex-1 text-left">{faq.q}</span>
                {openFaq === i ? <ChevronUp size={15} className="text-white/40 flex-shrink-0" /> : <ChevronDown size={15} className="text-white/40 flex-shrink-0" />}
              </motion.button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                    <p className="px-4 py-3 font-penmanship text-white/70 text-xs leading-relaxed"
                      style={{ background: 'rgba(0,0,0,0.2)' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Feedback */}
          <div>
            <p className="font-penmanship font-bold text-white text-sm mb-2">💬 Enviar Feedback</p>
            <textarea
              placeholder="Conte-nos como podemos melhorar o Bibloo…"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full rounded-2xl p-4 font-penmanship text-sm outline-none resize-none"
              style={{ background: 'rgba(255,248,240,0.92)', border: '2px solid rgba(255,215,0,0.3)', color: '#4A2C0A' }}
            />
            <motion.button whileTap={{ scale: 0.95 }} disabled={!feedback.trim()}
              className="w-full mt-2 py-3 rounded-2xl font-penmanship font-bold text-sm"
              style={{
                background: feedback.trim() ? 'linear-gradient(180deg,#FFB800,#FF8C00)' : 'rgba(255,255,255,0.25)',
                color: feedback.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
                cursor: feedback.trim() ? 'pointer' : 'default',
              }}>
              📤 Enviar
            </motion.button>
          </div>
        </div>
      </Screen>
    );
  };

  /* ───────── RENDER ───────── */
  return (
    <div
      className="mx-auto flex flex-col"
      style={{
        width: '100%', maxWidth: 428,
        minHeight: '100dvh',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'calc(68px + env(safe-area-inset-bottom, 0px))',
        overflowY: 'auto',
      }}
    >
      <AnimatePresence mode="wait">
        {view === 'main' && <MainView key="main" />}
        {view === 'profile' && <ProfileView key="profile" />}
        {view === 'pin' && <PinView key="pin" />}
        {view === 'screenTime' && <ScreenTimeView key="screenTime" />}
        {view === 'notifications' && <NotificationsView key="notifications" />}
        {view === 'storage' && <StorageView key="storage" />}
        {view === 'payment' && <PaymentView key="payment" />}
        {view === 'help' && <HelpView key="help" />}
      </AnimatePresence>
    </div>
  );
};

export default ParentalAreaPage;
