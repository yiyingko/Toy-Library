import { getAuthHeaders } from './getAuthHeaders';

export async function getAllToys() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/toys?all=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch toys');
  }
  const data = await response.json();
  return data.toys;
}

// export async function getPaginatedToys(search = '', page = 1, limit = 12) {
//   const response = await fetch(
//     `${import.meta.env.VITE_API_URL}/toys?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch toys');
//   }
//   return response.json();
// }

export async function getPaginatedToys(
  search = '',
  age = '',
  page = 1,
  limit = 12,
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/toys?search=${encodeURIComponent(search)}&age=${encodeURIComponent(age)}&page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch toys');
  }

  return response.json();
}

export async function getToyById(id: number) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/toys/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch toy');
  }
  return response.json();
}

export async function deleteToy(
  getAccessTokenSilently: () => Promise<string>,
  id: number,
) {
  const authHeaders = await getAuthHeaders(getAccessTokenSilently);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/toys/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete toy');
  }

  return response.json();
}

export async function updateToyInformation(
  getAccessTokenSilently: () => Promise<string>,
  {
    id,
    name,
    description,
    age_group,
    tags,
    image_path,
    is_available,
    status,
  }: {
    id: number;
    name: string;
    description: string;
    age_group: string;
    tags: string;
    image_path: string;
    is_available: boolean;
    status: string;
  },
) {
  const authHeaders = await getAuthHeaders(getAccessTokenSilently);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/toys/${id}`, {
    method: 'PATCH',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      age_group,
      tags,
      image_path,
      is_available,
      status,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update toy information');
  }

  return response.json();
}

export async function createNewToy(
  getAccessTokenSilently: () => Promise<string>,
  formData: {
    name: string;
    description: string;
    age_group: string;
    tags: string;
    image_path: string;
  },
) {
  const authHeaders = await getAuthHeaders(getAccessTokenSilently);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/toys`, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit new toy');
  }

  return response.json();
}
