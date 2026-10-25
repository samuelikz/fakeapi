'use client';

import { useState } from 'react';

const ICON_COPY = (
  <svg viewBox="0 0 24 24">
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);
const ICON_CHECK = (
  <svg viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// Realça comentários e palavras-chave de forma simples (suficiente para os exemplos).
function highlight(code) {
  return code
    .split('\n')
    .map((line) => {
      if (line.trim().startsWith('//')) return `<span class="cm">${line}</span>`;
      return line.replace(
        /(\/\/.*)$|('\S*?'|"\S*?"|\b(?:const|let|return|new|class|function|require)\b)/g,
        (m, cm, kw) => (cm ? `<span class="cm">${cm}</span>` : `<span class="kw">${kw}</span>`),
      );
    })
    .join('\n');
}

export default function Code({ children, lang = 'js', bare = false }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(String(children)).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => {},
    );
  };

  const body = (
    <pre
      className="code"
      dangerouslySetInnerHTML={{ __html: highlight(String(children)) }}
    />
  );

  if (bare) return <div className="codeblock">{body}</div>;

  return (
    <div className="codeblock">
      <div className="bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="lang">{lang}</span>
        <button type="button" className="copy" onClick={copy}>
          {copied ? ICON_CHECK : ICON_COPY}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      {body}
    </div>
  );
}
