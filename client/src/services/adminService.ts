import type { DashboardSummary } from '../types/dashboard';

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admin/dashboard-summary`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard summary');
  }

  return response.json();
}
