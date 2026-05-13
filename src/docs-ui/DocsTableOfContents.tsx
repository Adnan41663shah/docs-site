import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ListTree } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface TocHeading {
  id: string;
  text: string;
  level: 'h2' | 'h3';
}

function collectHeadings(): TocHeading[] {
  const root = document.querySelector('[data-docs-article]');
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>('[data-doc-heading]'))
    .map((el) => ({
      id: el.id,
      text: (el.textContent ?? '').trim(),
      level: (el.getAttribute('data-doc-heading') as 'h2' | 'h3') || 'h2',
    }))
    .filter((h) => h.id && h.text);
}

export function DocsTableOfContents({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState('');

  const refresh = useCallback(() => {
    setHeadings(collectHeadings());
  }, []);

  useEffect(() => {
    const schedule = () => {
      window.setTimeout(() => refresh(), 0);
    };
    schedule();
    const t = window.setTimeout(schedule, 120);
    const root = document.querySelector('[data-docs-article]');
    const mo = new MutationObserver(schedule);
    if (root) mo.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['id'] });
    const onHash = () => schedule();
    window.addEventListener('hashchange', onHash);
    return () => {
      window.clearTimeout(t);
      mo.disconnect();
      window.removeEventListener('hashchange', onHash);
    };
  }, [refresh]);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((n): n is HTMLElement => !!n);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.target.id)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { root: null, rootMargin: '-12% 0px -70% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200/90 bg-white/50 px-3 py-6 text-center dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto mb-2 flex h-8 w-8 animate-pulse items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800" />
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">Loading outline…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <ListTree className="h-3.5 w-3.5" aria-hidden />
        On this page
      </div>
      <ul className="space-y-0.5 border-l border-slate-200/90 dark:border-slate-800">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id} className={cn(h.level === 'h3' && 'pl-3')}>
              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={() => onNavigate(h.id)}
                className={cn(
                  'relative block w-full border-l-2 py-1.5 pl-3 text-left text-[13px] leading-snug transition-colors',
                  h.level === 'h3' && 'pl-4 text-[12px]',
                  active
                    ? '-ml-px border-indigo-600 font-medium text-indigo-700 dark:border-indigo-400 dark:text-indigo-300'
                    : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                )}
              >
                <span className="line-clamp-3">{h.text}</span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
