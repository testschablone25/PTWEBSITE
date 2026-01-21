type Bucket = {
  hits: number[];
};

const buckets = new Map<string, Bucket>();

export function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const bucket = buckets.get(opts.key) ?? { hits: [] };

  bucket.hits = bucket.hits.filter((t) => now - t < opts.windowMs);

  if (bucket.hits.length >= opts.limit) {
    const oldest = bucket.hits[0];
    const retryAfterMs = opts.windowMs - (now - oldest);
    buckets.set(opts.key, bucket);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  bucket.hits.push(now);
  buckets.set(opts.key, bucket);

  // basic cleanup
  if (buckets.size > 10_000) buckets.clear();

  return { allowed: true };
}
