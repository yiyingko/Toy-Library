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
