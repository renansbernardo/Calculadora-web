import { useEffect, useState } from 'react';
import './App.css';
import { Calculator } from './components/Calculator/Calculator';
import { SoundProvider, useSound } from './context/SoundContext';

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
  const { soundOn, setSoundOn } = useSound();

  return (
    <div className="app-container">
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, display: 'flex', gap: 8 }}>
        <button
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <span role="img" aria-label="Tema escuro">🌙</span> : <span role="img" aria-label="Tema claro">☀️</span>}
        </button>
        <button
          aria-label={soundOn ? 'Desativar som' : 'Ativar som'}
          onClick={() => setSoundOn(!soundOn)}
        >
          {soundOn ? <span role="img" aria-label="Som ligado">🔊</span> : <span role="img" aria-label="Som desligado">🔇</span>}
        </button>
      </div>
      <Calculator />
    </div>
  );
}

declare global {
  interface Window {
  }
}

export default App;
