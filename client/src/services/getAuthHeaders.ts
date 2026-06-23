import type { GetTokenSilentlyOptions } from '@auth0/auth0-react';

export async function getAuthHeaders(
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions,
  ) => Promise<string>,
) {
  const token = await getAccessTokenSilently({
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });

  return {
    Authorization: `Bearer ${token}`,
  };
}
