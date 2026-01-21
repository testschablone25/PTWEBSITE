import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getSiteUrl } from '@/lib/site';
import { listBlogPosts } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticPaths = [
    '',
    '/physio',
    '/personal-training',
    '/about',
    '/preise',
    '/prices',
    '/faq',
    '/faq/physio',
    '/faq/personal-training',
    '/kontakt',
    '/contact',
    '/reviews',
    '/therapie-pfad',
    '/therapy-path',
    '/blog',
    '/impressum',
    '/datenschutz',
    '/privacy',
    '/terms',
  ];

  const blogSlugsByLocale = await Promise.all(
    routing.locales.map(async (locale) => {
      const posts = await listBlogPosts(locale as 'de' | 'en');
      return { locale, slugs: posts.map((p) => p.slug) };
    })
  );

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      const url = `${siteUrl}/${locale}${p}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: p === '' ? 1 : 0.6,
      });
    }

    const blog = blogSlugsByLocale.find((x) => x.locale === locale);
    for (const slug of blog?.slugs ?? []) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
