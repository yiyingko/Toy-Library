export async function createContactMessage(formData: {
  name: string;
  email: string;
  message: string;
  subject: string;
}) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
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
