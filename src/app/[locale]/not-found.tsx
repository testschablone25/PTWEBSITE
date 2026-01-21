import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-8 py-24">
      <h1 className="text-2xl font-semibold tracking-tight leading-tight">Not found</h1>
      <p className="mt-8 text-color-foreground-muted leading-relaxed">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-color-foreground hover:text-color-accent link-underline outline-none font-medium"
      >
        Go back home
      </Link>
    </div>
  );
}
