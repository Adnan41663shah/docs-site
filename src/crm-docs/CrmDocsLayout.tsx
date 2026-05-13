import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutGrid, Moon, Search, Sun } from 'lucide-react';
import { useDocsTheme } from '@/contexts/DocsThemeContext';
import { getCrmAppOrigin } from '@/config/crmAppOrigin';
import { CRM_DOCS_NAV, findNavMeta, getDocsSearchEntries } from './crmDocsNav';
import { CrmDocsSidebar } from './CrmDocsSidebar';
import { CrmDocsContent } from './CrmDocsContent';
import { DocsBackToTop } from '@/docs-ui/DocsBackToTop';
import { DocsBreadcrumbs, type DocsBreadcrumbItem } from '@/docs-ui/DocsBreadcrumbs';
import { DocsSearchModal } from '@/docs-ui/DocsSearchModal';
import { DocsTableOfContents } from '@/docs-ui/DocsTableOfContents';

const DEFAULT_SECTION = 'docs-welcome';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

const CrmDocsLayout: React.FC = () => {
  const { theme, toggleTheme } = useDocsTheme();
  const [activeId, setActiveId] = useState(DEFAULT_SECTION);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchNonce, setSearchNonce] = useState(0);

  const openSearch = useCallback(() => {
    setSearchNonce((n) => n + 1);
    setSearchOpen(true);
  }, []);

  const searchOpenRef = useRef(searchOpen);

  useEffect(() => {
    searchOpenRef.current = searchOpen;
  }, [searchOpen]);
  const crmOrigin = useMemo(() => getCrmAppOrigin(), []);
  const crmDashboardHref = crmOrigin ? `${crmOrigin}/dashboard` : '/dashboard';

  const searchEntries = useMemo(() => getDocsSearchEntries(), []);
  const orderedSectionIds = useMemo(() => searchEntries.map((e) => e.id), [searchEntries]);
  const idToLabel = useMemo(() => new Map(searchEntries.map((e) => [e.id, e.title] as const)), [searchEntries]);

  const breadcrumb: DocsBreadcrumbItem[] = useMemo(() => {
    if (activeId === 'docs-welcome') {
      return [{ label: 'Overview', sectionId: null, current: true }];
    }
    const meta = findNavMeta(activeId);
    if (!meta) return [{ label: 'Documentation', sectionId: null, current: true }];
    return [
      { label: 'Overview', sectionId: 'docs-welcome', current: false },
      { label: meta.groupLabel, sectionId: null, current: false },
      { label: meta.leafLabel, sectionId: null, current: true },
    ];
  }, [activeId]);

  const handleSelectSection = useCallback((id: string) => {
    setActiveId(id);
    scrollToSection(id);
    if (window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`);
    }
  }, []);

  const handleTocNavigate = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const section = el.closest<HTMLElement>('[data-doc-section]');
      if (section?.id) setActiveId(section.id);
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `#${targetId}`);
      }
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el?.matches('[data-doc-section]')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from URL
      setActiveId(hash);
      requestAnimationFrame(() => scrollToSection(hash));
      return;
    }
    if (el) {
      const section = el.closest<HTMLElement>('[data-doc-section]');
      if (section?.id) {
        setActiveId(section.id);
      }
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-doc-section]'));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.target.id)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-42% 0px -38% 0px',
        threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchOpenRef.current) {
          setSearchOpen(false);
        } else {
          openSearch();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openSearch]);

  return (
    <div
      className="docs-canvas-bg min-h-screen text-slate-900 dark:text-slate-100"
      style={{ ['--docs-header-h' as string]: '3.625rem' }}
    >
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 shadow-sm shadow-slate-200/30 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85 dark:shadow-none">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <a
              href={crmDashboardHref}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100/90 dark:text-white dark:hover:bg-slate-800/80"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/25 dark:bg-indigo-500">
                <LayoutGrid className="h-4 w-4" aria-hidden />
              </span>
              <span className="hidden sm:inline">CloudBlitz CRM</span>
            </a>
            <span className="hidden text-slate-300 sm:inline dark:text-slate-600">/</span>
            <DocsBreadcrumbs
              items={breadcrumb}
              onNavigate={handleSelectSection}
              className="hidden min-w-0 sm:flex"
            />
            <span className="truncate text-xs font-medium text-slate-600 dark:text-slate-300 sm:hidden">
              {breadcrumb.filter((b) => b.current).map((b) => b.label)[0] ?? 'Docs'}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={openSearch}
              className="hidden items-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2 text-left text-sm text-slate-500 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50/40 hover:text-slate-800 sm:flex dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30 dark:hover:text-slate-100"
            >
              <Search className="h-4 w-4 shrink-0" aria-hidden />
              <span className="max-w-[10rem] truncate">Search…</span>
              <kbd className="ml-1 hidden rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-500 lg:inline dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={openSearch}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-600 shadow-sm sm:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 pb-24 pt-2 sm:px-6 lg:pt-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 xl:gap-12">
          <CrmDocsSidebar
            groups={CRM_DOCS_NAV}
            activeId={activeId}
            onSelectSection={handleSelectSection}
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
          />

          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:flex-row xl:gap-10">
            <div className="min-w-0 flex-1 xl:max-w-[760px]">
              <CrmDocsContent
                activeSectionId={activeId}
                orderedSectionIds={orderedSectionIds}
                idToLabel={idToLabel}
                onSelectSection={handleSelectSection}
              />
            </div>

            <aside className="hidden w-[220px] shrink-0 xl:block">
              <div
                className="docs-scrollbar sticky max-h-[calc(100vh-var(--docs-header-h,3.5rem)-2rem)] overflow-y-auto rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-5 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/60"
                style={{ top: 'calc(var(--docs-header-h, 3.5rem) + 1rem)' }}
              >
                <DocsTableOfContents onNavigate={handleTocNavigate} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <DocsSearchModal
        key={searchNonce}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSelectSection}
        entries={searchEntries}
      />
      <DocsBackToTop />
    </div>
  );
};

export default CrmDocsLayout;
