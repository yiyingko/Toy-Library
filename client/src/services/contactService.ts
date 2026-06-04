export async function createContactMessage(formData: {
  name: string;
  email: string;
  message: string;
  subject: string;
}) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact message');
  }

  return response.json();
}

export async function getAllContactMessages() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts`);

  if (!response.ok) {
    throw new Error('Failed to fetch borrow requests');
  }

  return response.json();
}

export async function getMessageById(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/contacts/${id}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch message');
  }
  return response.json();
}

export async function deleteContactMessage(id: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/contacts/${id}`,
    {
      method: 'DELETE',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to delete message');
  }

  return response.json();
}
