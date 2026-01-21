export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/@',
  youtube: 'https://youtube.com/@',
  facebook: 'https://facebook.com/',
  linkedin: 'https://linkedin.com/in/',
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;

export function getSocialUrl(platform: SocialPlatform, username: string): string {
  return `${SOCIAL_LINKS[platform]}${username}`;
}

// Default usernames (should be configured via environment variables)
export const SOCIAL_USERNAMES = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || 'pttherapy',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_USERNAME || 'pttherapy',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_USERNAME || 'pttherapy',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_USERNAME || 'pttherapy',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME || 'pttherapy',
} as const;

// Generate full URLs for each platform
export const SOCIAL_URLS = Object.fromEntries(
  Object.entries(SOCIAL_USERNAMES).map(([platform, username]) => [
    platform,
    getSocialUrl(platform as SocialPlatform, username),
  ])
) as Record<SocialPlatform, string>;