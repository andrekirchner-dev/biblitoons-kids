import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Loader2 } from 'lucide-react';
import { useBibleBooks, useBibleChapter, isOldTestament } from '@/hooks/useBible';
import { BibleBook, extractVerseText, TRANSLATION_NAME } from '@/services/bibleApi';

// ── Constants ──────────────────────────────────────────────────────────────

const GLOW = 'drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))';
const OT_COLOR = '#4CAF50';
const OT_BORDER = '#2E7D32';
const NT_COLOR = '#4A90D9';
const NT_BORDER = '#2B65A8';

type View = 'books' | 'chapters' | 'reading';

// ── Interfaces ─────────────────────────────────────────────────────────────

interface BiblePageProps {
  onNavigate?: (page: string) => void;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function LoadingSpinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2
        className="animate-spin"
        style={{ color: '#FFD700', width: 36, height: 36, filter: GLOW }}
      />
      <p className="font-penmanship text-white text-sm opacity-80">{label}</p>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      className="mx-4 mt-6 rounded-2xl p-4 text-center"
      style={{ background: 'rgba(255,80,80,0.2)', border: '1px solid rgba(255,80,80,0.4)' }}
    >
      <p className="text-white font-penmanship text-sm">{message}</p>
      <p className="text-white/60 text-xs mt-1">Verifique sua conexão e tente novamente.</p>
    </div>
  );
}

// ── Back button ────────────────────────────────────────────────────────────

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1"
      style={{ minHeight: 44, minWidth: 44, filter: GLOW, background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <ChevronLeft className="text-white" size={24} />
      <span className="font-penmanship text-white text-sm" style={{ fontSize: 13 }}>{label}</span>
    </button>
  );
}

// ── View 1: Book List ──────────────────────────────────────────────────────

function BooksView({
  onSelectBook,
  onNavigate,
}: {
  onSelectBook: (book: BibleBook) => void;
  onNavigate?: (page: string) => void;
}) {
  const { data: books, isLoading, isError } = useBibleBooks();

  const oldTestament = books?.filter(isOldTestament) ?? [];
  const newTestament = books?.filter((b) => !isOldTestament(b)) ?? [];

  return (
    <div
      className="mx-auto overflow-x-hidden"
      style={{
        width: '100%',
        maxWidth: 428,
        minHeight: '100dvh',
        paddingBottom: 80,
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center px-4 pt-6 mb-4">
        {onNavigate && (
          <BackButton onClick={() => onNavigate('home')} label="" />
        )}
        <h1
          className="font-penmanship font-bold text-white flex-1 text-center"
          style={{ fontSize: 'clamp(20px, 5.5vw, 26px)', marginRight: onNavigate ? 44 : 0 }}
        >
          Ler a Bíblia
        </h1>
      </div>

      {/* Translation badge */}
      <div className="flex justify-center mb-3">
        <span
          className="font-penmanship text-xs px-3 py-1 rounded-full"
          style={{ background: 'rgba(255,215,0,0.2)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.35)' }}
        >
          📖 {TRANSLATION_NAME}
        </span>
      </div>

      {isLoading && <LoadingSpinner label="Carregando livros…" />}
      {isError && <ErrorMessage message="Não foi possível carregar os livros da Bíblia." />}

      {books && (
        <div className="flex px-4 gap-3">
          {/* Old Testament */}
          <div className="flex-1 flex flex-col">
            <h2
              className="font-penmanship font-bold text-center mb-2"
              style={{ fontSize: 'clamp(12px, 3.3vw, 15px)', color: OT_COLOR }}
            >
              Velho Testamento
            </h2>
            <div className="overflow-y-auto flex flex-col gap-2" style={{ maxHeight: '65dvh' }}>
              {oldTestament.map((book) => (
                <motion.button
                  key={book.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelectBook(book)}
                  className="font-penmanship text-white font-bold text-left"
                  style={{
                    background: OT_COLOR,
                    borderRadius: 12,
                    padding: '10px 10px',
                    fontSize: 'clamp(11px, 3vw, 13px)',
                    minHeight: 44,
                    borderBottom: `3px solid ${OT_BORDER}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{book.name}</span>
                  <span style={{ opacity: 0.7, fontSize: 10 }}>{book.numberOfChapters}cap</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* New Testament */}
          <div className="flex-1 flex flex-col">
            <h2
              className="font-penmanship font-bold text-center mb-2"
              style={{ fontSize: 'clamp(12px, 3.3vw, 15px)', color: NT_COLOR }}
            >
              Novo Testamento
            </h2>
            <div className="overflow-y-auto flex flex-col gap-2" style={{ maxHeight: '65dvh' }}>
              {newTestament.map((book) => (
                <motion.button
                  key={book.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelectBook(book)}
                  className="font-penmanship text-white font-bold text-left"
                  style={{
                    background: NT_COLOR,
                    borderRadius: 12,
                    padding: '10px 10px',
                    fontSize: 'clamp(11px, 3vw, 13px)',
                    minHeight: 44,
                    borderBottom: `3px solid ${NT_BORDER}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{book.name}</span>
                  <span style={{ opacity: 0.7, fontSize: 10 }}>{book.numberOfChapters}cap</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── View 2: Chapter Grid ───────────────────────────────────────────────────

function ChaptersView({
  book,
  onSelectChapter,
  onBack,
}: {
  book: BibleBook;
  onSelectChapter: (chapter: number) => void;
  onBack: () => void;
}) {
  const isOT = isOldTestament(book);
  const accent = isOT ? OT_COLOR : NT_COLOR;
  const chapters = Array.from(
    { length: book.numberOfChapters },
    (_, i) => book.firstChapterNumber + i
  );

  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }}
      className="mx-auto"
      style={{ width: '100%', maxWidth: 428, minHeight: '100dvh', paddingBottom: 80 }}
    >
      {/* Header */}
      <div className="flex items-center px-4 pt-6 mb-5">
        <BackButton onClick={onBack} label="Livros" />
        <h1
          className="font-penmanship font-bold text-white flex-1 text-center"
          style={{ fontSize: 'clamp(18px, 5vw, 24px)', color: accent, filter: GLOW }}
        >
          {book.name}
        </h1>
        <div style={{ width: 44 }} />
      </div>

      <p
        className="font-penmanship text-center mb-4"
        style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}
      >
        Escolha um capítulo
      </p>

      {/* Chapter grid */}
      <div
        className="grid px-4 gap-2"
        style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
      >
        {chapters.map((ch) => (
          <motion.button
            key={ch}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelectChapter(ch)}
            className="font-penmanship font-bold text-white"
            style={{
              background: accent,
              borderRadius: 12,
              height: 48,
              fontSize: 16,
              borderBottom: `3px solid ${isOT ? OT_BORDER : NT_BORDER}`,
              cursor: 'pointer',
            }}
          >
            {ch}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ── View 3: Chapter Reading ────────────────────────────────────────────────

function ReadingView({
  book,
  chapter,
  onChangeChapter,
  onBack,
}: {
  book: BibleBook;
  chapter: number;
  onChangeChapter: (ch: number) => void;
  onBack: () => void;
}) {
  const { data, isLoading, isError } = useBibleChapter(book.id, chapter);
  const isOT = isOldTestament(book);
  const accent = isOT ? OT_COLOR : NT_COLOR;

  const hasPrev = chapter > book.firstChapterNumber;
  const hasNext = chapter < book.lastChapterNumber;

  // Extract only verse items from the content
  const verses =
    data?.chapter.content.filter(
      (item) => item.type === 'verse' && item.number !== undefined
    ) ?? [];

  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }}
      className="mx-auto"
      style={{ width: '100%', maxWidth: 428, minHeight: '100dvh', paddingBottom: 100 }}
    >
      {/* Header */}
      <div className="flex items-center px-4 pt-6 mb-4">
        <BackButton onClick={onBack} label="Capítulos" />
        <h1
          className="font-penmanship font-bold text-white flex-1 text-center"
          style={{ fontSize: 'clamp(16px, 4.5vw, 22px)' }}
        >
          {book.name} {chapter}
        </h1>
        <div style={{ width: 44 }} />
      </div>

      {/* Translation badge */}
      <div className="flex justify-center mb-3">
        <span
          className="font-penmanship text-xs px-3 py-1 rounded-full"
          style={{ background: 'rgba(255,215,0,0.2)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.35)' }}
        >
          {TRANSLATION_NAME}
        </span>
      </div>

      {isLoading && <LoadingSpinner label={`Carregando ${book.name} ${chapter}…`} />}
      {isError && <ErrorMessage message="Não foi possível carregar este capítulo." />}

      {/* Verses */}
      {data && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${book.id}-${chapter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-4 rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            {verses.length === 0 ? (
              <p style={{ color: '#9CA3AF', textAlign: 'center', fontSize: 14 }}>
                Conteúdo indisponível para este capítulo.
              </p>
            ) : (
              verses.map((verse) => (
                <p
                  key={verse.number}
                  style={{
                    color: '#3D2A1A',
                    fontSize: 'clamp(13px, 3.5vw, 15px)',
                    lineHeight: 1.85,
                    marginBottom: 8,
                  }}
                >
                  <span
                    className="font-penmanship font-bold"
                    style={{ color: accent, marginRight: 4, fontSize: 'clamp(11px, 3vw, 13px)' }}
                  >
                    {verse.number}.
                  </span>
                  {extractVerseText(verse.content)}
                </p>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Chapter navigation */}
      {data && (
        <div className="flex justify-between items-center px-4 mt-5 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={!hasPrev}
            onClick={() => onChangeChapter(chapter - 1)}
            className="flex items-center gap-1 font-penmanship font-bold text-white"
            style={{
              background: hasPrev ? accent : 'rgba(255,255,255,0.15)',
              borderRadius: 16,
              padding: '10px 16px',
              opacity: hasPrev ? 1 : 0.4,
              cursor: hasPrev ? 'pointer' : 'default',
              borderBottom: hasPrev ? `3px solid ${isOT ? OT_BORDER : NT_BORDER}` : 'none',
              fontSize: 14,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={16} />
            Cap. {chapter - 1}
          </motion.button>

          <div
            className="flex items-center gap-1 font-penmanship"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, flexShrink: 0 }}
          >
            <BookOpen size={14} />
            {chapter}/{book.numberOfChapters}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={!hasNext}
            onClick={() => onChangeChapter(chapter + 1)}
            className="flex items-center gap-1 font-penmanship font-bold text-white"
            style={{
              background: hasNext ? accent : 'rgba(255,255,255,0.15)',
              borderRadius: 16,
              padding: '10px 16px',
              opacity: hasNext ? 1 : 0.4,
              cursor: hasNext ? 'pointer' : 'default',
              borderBottom: hasNext ? `3px solid ${isOT ? OT_BORDER : NT_BORDER}` : 'none',
              fontSize: 14,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            Cap. {chapter + 1}
            <ChevronRight size={16} />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

// ── Main BiblePage ─────────────────────────────────────────────────────────

const BiblePage = ({ onNavigate }: BiblePageProps) => {
  const [view, setView] = useState<View>('books');
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState(1);

  const handleSelectBook = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(book.firstChapterNumber);
    setView('chapters');
  };

  const handleSelectChapter = (chapter: number) => {
    setSelectedChapter(chapter);
    setView('reading');
  };

  const handleBackToBooks = () => {
    setSelectedBook(null);
    setView('books');
  };

  const handleBackToChapters = () => {
    setView('chapters');
  };

  return (
    <AnimatePresence mode="wait">
      {view === 'books' && (
        <motion.div key="books" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <BooksView onSelectBook={handleSelectBook} onNavigate={onNavigate} />
        </motion.div>
      )}

      {view === 'chapters' && selectedBook && (
        <ChaptersView
          key="chapters"
          book={selectedBook}
          onSelectChapter={handleSelectChapter}
          onBack={handleBackToBooks}
        />
      )}

      {view === 'reading' && selectedBook && (
        <ReadingView
          key="reading"
          book={selectedBook}
          chapter={selectedChapter}
          onChangeChapter={handleSelectChapter}
          onBack={handleBackToChapters}
        />
      )}
    </AnimatePresence>
  );
};

export default BiblePage;
