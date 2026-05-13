import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type DocsTheme = 'light' | 'dark';

export interface DocsThemeContextType {
  theme: DocsTheme;
  toggleTheme: () => void;
}

const DocsThemeContext = createContext<DocsThemeContextType | undefined>(undefined);

export const DocsThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<DocsTheme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'light';
  });

  const applyThemeToDOM = (t: DocsTheme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;
    if (t === 'dark') {
      root.classList.add('dark');
      body?.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body?.classList.remove('dark');
    }
  };

  useEffect(() => {
    applyThemeToDOM(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('docs-theme-transition');
      window.setTimeout(() => {
        document.documentElement.classList.remove('docs-theme-transition');
      }, 420);
    }
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: DocsThemeContextType = { theme, toggleTheme };

  return <DocsThemeContext.Provider value={value}>{children}</DocsThemeContext.Provider>;
};

/** @see DocsThemeProvider */
// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider for this small app
export function useDocsTheme(): DocsThemeContextType {
  const ctx = useContext(DocsThemeContext);
  if (!ctx) {
    throw new Error('useDocsTheme must be used within DocsThemeProvider');
  }
  return ctx;
}
