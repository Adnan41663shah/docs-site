import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Link2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export function DocsHeadingCopy({ headingId }: { headingId: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${headingId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [headingId]);

  return (
    <div className="pointer-events-none absolute -right-1 top-1/2 z-10 flex -translate-y-1/2 items-center sm:pointer-events-auto">
      <button
        type="button"
        onClick={copy}
        className={cn(
          'pointer-events-auto rounded-md border border-transparent p-1.5 text-slate-400 opacity-0 shadow-none transition-all hover:border-slate-200 hover:bg-white/90 hover:text-indigo-600 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 group-hover/doc-heading:opacity-100 dark:hover:border-slate-700 dark:hover:bg-slate-900/90 dark:hover:text-indigo-400',
          copied && 'opacity-100'
        )}
        aria-label={copied ? 'Link copied' : 'Copy link to heading'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block text-emerald-600 dark:text-emerald-400"
            >
              <Check className="h-3.5 w-3.5" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="link"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              <Link2 className="h-3.5 w-3.5" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
