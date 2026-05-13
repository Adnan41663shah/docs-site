import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  GitBranch,
  LayoutGrid,
  Menu,
  Search,
  Shield,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import type { CrmDocsNavGroup } from './crmDocsNav';

type NavIcon = React.ComponentType<{ className?: string }>;

const GROUP_ICONS: Record<string, NavIcon> = {
  overview: BookOpen,
  'inquiry-management': GitBranch,
  presales: Users,
  sales: TrendingUp,
  admin: Shield,
};

interface CrmDocsSidebarProps {
  groups: CrmDocsNavGroup[];
  activeId: string;
  onSelectSection: (id: string) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

function filterGroups(groups: CrmDocsNavGroup[], q: string): CrmDocsNavGroup[] {
  const s = q.trim().toLowerCase();
  if (!s) return groups;
  return groups
    .map((g) => ({
      ...g,
      children: g.children.filter(
        (c) => c.label.toLowerCase().includes(s) || g.label.toLowerCase().includes(s)
      ),
    }))
    .filter((g) => g.children.length > 0);
}

export const CrmDocsSidebar: React.FC<CrmDocsSidebarProps> = ({
  groups,
  activeId,
  onSelectSection,
  mobileOpen,
  onMobileOpenChange,
}) => {
  const [search, setSearch] = useState('');
  const [userOpen, setUserOpen] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => filterGroups(groups, search), [groups, search]);

  const isGroupOpen = (g: CrmDocsNavGroup) =>
    g.children.some((c) => c.id === activeId) || (userOpen[g.id] ?? g.defaultOpen ?? false);

  const toggleGroup = (id: string) => {
    const g = groups.find((x) => x.id === id);
    if (!g || g.children.some((c) => c.id === activeId)) return;
    const cur = userOpen[g.id] ?? g.defaultOpen ?? false;
    setUserOpen((prev) => ({ ...prev, [id]: !cur }));
  };

  const navBody = (
    <nav className="flex flex-col gap-1.5 px-3 py-4" aria-label="Documentation">
      <div className="relative mb-1 px-0.5">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter topics…"
          className="docs-scrollbar w-full rounded-xl border border-slate-200/90 bg-slate-50/90 py-2.5 pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition-shadow placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-500"
        />
      </div>
      {filtered.map((group) => {
        const isOpen = isGroupOpen(group);
        const Icon = GROUP_ICONS[group.id] ?? LayoutGrid;
        return (
          <div
            key={group.id}
            className="overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-900/50"
          >
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-[13px] font-semibold text-slate-900 transition-colors hover:bg-slate-50/90 dark:text-white dark:hover:bg-slate-800/60"
              aria-expanded={isOpen}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="truncate">{group.label}</span>
              </span>
              <ChevronDown
                className={cn('h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden border-t border-slate-100 dark:border-slate-800/80"
                >
                  <ul className="space-y-0.5 p-1.5">
                    {group.children.map((item) => {
                      const active = activeId === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => {
                              onSelectSection(item.id);
                              onMobileOpenChange(false);
                            }}
                            className={cn(
                              'flex w-full items-start rounded-lg px-2.5 py-2 text-left text-[13px] leading-snug transition-all',
                              active
                                ? 'bg-indigo-600 font-medium text-white shadow-md shadow-indigo-600/20 dark:bg-indigo-500 dark:shadow-indigo-500/15'
                                : 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white'
                            )}
                          >
                            <span
                              className={cn(
                                'mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                                active ? 'bg-white' : 'bg-slate-300 dark:bg-slate-600'
                              )}
                              aria-hidden
                            />
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 px-3 py-8 text-center dark:border-slate-700">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No sections match</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Clear the filter or try different keywords.</p>
        </div>
      )}
    </nav>
  );

  return (
    <>
      <div
        className="sticky z-30 flex items-center gap-2 border-b border-slate-200/80 bg-white/90 px-4 py-2.5 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/90"
        style={{ top: 'var(--docs-header-h, 3.5rem)' }}
      >
        <button
          type="button"
          onClick={() => onMobileOpenChange(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30"
        >
          <Menu className="h-4 w-4" aria-hidden />
          Menu
        </button>
      </div>

      <aside className="hidden lg:block lg:w-[272px] lg:shrink-0">
        <div
          className="docs-scrollbar sticky max-h-[calc(100vh-var(--docs-header-h,3.5rem)-1.5rem)] overflow-y-auto rounded-2xl border border-slate-200/70 bg-white/85 shadow-sm shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75 dark:shadow-none"
          style={{ top: 'calc(var(--docs-header-h, 3.5rem) + 0.75rem)' }}
        >
          {navBody}
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
              aria-label="Close menu"
              onClick={() => onMobileOpenChange(false)}
            />
            <motion.aside
              initial={{ x: '-105%' }}
              animate={{ x: 0 }}
              exit={{ x: '-105%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[min(100vw-2.5rem,20rem)] flex-col border-r border-slate-200/90 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Browse topics</span>
                <button
                  type="button"
                  onClick={() => onMobileOpenChange(false)}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="docs-scrollbar min-h-0 flex-1 overflow-y-auto">{navBody}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
