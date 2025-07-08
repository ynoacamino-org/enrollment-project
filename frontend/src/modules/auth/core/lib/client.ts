import { BACKEND_URL } from 'astro:env/client';
import type { OAuthProviderName } from '@/modules/auth/core/types/oauthProvider';

export function getLoginURL(provider: OAuthProviderName) {
  return `${BACKEND_URL}/auth/${provider}/login`;
}
export async function getLogoutURL() {
  return `${BACKEND_URL}/auth/logout`;
}
