'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { modules } from '../data/api';

const ALL = modules.flatMap((m) =>
  m.methods.map((mm) => ({ module: m.slug, method: mm.name, title: m.title })),
);

export default function Search() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const box = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => input.current?.focus(), 30);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return ALL.slice(0, 8);
    return ALL.filter((r) => r.method.toLowerCase().includes(t) || r.title.toLowerCase().includes(t)).slice(0, 12);
  }, [q]);

  return (
    <div className="search-wrap">
      <button type="button" className="search-btn" onClick={() => { setOpen(true); setTimeout(() => input.current?.focus(), 30); }}>
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' }}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4.3-4.3" />
        </svg>
        Buscar
        <kbd>Ctrl K</kbd>
      </button>
      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <input
              ref={input}
              value={q}
              placeholder="Buscar método ou módulo..."
              onChange={(e) => setQ(e.target.value)}
              autoFocus
            />
            <ul>
              {results.map((r) => (
                <li key={r.module + r.method}>
                  <Link href={`/docs/api/${r.module}#${r.method}`} onClick={() => { setOpen(false); setQ(''); }}>
                    <b>{r.title}</b>
                    <span>{r.method}</span>
                  </Link>
                </li>
              ))}
              {results.length === 0 && <li className="empty">Nada encontrado para "{q}"</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
