import nodemailer from 'nodemailer';

export type ContactEmailPayload = {
  kind: 'physio' | 'pt';
  name: string;
  email: string;
  message: string;
  hasPrescription: boolean;
  preferredSlots: string[];
  locale: 'de' | 'en';
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const host = requireEnv('SMTP_HOST');
    const port = Number(requireEnv('SMTP_PORT'));
    const user = requireEnv('SMTP_USER');
    const pass = requireEnv('SMTP_PASS');

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return transporter;
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendContactEmails(payload: ContactEmailPayload) {
  const adminEmail = requireEnv('CONTACT_TO_EMAIL');
  const fromEmail = requireEnv('MAIL_FROM');

  const slots = payload.preferredSlots.length ? payload.preferredSlots.join(', ') : '-';

  const adminSubject = `[Kontakt] ${payload.kind.toUpperCase()} – ${payload.name}`;

  const adminHtml = `
    <h2>Neue Anfrage</h2>
    <p><strong>Art:</strong> ${escapeHtml(payload.kind.toUpperCase())}</p>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Verordnung vorhanden:</strong> ${payload.hasPrescription ? 'Ja' : 'Nein'}</p>
    <p><strong>Bevorzugte Slots (10–18, 1h):</strong> ${escapeHtml(slots)}</p>
    <hr />
    <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
  `;

  const adminText = `Neue Anfrage\n\nArt: ${payload.kind.toUpperCase()}\nName: ${payload.name}\nEmail: ${payload.email}\nVerordnung: ${payload.hasPrescription ? 'Ja' : 'Nein'}\nSlots: ${slots}\n\n${payload.message}`;

  const autoReplySubject = payload.locale === 'de'
    ? 'Vielen Dank für deine Nachricht'
    : 'Thanks for your message';

  const autoReplyText = payload.locale === 'de'
    ? `Hallo ${payload.name},\n\nvielen Dank für deine Nachricht. Ich melde mich zeitnah mit Terminvorschlägen.\n\nZur Übersicht: Du hast ${payload.kind === 'physio' ? 'Physiotherapie' : 'Personal Training'} gewählt.\nBevorzugte Slots: ${slots}\n\nBeste Grüße\nJakob`
    : `Hi ${payload.name},\n\nThanks for reaching out. I’ll get back to you shortly with appointment options.\n\nSummary: You selected ${payload.kind === 'physio' ? 'Physiotherapy' : 'Personal Training'}.\nPreferred slots: ${slots}\n\nBest\nJakob`;

  const t = getTransporter();

  // Admin email
  await t.sendMail({
    from: fromEmail,
    to: adminEmail,
    replyTo: payload.email,
    subject: adminSubject,
    text: adminText,
    html: adminHtml,
  });

  // Auto-reply
  await t.sendMail({
    from: fromEmail,
    to: payload.email,
    subject: autoReplySubject,
    text: autoReplyText,
  });
}
