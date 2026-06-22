import type { DashboardSummary } from '../types/dashboard';
import { getAuthHeaders } from './getAuthHeaders';

export async function getDashboardSummary(
  getAccessTokenSilently: () => Promise<string>,
): Promise<DashboardSummary> {
  const headers = await getAuthHeaders(getAccessTokenSilently);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admin/dashboard-summary`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard summary');
  }

  return response.json();
}
