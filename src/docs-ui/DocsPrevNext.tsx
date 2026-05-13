import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DocsPrevNextProps {
  orderedIds: string[];
  idToLabel: Map<string, string>;
  activeId: string;
  onSelect: (id: string) => void;
}

export function DocsPrevNext({ orderedIds, idToLabel, activeId, onSelect }: DocsPrevNextProps) {
  const idx = orderedIds.indexOf(activeId);
  const prevId = idx > 0 ? orderedIds[idx - 1] : null;
  const nextId = idx >= 0 && idx < orderedIds.length - 1 ? orderedIds[idx + 1] : null;

  if (!prevId && !nextId) return null;

  return (
    <nav
      className="mt-16 flex flex-col gap-3 border-t border-slate-200/80 pt-10 sm:flex-row sm:justify-between dark:border-slate-800/80"
      aria-label="Previous and next documentation pages"
    >
      {prevId ? (
        <button
          type="button"
          onClick={() => onSelect(prevId)}
          className={cn(
            'group flex max-w-full flex-1 items-start gap-3 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 text-left shadow-sm transition-all',
            'hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-indigo-900/60 dark:hover:bg-indigo-950/25'
          )}
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-colors group-hover:border-indigo-200 group-hover:bg-white group-hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:group-hover:border-indigo-800 dark:group-hover:text-indigo-300">
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Previous
            </span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900 dark:text-white">
              {idToLabel.get(prevId) ?? prevId}
            </span>
          </span>
        </button>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}
      {nextId ? (
        <button
          type="button"
          onClick={() => onSelect(nextId)}
          className={cn(
            'group flex max-w-full flex-1 items-start justify-end gap-3 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 text-right shadow-sm transition-all sm:text-right',
            'hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-indigo-900/60 dark:hover:bg-indigo-950/25'
          )}
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Next
            </span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900 dark:text-white">
              {idToLabel.get(nextId) ?? nextId}
            </span>
          </span>
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-colors group-hover:border-indigo-200 group-hover:bg-white group-hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:group-hover:border-indigo-800 dark:group-hover:text-indigo-300">
            <ChevronRight className="h-4 w-4" aria-hidden />
          </span>
        </button>
      ) : null}
    </nav>
  );
}
