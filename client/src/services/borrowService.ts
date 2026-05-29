export async function createBorrowRequest(formData: {
  toy_id: string;
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
