import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Search, X, Loader2 } from 'lucide-react';
import { bibleApi, BibleBook, extractVerseText } from '@/services/bibleApi';
import { useBibleBooks } from '@/hooks/useBible';

const GLOW = 'drop-shadow(0 0 6px rgba(255,215,0,0.85)) drop-shadow(0 0 12px rgba(255,165,0,0.5))';

interface SearchPageProps {
  onNavigate: (page: string) => void;
}

interface SearchResult {
  book: BibleBook;
  chapter: number;
  verse: number;
  text: string;
  reference: string;
}

// Parse "João 3:16" style references
function parseReference(query: string, books: BibleBook[]): { book: BibleBook; chapter: number; verse: number } | null {
  const match = query.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
  if (!match) return null;
  const bookName = match[1].trim().toLowerCase();
  const chapterNum = parseInt(match[2]);
  const verseNum = match[3] ? parseInt(match[3]) : 1;
  const book = books.find(
    (b) =>
      b.name.toLowerCase().includes(bookName) ||
      b.commonName.toLowerCase().includes(bookName)
  );
  if (!book || chapterNum < 1 || chapterNum > book.numberOfChapters) return null;
  return { book, chapter: chapterNum, verse: verseNum };
}

/* ── Shared search box component ── */
const SearchBox = ({
  query, onChange, onKeyDown, onClear, onSearch, loading,
}: {
  query: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onClear: () => void;
  onSearch: () => void;
  loading: boolean;
}) => (
  /* Low-opacity wrapper box */
  <div
    className="rounded-3xl p-5"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.09)',
      backdropFilter: 'blur(6px)',
    }}
  >
    {/* Input row */}
    <div
      className="flex items-center gap-2 rounded-2xl px-4 py-3 mb-4"
      style={{
        background: 'rgba(6,18,58,0.88)',
        border: '2px solid rgba(255,215,0,0.50)',
        boxShadow: '0 4px 20px rgba(255,184,0,0.14)',
      }}
    >
      <Search style={{ color: '#FFD700', filter: GLOW, flexShrink: 0 }} size={20} />
      <input
        type="text"
        placeholder=""
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 bg-transparent outline-none font-penmanship text-sm"
        style={{ color: 'white' }}
        autoFocus
      />
      {query ? (
        <button onClick={onClear}>
          <X className="text-white/60" size={16} />
        </button>
      ) : null}
    </div>

    {/* Buscar button */}
    <div className="flex justify-center">
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onSearch}
        disabled={loading}
        className="rounded-2xl px-10 py-2.5 font-penmanship font-bold text-white text-sm"
        style={{
          background: 'linear-gradient(180deg, #FFB800 0%, #FF8C00 100%)',
          boxShadow: '0 4px 16px rgba(255,140,0,0.38)',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : '🔍 Buscar'}
      </motion.button>
    </div>
  </div>
);

const SearchPage = ({ onNavigate }: SearchPageProps) => {
  const { data: books } = useBibleBooks();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [bookMatches, setBookMatches] = useState<BibleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [refResult, setRefResult] = useState<SearchResult | null>(null);

  const doSearch = useCallback(async () => {
    if (!query.trim() || !books) return;
    setLoading(true);
    setSearched(true);
    setResults([]);
    setRefResult(null);

    const q = query.trim().toLowerCase();

    // 1. Check if it's a reference like "João 3:16"
    const ref = parseReference(query.trim(), books);
    if (ref) {
      try {
        const data = await bibleApi.getChapter(ref.book.id, ref.chapter);
        const verses = data.chapter.content.filter((c) => c.type === 'verse');
        const v = verses.find((c) => c.number === ref.verse) ?? verses[0];
        if (v) {
          setRefResult({
            book: ref.book,
            chapter: ref.chapter,
            verse: v.number ?? 1,
            text: extractVerseText(v.content),
            reference: `${ref.book.name} ${ref.chapter}:${v.number ?? 1}`,
          });
        }
      } catch {
        // ignore
      }
      setLoading(false);
      setBookMatches([]);
      return;
    }

    // 2. Book name search
    const matchedBooks = books.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.commonName.toLowerCase().includes(q)
    );
    setBookMatches(matchedBooks);

    // 3. Verse keyword search
    const keywordResults: SearchResult[] = [];
    const topBooks = books.slice(0, 5);
    for (const book of topBooks) {
      if (keywordResults.length >= 10) break;
      try {
        for (let ch = 1; ch <= Math.min(3, book.numberOfChapters); ch++) {
          const data = await bibleApi.getChapter(book.id, ch);
          for (const content of data.chapter.content) {
            if (content.type !== 'verse') continue;
            const text = extractVerseText(content.content);
            if (text.toLowerCase().includes(q)) {
              keywordResults.push({
                book,
                chapter: ch,
                verse: content.number ?? 1,
                text,
                reference: `${book.name} ${ch}:${content.number ?? 1}`,
              });
              if (keywordResults.length >= 10) break;
            }
          }
          if (keywordResults.length >= 10) break;
        }
      } catch {
        // skip
      }
    }
    setResults(keywordResults);
    setLoading(false);
  }, [query, books]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setBookMatches([]);
    setRefResult(null);
    setSearched(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <div
        style={{
          maxWidth: 428, width: '100%', margin: '0 auto',
          flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-3 pt-5 pb-2 flex-shrink-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => onNavigate('home')}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)', border: '2px solid rgba(255,215,0,0.5)',
              filter: GLOW, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <ChevronLeft className="text-white" size={24} />
          </motion.button>
          <h1 className="font-penmanship font-bold text-white text-base flex-1 text-center mr-11">
            🔍 Buscar na Bíblia
          </h1>
        </div>

        {/* ── NOT YET SEARCHED: search box vertically centered ── */}
        {!searched && (
          <div className="flex-1 flex flex-col items-center justify-center px-5 pb-16">
            <div style={{ width: '100%' }}>
              {/* Hint text above the box */}
              <div className="flex flex-col items-center gap-1 mb-5">
                <p className="font-penmanship font-bold text-white text-lg text-center">
                  O que você quer encontrar hoje?
                </p>
                <p className="font-penmanship text-white/45 text-center text-xs px-6">
                  Exemplo: "João 3:16", "Gênesis 1", "amor"
                </p>
              </div>
              <SearchBox
                query={query}
                onChange={setQuery}
                onKeyDown={handleKeyDown}
                onClear={clearSearch}
                onSearch={doSearch}
                loading={loading}
              />
            </div>
          </div>
        )}

        {/* ── SEARCHED: search box at top + scrollable results ── */}
        {searched && (
          <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
            {/* Search box pinned at top */}
            <div className="px-5 pt-4 pb-2 flex-shrink-0">
              <SearchBox
                query={query}
                onChange={setQuery}
                onKeyDown={handleKeyDown}
                onClear={clearSearch}
                onSearch={doSearch}
                loading={loading}
              />
            </div>

            {/* Scrollable results */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
              style={{ paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}
            >
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-3"
                  >
                    <Loader2 size={36} className="animate-spin" style={{ color: '#FFD700', filter: GLOW }} />
                    <p className="font-penmanship text-white/70 text-sm">Buscando…</p>
                  </motion.div>
                )}

                {!loading && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Direct reference result */}
                    {refResult && (
                      <div>
                        <p className="font-penmanship text-white/60 text-xs mb-2">VERSÍCULO ENCONTRADO</p>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="rounded-2xl p-4 cursor-pointer"
                          style={{ background: 'rgba(255,215,0,0.15)', border: '1.5px solid rgba(255,215,0,0.4)' }}
                        >
                          <p className="font-penmanship font-bold text-yellow-300 text-sm mb-1">
                            {refResult.reference}
                          </p>
                          <p className="font-penmanship text-white text-sm leading-relaxed">
                            "{refResult.text}"
                          </p>
                        </motion.div>
                      </div>
                    )}

                    {/* Book matches */}
                    {bookMatches.length > 0 && (
                      <div>
                        <p className="font-penmanship text-white/60 text-xs mb-2">LIVROS ENCONTRADOS</p>
                        <div className="flex flex-wrap gap-2">
                          {bookMatches.map((b) => (
                            <motion.button
                              key={b.id}
                              whileTap={{ scale: 0.95 }}
                              className="rounded-xl px-3 py-2 font-penmanship font-bold text-white text-xs"
                              style={{
                                background: b.order <= 39 ? '#4CAF50' : '#4A90D9',
                                border: `2px solid ${b.order <= 39 ? '#2E7D32' : '#2B65A8'}`,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              }}
                              onClick={() => onNavigate('bible')}
                            >
                              {b.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Verse keyword results */}
                    {results.length > 0 && (
                      <div>
                        <p className="font-penmanship text-white/60 text-xs mb-2">
                          VERSÍCULOS COM "{query.toUpperCase()}"
                        </p>
                        <div className="space-y-2">
                          {results.map((r, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              whileTap={{ scale: 0.98 }}
                              className="rounded-2xl p-3 cursor-pointer"
                              style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.15)',
                              }}
                            >
                              <p className="font-penmanship font-bold text-yellow-300 text-xs mb-1">
                                {r.reference}
                              </p>
                              <p className="font-penmanship text-white/80 text-sm leading-relaxed line-clamp-2">
                                {r.text}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No results */}
                    {!refResult && bookMatches.length === 0 && results.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <p className="font-penmanship text-white/60 text-center text-base">
                          Nenhum resultado para "{query}"
                        </p>
                        <p className="font-penmanship text-white/40 text-center text-xs px-8">
                          Tente buscar pelo nome do livro ou uma referência como "João 3:16"
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
