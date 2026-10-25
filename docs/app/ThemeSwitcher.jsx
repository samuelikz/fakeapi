'use client';

import { useEffect, useState } from 'react';

import * as I from './Icons';

const THEMES = [
  { id: 'dark', label: 'Escuro' },
  { id: 'light', label: 'Claro' },
];

const PALETTES = [
  { id: 'violeta', color: '#7c5cff' },
  { id: 'rosa', color: '#e93d90' },
  { id: 'oceano', color: '#0e9fd8' },
  { id: 'floresta', color: '#18a06b' },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('violeta');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    const a = document.documentElement.dataset.accent;
    setTheme(t || 'dark');
    setAccent(a || 'violeta');
  }, []);

  const apply = (nextTheme, nextAccent) => {
    const th = nextTheme ?? theme;
    const ac = nextAccent ?? accent;
    document.documentElement.dataset.theme = th;
    document.documentElement.dataset.accent = ac;
    try {
      localStorage.setItem('fg-theme', th);
      localStorage.setItem('fg-accent', ac);
    } catch {}
    setTheme(th);
    setAccent(ac);
  };

  return (
    <div className="theme-ctl">
      <button
        type="button"
        className="theme-btn"
        title={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
        onClick={() => apply(THEMES.find((t) => t.id !== theme).id)}
      >
        {theme === 'dark' ? <I.sun /> : <I.moon />}
      </button>
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          className="pal-btn"
          title="Trocar paleta de cores"
          onClick={() => setOpen((o) => !o)}
        >
          <i style={{ background: PALETTES.find((p) => p.id === accent).color }} />
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ fill: 'currentColor', opacity: 0.7 }}>
            <path d="M0 2 L10 2 L5 8 Z" />
          </svg>
        </button>
        {open && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              display: 'grid',
              gap: 2,
              padding: 6,
              minWidth: 150,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              boxShadow: 'var(--shadow-md)',
              zIndex: 200,
            }}
          >
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  apply(null, p.id);
                  setOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '7px 10px',
                  border: 'none',
                  background: accent === p.id ? 'var(--accent-soft)' : 'transparent',
                  color: accent === p.id ? 'var(--accent)' : 'var(--text)',
                  borderRadius: 7,
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: 13.5,
                  textAlign: 'left',
                }}
              >
                <i style={{ background: p.color, width: 13, height: 13, borderRadius: '50%', display: 'block' }} />
                {p.id.charAt(0).toUpperCase() + p.id.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
