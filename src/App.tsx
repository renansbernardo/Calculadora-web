import { useEffect, useState } from 'react';
import './App.css';
import { Calculator } from './components/Calculator/Calculator';

// Hook para tema escuro moderno (CSS custom properties + prefers-color-scheme)
function useSystemTheme() {
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || saved === 'light' ? saved : getSystemTheme();
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return [theme, setTheme] as const;
}

function App() {
  const [theme, setTheme] = useSystemTheme();
  return (
    <div className="app-container">
      <button
        aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <Calculator />
    </div>
  );
}

export default App;
