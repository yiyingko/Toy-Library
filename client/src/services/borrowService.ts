import { getAuthHeaders } from './getAuthHeaders';

export async function createBorrowRequest(formData: {
  toy_id: number;
  borrower_name: string;
  borrower_email: string;
  message?: string;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/borrow-requests`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to submit borrow request');
  }

  return response.json();
}

export async function getAllBorrowRequests() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/borrow-requests`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch borrow requests');
  }

  return response.json();
}

export async function updateBorrowStatus(
  getAccessTokenSilently: () => Promise<string>,
  {
    id,
    toy_id,
    status,
  }: {
    id: number;
    toy_id: number;
    status: 'approved' | 'rejected' | 'completed';
  },
) {
  const authHeaders = await getAuthHeaders(getAccessTokenSilently);
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/borrow-requests/${id}`,
    {
      method: 'PATCH',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toy_id, status }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to update borrow status');
  }

  return response.json();
}

export async function deleteBorrowRequest(
  getAccessTokenSilently: () => Promise<string>,
  id: number,
) {
  const authHeaders = await getAuthHeaders(getAccessTokenSilently);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/borrow-requests/${id}`,
    {
      method: 'DELETE',
      headers: {
        ...authHeaders,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to delete borrow request');
  }

  return response.json();
}
