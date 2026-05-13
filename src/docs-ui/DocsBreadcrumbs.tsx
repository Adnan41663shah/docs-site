import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface DocsBreadcrumbItem {
  label: string;
  sectionId?: string | null;
  current?: boolean;
}

interface DocsBreadcrumbsProps {
  items: DocsBreadcrumbItem[];
  onNavigate?: (sectionId: string) => void;
  className?: string;
}

export function DocsBreadcrumbs({ items, onNavigate, className }: DocsBreadcrumbsProps) {
  return (
    <nav className={cn('flex min-w-0 items-center gap-1 text-xs text-slate-500 sm:text-sm', className)} aria-label="Breadcrumb">
      {items.map((crumb, i) => (
        <React.Fragment key={`${crumb.label}-${i}`}>
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />}
          {crumb.sectionId && onNavigate ? (
            <button
              type="button"
              onClick={() => onNavigate(crumb.sectionId!)}
              className="truncate rounded px-1 py-0.5 text-left hover:bg-slate-100 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              {crumb.label}
            </button>
          ) : (
            <span
              className={
                crumb.current
                  ? 'truncate rounded px-1 py-0.5 font-medium text-slate-800 dark:text-slate-100'
                  : 'truncate px-1 py-0.5'
              }
            >
              {crumb.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
