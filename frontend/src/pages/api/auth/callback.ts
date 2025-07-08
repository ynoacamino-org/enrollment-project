import { DASHBOARD_ROUTE } from '@/modules/dashboard/core/lib/routes';
import { LANDING_ROUTE } from '@/modules/landing/core/lib/routes';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect, url }) => {
  const sessionTokenFromQuery = url.searchParams.get('session_token');

  if (!sessionTokenFromQuery) {
    // No session token in query, redirect to landing page
    return redirect(LANDING_ROUTE.fullPath || '/', 302);
  }

  cookies.set('session_token', sessionTokenFromQuery, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 2, // 2 days
    path: '/',
  });
  // If something went wrong, redirect to an error page or show a message
  return redirect(DASHBOARD_ROUTE.fullPath || '/', 302);
};
