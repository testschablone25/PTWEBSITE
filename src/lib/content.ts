import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export type SupportedLocale = 'de' | 'en';

export type MdxDoc = {
  slug: string;
  content: string;
  frontmatter: Record<string, unknown>;
};

function contentRoot() {
  return path.join(process.cwd(), 'content');
}

export async function loadMdxFile(opts: {
  locale: SupportedLocale;
  slug: string;
}): Promise<MdxDoc> {
  const filePath = path.join(contentRoot(), opts.locale, `${opts.slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf8');
  const { content, data } = matter(source);

  return {
    slug: opts.slug,
    content,
    frontmatter: data as Record<string, unknown>,
  };
}

export type BlogPostMeta = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
};

export async function listBlogPosts(locale: SupportedLocale): Promise<BlogPostMeta[]> {
  const dir = path.join(contentRoot(), locale, 'blog');
  const entries = await fs.readdir(dir);

  const posts = await Promise.all(
    entries
      .filter((name) => name.endsWith('.mdx'))
      .map(async (name) => {
        const slug = name.replace(/\.mdx$/, '');
        const filePath = path.join(dir, name);
        const source = await fs.readFile(filePath, 'utf8');
        const { data } = matter(source);

        return {
          slug,
          title: String(data.title ?? slug),
          date: data.date ? String(data.date) : undefined,
          description: data.description ? String(data.description) : undefined,
        };
      })
  );

  posts.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  return posts;
}

export async function loadBlogPost(opts: {
  locale: SupportedLocale;
  slug: string;
}): Promise<MdxDoc> {
  const filePath = path.join(contentRoot(), opts.locale, 'blog', `${opts.slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf8');
  const { content, data } = matter(source);

  return {
    slug: opts.slug,
    content,
    frontmatter: data as Record<string, unknown>,
  };
}
