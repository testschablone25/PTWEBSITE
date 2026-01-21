import { setRequestLocale } from 'next-intl/server';

import { loadMdxFile } from '@/lib/content';
import { RenderMdx } from '@/lib/mdx';

export default async function TherapiePfadPage({
  params,
}: {
  params: Promise<{ locale: 'de' | 'en' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const doc = await loadMdxFile({ locale: 'de', slug: 'therapie-pfad' });

  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-8 py-24">
      <h1 className="text-3xl font-bold tracking-tight leading-tight">{String(doc.frontmatter.title ?? 'Pfad zur Therapie')}</h1>
      <p className="mt-8 text-color-foreground-muted leading-relaxed">{String(doc.frontmatter.description ?? '')}</p>
      <div className="mt-16 space-y-12">
        <RenderMdx source={doc.content} />
      </div>
    </div>
  );
}
