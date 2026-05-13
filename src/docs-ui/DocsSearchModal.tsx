import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { DocsSearchEntry } from '@/crm-docs/crmDocsNav';

interface DocsSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  entries: DocsSearchEntry[];
}

export function DocsSearchModal({ open, onClose, onSelect, entries }: DocsSearchModalProps) {
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const s = query.trim().toLowerCase();
    if (!s) return entries;
    return entries.filter(
      (e) => e.title.toLowerCase().includes(s) || e.group.toLowerCase().includes(s)
    );
  }, [entries, query]);

  const activeIndex = useMemo(
    () => (filtered.length === 0 ? 0 : Math.min(highlighted, filtered.length - 1)),
    [filtered.length, highlighted]
  );

  useLayoutEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const choose = useCallback(
    (id: string) => {
      onSelect(id);
      onClose();
    },
    [onClose, onSelect]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlighted((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlighted((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        choose(filtered[activeIndex].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, activeIndex, choose, onClose]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const row = listRef.current.querySelector<HTMLElement>(`[data-search-index="${activeIndex}"]`);
    row?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="docs-search"
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] dark:bg-black/60"
            aria-label="Close search"
            onClick={onClose}
          />
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center p-4 pt-[12vh] sm:pt-[15vh]">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search documentation"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              className="pointer-events-auto flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-center gap-2 border-b border-slate-100 px-3 dark:border-slate-800">
                <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setHighlighted(0);
                  }}
                  placeholder="Search documentation…"
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div ref={listRef} className="docs-scrollbar max-h-[min(55vh,420px)] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p className="font-medium text-slate-700 dark:text-slate-200">No matching topics</p>
                    <p className="mt-1 text-xs">Try another keyword or browse the sidebar.</p>
                  </div>
                ) : (
                  <ul className="space-y-0.5">
                    {filtered.map((item, index) => {
                      const active = index === activeIndex;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            data-search-index={index}
                            onClick={() => choose(item.id)}
                            onMouseEnter={() => setHighlighted(index)}
                            className={cn(
                              'flex w-full flex-col rounded-xl px-3 py-2.5 text-left transition-colors',
                              active
                                ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/80'
                            )}
                          >
                            <span className="text-[13px] font-semibold leading-snug">{item.title}</span>
                            <span
                              className={cn(
                                'mt-0.5 text-[11px] font-medium uppercase tracking-wide',
                                active ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'
                              )}
                            >
                              {item.group}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 px-3 py-2 text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-600 dark:bg-slate-800">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-600 dark:bg-slate-800">
                    ↓
                  </kbd>
                  <span className="ml-1">Navigate</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" aria-hidden />
                  Open
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
