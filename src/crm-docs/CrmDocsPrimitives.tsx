import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { DocsHeadingCopy } from '@/docs-ui/DocsHeadingCopy';
import { slugify } from '@/docs-ui/slugify';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Info,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  OctagonAlert,
} from 'lucide-react';

type SectionSlugContextValue = {
  sectionId: string;
  makeUniqueSlug: (base: string) => string;
};

const SectionSlugContext = createContext<SectionSlugContextValue | null>(null);

export function DocSection({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const countsRef = useRef(new Map<string, number>());
  const makeUniqueSlug = useCallback((base: string) => {
    const clean = base || 'section';
    const n = countsRef.current.get(clean) ?? 0;
    countsRef.current.set(clean, n + 1);
    return n === 0 ? clean : `${clean}-${n}`;
  }, []);

  const value = useMemo(() => ({ sectionId: id, makeUniqueSlug }), [id, makeUniqueSlug]);

  return (
    <SectionSlugContext.Provider value={value}>
      <section
        id={id}
        data-doc-section
        className={cn(
          'scroll-mt-[calc(var(--docs-header-h,3.5rem)+0.75rem)] border-b border-slate-200/60 py-16 last:border-b-0 dark:border-slate-800/60',
          className
        )}
      >
        {children}
      </section>
    </SectionSlugContext.Provider>
  );
}

function DocHeading({
  level,
  children,
  className,
}: {
  level: 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(SectionSlugContext);
  const ref = useRef<HTMLHeadingElement>(null);
  const [headingId, setHeadingId] = useState('');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const text = el.textContent ?? '';
    const base = slugify(text);
    const unique = ctx ? ctx.makeUniqueSlug(base) : base;
    const full = ctx ? `${ctx.sectionId}__${unique}` : unique;
    el.id = full;
    setHeadingId(full);
  }, [children, ctx]);

  const Tag = level === 'h2' ? 'h2' : 'h3';
  const dataLevel = level;

  return (
    <div className="group/doc-heading relative scroll-mt-[calc(var(--docs-header-h,3.5rem)+0.5rem)] pr-10">
      {Tag === 'h2' ? (
        <h2 ref={ref} data-doc-heading={dataLevel} className={className}>
          {children}
        </h2>
      ) : (
        <h3 ref={ref} data-doc-heading={dataLevel} className={className}>
          {children}
        </h3>
      )}
      {headingId ? <DocsHeadingCopy headingId={headingId} /> : null}
    </div>
  );
}

export function DocH2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <DocHeading
      level="h2"
      className={cn(
        'text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[1.75rem] sm:leading-snug',
        className
      )}
    >
      {children}
    </DocHeading>
  );
}

export function DocH3({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <DocHeading
      level="h3"
      className={cn('mt-8 text-lg font-semibold tracking-tight text-slate-900 dark:text-white', className)}
    >
      {children}
    </DocHeading>
  );
}

export function DocH4({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h4 className={cn('mt-6 text-base font-semibold text-slate-800 dark:text-slate-100', className)}>{children}</h4>
  );
}

export function DocP({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('mt-3 text-[15px] leading-[1.7] text-slate-600 dark:text-slate-300', className)}>{children}</p>
  );
}

export function DocUl({ items, className }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul
      className={cn(
        'mt-3 list-disc space-y-2.5 pl-5 text-[15px] leading-[1.7] text-slate-600 marker:text-indigo-500 dark:text-slate-300 dark:marker:text-indigo-400',
        className
      )}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function DocOl({ items, className }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ol
      className={cn(
        'mt-3 list-decimal space-y-2.5 pl-5 text-[15px] leading-[1.7] text-slate-600 marker:font-medium marker:text-indigo-600 dark:text-slate-300 dark:marker:text-indigo-400',
        className
      )}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

const alertStyles = {
  info: 'border-blue-200/90 bg-blue-50/90 text-blue-950 shadow-sm dark:border-blue-900/50 dark:bg-blue-950/35 dark:text-blue-100',
  warning: 'border-amber-200/90 bg-amber-50/90 text-amber-950 shadow-sm dark:border-amber-900/45 dark:bg-amber-950/30 dark:text-amber-100',
  danger: 'border-rose-200/90 bg-rose-50/90 text-rose-950 shadow-sm dark:border-rose-900/45 dark:bg-rose-950/28 dark:text-rose-100',
  success: 'border-emerald-200/90 bg-emerald-50/90 text-emerald-950 shadow-sm dark:border-emerald-900/45 dark:bg-emerald-950/28 dark:text-emerald-100',
  tip: 'border-violet-200/90 bg-violet-50/90 text-violet-950 shadow-sm dark:border-violet-900/45 dark:bg-violet-950/28 dark:text-violet-100',
  important:
    'border-fuchsia-200/90 bg-fuchsia-50/90 text-fuchsia-950 shadow-sm dark:border-fuchsia-900/45 dark:bg-fuchsia-950/28 dark:text-fuchsia-100',
} as const;

const alertIcons = {
  info: Info,
  warning: AlertTriangle,
  danger: ShieldAlert,
  success: CheckCircle2,
  tip: Lightbulb,
  important: OctagonAlert,
} as const;

export function DocAlert({
  variant,
  title,
  children,
  className,
}: {
  variant: keyof typeof alertStyles;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = alertIcons[variant];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'mt-4 flex gap-3 rounded-xl border px-4 py-3.5 text-[14px] leading-relaxed',
        alertStyles[variant],
        className
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 opacity-85" aria-hidden />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? 'mt-1' : ''}>{children}</div>
      </div>
    </motion.div>
  );
}

export function DocCard({
  title,
  children,
  className,
  tone = 'default',
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'muted' | 'accent';
}) {
  const tones = {
    default:
      'border-slate-200/90 bg-white/95 shadow-sm dark:border-slate-800/90 dark:bg-slate-900/50 dark:shadow-none',
    muted: 'border-slate-200/70 bg-slate-50/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/65',
    accent:
      'border-indigo-200/80 bg-indigo-50/90 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/30 dark:shadow-none',
  };
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={cn(
        'rounded-xl border p-4 transition-shadow duration-300 hover:shadow-md dark:hover:shadow-indigo-950/20',
        tones[tone],
        className
      )}
    >
      {title && <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>}
      <div
        className={
          title
            ? 'mt-2 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300'
            : 'text-[14px] leading-relaxed text-slate-600 dark:text-slate-300'
        }
      >
        {children}
      </div>
    </motion.div>
  );
}

export function DocBadge({
  children,
  variant = 'neutral',
}: {
  children: React.ReactNode;
  variant?: 'neutral' | 'hot' | 'warm' | 'cold' | 'success' | 'danger';
}) {
  const v = {
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    hot: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200',
    warm: 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
    cold: 'bg-sky-100 text-sky-900 dark:bg-sky-950/50 dark:text-sky-200',
    success: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200',
    danger: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  };
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', v[variant])}>
      {children}
    </span>
  );
}

export function DocFormula({ children }: { children: React.ReactNode }) {
  return (
    <div className="doc-formula-block mt-3 overflow-x-auto rounded-xl border border-slate-200/90 bg-slate-950 px-4 py-3.5 font-mono text-[13px] leading-relaxed text-slate-100 shadow-inner dark:border-slate-700 dark:bg-slate-950/90">
      {children}
    </div>
  );
}

export function DocTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
      <table className="w-full min-w-[520px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/95 dark:border-slate-800 dark:bg-slate-900/90">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/80 dark:border-slate-800/80 dark:hover:bg-slate-900/50"
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3.5 align-top text-slate-600 dark:text-slate-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocFlow({
  steps,
  className,
}: {
  steps: { label: string; variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary' }[];
  className?: string;
}) {
  const ring = {
    default: 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
    success: 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100',
    warning: 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100',
    danger: 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100',
    primary: 'border-indigo-300 bg-indigo-50 text-indigo-950 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-100',
  };
  return (
    <div className={cn('mt-6 flex flex-col items-stretch gap-0', className)}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.03, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative rounded-xl border px-4 py-3 text-[14px] font-medium leading-snug shadow-sm',
              ring[s.variant ?? 'default']
            )}
          >
            <span className="absolute -left-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
              {i + 1}
            </span>
            <span className="pl-6">{s.label}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-1" aria-hidden>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function DocTimeline({
  items,
}: {
  items: { title: string; body: React.ReactNode }[];
}) {
  return (
    <ol className="relative mt-6 border-l border-slate-200 pl-6 dark:border-slate-700">
      {items.map((it, i) => (
        <li key={i} className="mb-8 last:mb-0">
          <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-indigo-500 dark:border-slate-950" />
          <p className="font-semibold text-slate-900 dark:text-white">{it.title}</p>
          <div className="mt-1 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">{it.body}</div>
        </li>
      ))}
    </ol>
  );
}

export function DocGrid({
  children,
  cols = 2,
  className,
}: {
  children: React.ReactNode;
  cols?: 2 | 3;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mt-4 grid gap-4',
        cols === 2 && 'sm:grid-cols-2',
        cols === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

export function DocAccordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/90 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50/80 dark:text-white dark:hover:bg-slate-800/50"
        aria-expanded={open}
      >
        {title}
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
          >
            <div className="px-4 py-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DocBestPractice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50/95 px-4 py-3 dark:border-emerald-900/40 dark:bg-emerald-950/25">
      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
      <div>
        <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Best practice</p>
        <div className="mt-1 text-[14px] leading-relaxed text-emerald-900/90 dark:text-emerald-100/90">{children}</div>
      </div>
    </div>
  );
}
