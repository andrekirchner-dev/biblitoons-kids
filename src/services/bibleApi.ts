const BASE_URL = 'https://bible.helloao.org/api';
export const TRANSLATION_ID = 'por_onbv';
export const TRANSLATION_NAME = 'Nova Bíblia Viva';

// ── Types ──────────────────────────────────────────────────────────────────

export interface BibleBook {
  id: string;
  name: string;
  commonName: string;
  order: number;
  numberOfChapters: number;
  firstChapterNumber: number;
  lastChapterNumber: number;
}

export interface BibleVerseContent {
  type: 'verse' | 'heading' | 'line_break' | string;
  number?: number;
  content?: (string | { text: string; [key: string]: unknown })[];
}

export interface BibleChapterData {
  translation: { id: string; name: string };
  book: { id: string; name: string; commonName: string };
  chapter: {
    number: number;
    content: BibleVerseContent[];
    footnotes?: unknown[];
  };
  nextChapterApiLink: string | null;
  previousChapterApiLink: string | null;
  numberOfVerses: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Extracts plain text from a verse content array (strings or inline objects). */
export function extractVerseText(
  content: BibleVerseContent['content']
): string {
  if (!content) return '';
  return content
    .map((c) => (typeof c === 'string' ? c : c?.text ?? ''))
    .join('');
}

// ── API functions ──────────────────────────────────────────────────────────

export const bibleApi = {
  /** Returns all 66 books for the configured translation. */
  getBooks: async (): Promise<BibleBook[]> => {
    const res = await fetch(`${BASE_URL}/${TRANSLATION_ID}/books.json`);
    if (!res.ok) throw new Error(`Erro ao carregar livros: ${res.status}`);
    const data = await res.json();
    return data.books as BibleBook[];
  },

  /** Returns the full chapter with verses. */
  getChapter: async (
    bookId: string,
    chapter: number
  ): Promise<BibleChapterData> => {
    const res = await fetch(
      `${BASE_URL}/${TRANSLATION_ID}/${bookId}/${chapter}.json`
    );
    if (!res.ok)
      throw new Error(`Erro ao carregar capítulo: ${res.status}`);
    return res.json() as Promise<BibleChapterData>;
  },
};
