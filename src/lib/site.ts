export function getSiteUrl() {
  // Prefer explicit env in production. Falls back to localhost for dev.
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, '');
  return 'http://localhost:3000';
}
