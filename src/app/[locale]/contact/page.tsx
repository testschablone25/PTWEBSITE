import { setRequestLocale } from 'next-intl/server';

import { ContactForm, GoogleMaps } from '@/components';
import { loadMdxFile } from '@/lib/content';
import { RenderMdx } from '@/lib/mdx';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: 'de' | 'en' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const doc = await loadMdxFile({ locale: 'en', slug: 'contact' });

  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-8 py-24">
      <h1 className="text-3xl font-bold tracking-tight leading-tight">{String(doc.frontmatter.title ?? 'Contact')}</h1>
      <p className="mt-8 text-color-foreground-muted leading-relaxed">{String(doc.frontmatter.description ?? '')}</p>
      <div className="mt-16 space-y-12">
        <RenderMdx source={doc.content} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Locations</h2>
        <p className="text-color-foreground-muted mb-8">
          Find me at these locations in Vienna for physiotherapy and personal training sessions.
        </p>
        <GoogleMaps 
          simplifiedStyle={true}
          showControls={false}
          className="mt-8"
        />
      </div>

      <div className="mt-16">
        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
