import { NextResponse } from 'next/server';
import { z } from 'zod';

import { rateLimit } from '@/lib/rateLimit';
import { sendContactEmails } from '@/lib/email';

export const runtime = 'nodejs';

const BodySchema = z.object({
  kind: z.enum(['physio', 'pt']),
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
  hasPrescription: z.boolean(),
  preferredSlots: z.array(z.string()).max(8),
  locale: z.enum(['de', 'en']),
  // honeypot: if filled, treat as bot
  website: z.string().optional(),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rl = rateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 60_000 });

  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests', retryAfterSeconds: rl.retryAfterSeconds },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds ?? 60) } }
    );
  }

  const raw = await request.json().catch(() => null);
  const parsed = BodySchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  // Honeypot: respond ok but do nothing
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  await sendContactEmails(parsed.data);

  return NextResponse.json({ ok: true }, { status: 200 });
}
