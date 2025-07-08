import type { OAuthProvidersName } from '@/modules/auth/core/lib/oauthProvider';

export type OAuthProviderName =
  (typeof OAuthProvidersName)[keyof typeof OAuthProvidersName];

export type OAuthProvider = {
  id: string;
  name: OAuthProviderName;
};
