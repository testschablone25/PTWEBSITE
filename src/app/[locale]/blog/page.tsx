import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { listBlogPosts } from '@/lib/content';

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: 'de' | 'en' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await listBlogPosts(locale);

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8 py-24">
      <h1 className="text-3xl font-bold tracking-tight leading-tight">Blog</h1>
      <div className="mt-16 space-y-8">
        {posts.map((p) => (
          <article key={p.slug} className="border border-color-border p-8 hover:border-color-accent hover:bg-color-accent-highlight transition-colors rounded-none">
            <h2 className="text-xl font-semibold tracking-tight leading-tight">
              <Link href={`/blog/${p.slug}`} className="hover:text-color-accent link-underline outline-none">
                {p.title}
              </Link>
            </h2>
            {p.description ? (
              <p className="mt-4 text-color-foreground-muted leading-relaxed">{p.description}</p>
            ) : null}
            {p.date ? (
              <p className="mt-4 text-sm text-color-foreground-muted uppercase tracking-wider">{p.date}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
