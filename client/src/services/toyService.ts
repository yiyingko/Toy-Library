export async function getAllToys() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/toys`);
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

export async function deleteToy(id: number) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/toys/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete toy');
  }

  return response.json();
}

export async function updateToyInformation({
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
}) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/toys/${id}`, {
    method: 'PATCH',
    headers: {
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
