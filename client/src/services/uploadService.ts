import { getAuthHeaders } from './getAuthHeaders';

export async function uploadImage(
  getAccessTokenSilently: () => Promise<string>,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const headers = await getAuthHeaders(getAccessTokenSilently);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/uploads`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  const data = await response.json();

  console.log('upload response:', data);

  return data.imageUrl;
}
