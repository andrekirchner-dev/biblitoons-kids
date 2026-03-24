import { useQuery } from '@tanstack/react-query';
import { bibleApi, BibleBook } from '@/services/bibleApi';

// First 39 books (order 1-39) = Old Testament
export const OT_MAX_ORDER = 39;

export function isOldTestament(book: BibleBook): boolean {
  return book.order <= OT_MAX_ORDER;
}

// ── Hooks ──────────────────────────────────────────────────────────────────

/** Loads all 66 books. Cached indefinitely (static data). */
export function useBibleBooks() {
  return useQuery({
    queryKey: ['bible', 'books'],
    queryFn: bibleApi.getBooks,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

/** Loads a specific chapter. Cached for 10 minutes. */
export function useBibleChapter(bookId: string | null, chapter: number) {
  return useQuery({
    queryKey: ['bible', 'chapter', bookId, chapter],
    queryFn: () => bibleApi.getChapter(bookId!, chapter),
    enabled: !!bookId && chapter > 0,
    staleTime: 10 * 60 * 1000,
  });
}
