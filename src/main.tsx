import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { DocsThemeProvider } from './contexts/DocsThemeContext';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocsThemeProvider>
      <App />
    </DocsThemeProvider>
  </StrictMode>
);
