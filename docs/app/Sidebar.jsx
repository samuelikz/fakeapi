'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { modules } from '../data/api';
import Search from './SidebarSearch';

export default function Sidebar() {
  const pathname = usePathname();
  const clean = (pathname || '').replace(/\/+$/, '') || '/';
  const active = (href) => clean === href;

  return (
    <nav className="sidebar">
      <Search />
      <h4>Documentação</h4>
      <ul>
        <li><Link href="/docs" className={active('/docs') ? 'active' : ''}>Primeiros passos</Link></li>
        <li><Link href="/docs/createfaker" className={active('/docs/createfaker') ? 'active' : ''}>createFaker</Link></li>
        <li><Link href="/docs/seed" className={active('/docs/seed') ? 'active' : ''}>Seeds e locales</Link></li>
        <li><Link href="/docs/stability" className={active('/docs/stability') ? 'active' : ''}>Estabilidade da saída</Link></li>
        <li><Link href="/docs/examples" className={active('/docs/examples') ? 'active' : ''}>Exemplos práticos</Link></li>
        <li><Link href="/docs/cheatsheet" className={active('/docs/cheatsheet') ? 'active' : ''}>Cheatsheet</Link></li>
      </ul>
      <hr />
      <h4>API: módulos</h4>
      <ul>
        {modules.map((m) => (
          <li key={m.slug}>
            <Link href={`/docs/api/${m.slug}`} className={active(`/docs/api/${m.slug}`) ? 'active' : ''}>
              {m.title}
            </Link>
          </li>
        ))}
      </ul>
      <h4>Núcleo</h4>
      <ul>
        <li><Link href="/docs/api/faker" className={active('/docs/api/faker') ? 'active' : ''}>Faker (instância)</Link></li>
      </ul>
    </nav>
  );
}
