import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { loadBlogPost, listBlogPosts } from '@/lib/content';
import { RenderMdx } from '@/lib/mdx';

const LOCALES = ['de', 'en'] as const;
type Locale = (typeof LOCALES)[number];

export async function generateStaticParams() {
  const all = await Promise.all(
    LOCALES.map(async (locale) => {
      const posts = await listBlogPosts(locale);
      return posts.map((p) => ({ locale, slug: p.slug }));
    })
  );

  return all.flat();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;

  const locale: Locale = (LOCALES as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : (notFound(), 'de');

  setRequestLocale(locale);

  const post = await loadBlogPost({ locale, slug }).catch(() => null);
  if (!post) {
    notFound();
  }

  const title = String(post.frontmatter.title ?? slug);
  const date = post.frontmatter.date ? String(post.frontmatter.date) : undefined;

  return (
    <article className="mx-auto max-w-3xl px-6 sm:px-8 py-24">
      <h1 className="text-3xl font-bold tracking-tight leading-tight">{title}</h1>
      {date ? <p className="mt-4 text-sm text-color-foreground-muted uppercase tracking-wider">{date}</p> : null}
      <div className="mt-16 space-y-12">
        <RenderMdx source={post.content} />
      </div>
    </article>
  );
}
