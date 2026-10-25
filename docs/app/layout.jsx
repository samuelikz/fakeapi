import Link from 'next/link';
import Sidebar from './Sidebar';
import ThemeSwitcher from './ThemeSwitcher';
import './globals.css';

export const metadata = {
  title: {
    default: '@samuelikz/fakegen: documentação',
    template: '%s | @samuelikz/fakegen',
  },
  description: 'Gerador de dados de exemplo para JavaScript, sem dependências, determinístico com seed, com locales en e pt_BR.',
};

const DIE = (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="28" height="28" rx="7" fill="url(#fgGrad)" />
    <defs>
      <linearGradient id="fgGrad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--accent)" />
        <stop offset="1" stopColor="var(--accent-dark)" />
      </linearGradient>
    </defs>
    <circle cx="10" cy="10" r="2.6" fill="#fff" />
    <circle cx="22" cy="10" r="2.6" fill="#fff" opacity="0.55" />
    <circle cx="16" cy="16" r="2.6" fill="#fff" />
    <circle cx="10" cy="22" r="2.6" fill="#fff" opacity="0.55" />
    <circle cx="22" cy="22" r="2.6" fill="#fff" />
  </svg>
);

function DieBadge({ size = 32 }) {
  return (
    <span style={{ width: size, height: size, display: 'inline-flex', flexShrink: 0 }}>
      {DIE}
    </span>
  );
}

const GITHUB_SVG = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

// Aplica tema/paleta persistidos antes do primeiro paint para evitar flash. ?theme= / ?accent= na URL permitem testar.
const themeScript = `(function(){var t,a;try{var q=new URLSearchParams(location.search);if(q.get('theme'))t=q.get('theme');if(q.get('accent'))a=q.get('accent');if(!t)t=localStorage.getItem('fg-theme')||'dark';if(!a)a=localStorage.getItem('fg-accent')||'violeta';if(q.get('theme')){localStorage.setItem('fg-theme',t)}if(q.get('accent')){localStorage.setItem('fg-accent',a)}}catch(e){t=t||'dark';a=a||'violeta'}document.documentElement.dataset.theme=t;document.documentElement.dataset.accent=a;})();`;

const FONTS = (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </>
);

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="dark" data-accent="violeta" suppressHydrationWarning>
      <head>
        {FONTS}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <header className="topbar">
          <Link href="/" className="logo">
            <DieBadge />
            fakegen
          </Link>
          <nav className="topbar-nav">
            <Link href="/">Início</Link>
            <Link href="/docs">Documentação</Link>
            <Link href="/docs/api/person">API</Link>
          </nav>
          <span className="version">v0.1.0</span>
          <ThemeSwitcher />
          <a
            className="gh"
            href="https://github.com/samuelikz/fakegen"
            target="_blank"
            rel="noreferrer"
          >
            {GITHUB_SVG}
            GitHub
          </a>
        </header>
        <div className="shell">
          <Sidebar />
          <main className="content">{children}</main>
        </div>
        <footer className="page-footer">
          <span className="logo-mini">
            <DieBadge size={24} />
            fakegen
          </span>
          <span>Todo o conteúdo em português. MIT License.</span>
          <span className="fright">
            Feito com <a href="https://vinext.dev" target="_blank" rel="noreferrer">vinext</a>
          </span>
        </footer>
      </body>
    </html>
  );
}
