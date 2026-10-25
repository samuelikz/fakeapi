import Link from 'next/link';
import * as I from './Icons';

export default function NotFound() {
  return (
    <article style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ display: 'inline-block', fontSize: 64, color: 'var(--accent)', transform: 'rotate(-8deg)' }}>
        <I.dice />
      </div>
      <h1 style={{ marginTop: 18 }}>Rolou um 404</h1>
      <p className="lead" style={{ margin: '12px auto 0', maxWidth: 440 }}>
        Essa página não existe (nem com seed fixa sorteia outro resultado).
      </p>
      <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn primary">Voltar ao início</Link>
        <Link href="/docs" className="btn ghost">Documentação</Link>
        <Link href="/docs/cheatsheet" className="btn ghost">Cheatsheet</Link>
      </div>
    </article>
  );
}
