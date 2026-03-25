import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Trash2, Minus, Plus, RotateCcw } from 'lucide-react';
import storyJesus from '@/assets/story-jesus-children.jpg';

const GLOW = 'drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))';

const COLORS = [
  '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF',
  '#5856D6', '#FF2D55', '#8B4513', '#000000', '#FFFFFF',
];

interface ReflectPageProps {
  onNavigate: (page: string) => void;
  verseText?: string;
  verseRef?: string;
}

const ReflectPage = ({
  onNavigate,
  verseText = '"O meu mandamento é este: amem-se uns aos outros como eu os amei."',
  verseRef = 'João 15:12',
}: ReflectPageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#007AFF');
  const [brushSize, setBrushSize] = useState(5);
  const [prayerText, setPrayerText] = useState('');
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFF8F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.TouchEvent | React.MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as React.MouseEvent).clientY - rect.top) * scaleY,
    };
  };

  const startDraw = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    e.preventDefault();
    setIsDrawing(true);
    lastPos.current = getPos(e, canvas);
  }, []);

  const draw = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      e.preventDefault();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const pos = getPos(e, canvas);
      ctx.beginPath();
      ctx.moveTo(lastPos.current!.x, lastPos.current!.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      lastPos.current = pos;
    },
    [isDrawing, color, brushSize]
  );

  const stopDraw = useCallback(() => {
    setIsDrawing(false);
    lastPos.current = null;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFF8F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div
      className="mx-auto flex flex-col"
      style={{
        width: '100%',
        maxWidth: 428,
        minHeight: '100dvh',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'calc(68px + env(safe-area-inset-bottom, 0px))',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center px-3 pt-4 pb-3"
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
      >
        <button
          onClick={() => onNavigate('devotional')}
          style={{ minHeight: 44, minWidth: 44, filter: GLOW, background: 'none', border: 'none', cursor: 'pointer' }}
          className="flex items-center justify-center"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <h1
          className="font-penmanship font-bold text-white flex-1 text-center mr-11"
          style={{ fontSize: 'clamp(18px, 5vw, 24px)' }}
        >
          🙏 Refletir e Orar
        </h1>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Verse card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden shadow-lg"
          style={{ border: '2px solid rgba(255,215,0,0.4)' }}
        >
          <img src={storyJesus} alt="" className="w-full h-28 object-cover" style={{ filter: 'brightness(0.7)' }} />
          <div className="p-3" style={{ background: 'rgba(255,248,240,0.95)' }}>
            <p className="font-penmanship text-sm text-gray-700 italic leading-relaxed">{verseText}</p>
            <p className="font-penmanship text-xs text-amber-600 font-bold mt-1">{verseRef}</p>
          </div>
        </motion.div>

        {/* Drawing section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-penmanship font-bold text-white text-sm">
              🎨 O que você imaginou?
            </p>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 px-3 py-1 rounded-xl font-penmanship text-xs text-white"
              style={{ background: 'rgba(255,80,80,0.35)', border: '1px solid rgba(255,80,80,0.5)' }}
            >
              <Trash2 size={12} /> Limpar
            </button>
          </div>

          {/* Canvas */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '3px solid rgba(255,215,0,0.5)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'none', cursor: 'crosshair' }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          </div>

          {/* Color palette */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: c,
                  border: color === c ? '3px solid #FFD700' : '2px solid rgba(255,255,255,0.4)',
                  flexShrink: 0,
                  boxShadow: color === c ? '0 0 8px rgba(255,215,0,0.8)' : 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          {/* Brush size */}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => setBrushSize((s) => Math.max(1, s - 2))}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Minus size={14} className="text-white" />
            </button>
            <div className="flex-1 flex items-center justify-center">
              <div
                style={{
                  width: brushSize * 3,
                  height: brushSize * 3,
                  borderRadius: '50%',
                  background: color,
                  border: '1px solid rgba(255,255,255,0.4)',
                  maxWidth: 40,
                  maxHeight: 40,
                  minWidth: 6,
                  minHeight: 6,
                }}
              />
            </div>
            <button
              onClick={() => setBrushSize((s) => Math.min(20, s + 2))}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <Plus size={14} className="text-white" />
            </button>
            <button
              onClick={() => { setColor('#FFF8F0'); setBrushSize(16); }}
              className="flex items-center gap-1 px-2 py-1 rounded-xl font-penmanship text-xs text-white"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 11 }}
            >
              <RotateCcw size={11} /> Borracha
            </button>
          </div>
        </motion.div>

        {/* Prayer section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-penmanship font-bold text-white text-sm mb-2">💬 Minha Oração</p>
          <textarea
            placeholder="Escreva sua oração aqui… fale com Jesus como um amigo!"
            value={prayerText}
            onChange={(e) => setPrayerText(e.target.value)}
            rows={5}
            className="w-full rounded-2xl p-4 font-penmanship text-sm outline-none resize-none"
            style={{
              background: 'rgba(255,248,240,0.92)',
              border: '2px solid rgba(255,215,0,0.3)',
              color: '#4A2C0A',
            }}
          />
        </motion.div>

        {/* Done button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('devotional')}
          className="w-full font-penmanship font-bold text-white rounded-2xl py-4"
          style={{
            background: 'linear-gradient(180deg, #FFB800 0%, #FF8C00 100%)',
            borderBottom: '4px solid #CC6600',
            fontSize: 16,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🙏 Amém! Voltar ao Devocional
        </motion.button>
      </div>
    </div>
  );
};

export default ReflectPage;
