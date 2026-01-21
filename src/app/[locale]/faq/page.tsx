import { redirect } from '@/i18n/navigation';

export default async function FaqIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: '/faq/physio', locale });
}
