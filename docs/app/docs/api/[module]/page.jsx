import { notFound } from 'next/navigation';
import { modules, moduleBySlug } from '../../../../data/api';
import examples from '../../../../data/examples.json';
import ApiModule from '../../../ApiModule';

export function generateStaticParams() {
  return modules.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }) {
  const mod = moduleBySlug[(await params).module];
  return { title: mod ? `f.${mod.title}` : 'API' };
}

export default async function Page({ params }) {
  const mod = moduleBySlug[(await params).module];
  if (!mod) notFound();

  const idx = modules.findIndex((m) => m.slug === mod.slug);
  const prev = modules[idx - 1];
  const next = modules[idx + 1];

  return <ApiModule mod={mod} examples={examples} prev={prev} next={next} />;
}
