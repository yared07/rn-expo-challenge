export interface APIExerciseResponse {
  id: string;
  name: string;
  maleGifUrl?: string;
  femaleGifUrl?: string;
  maleThumbnailUrl?: string;
  femaleThumbnailUrl?: string;
  equipment?: {
    id?: string;
    key?: string;
    name?: string;
  };
}

export async function fetchExercises(): Promise<APIExerciseResponse[]> {
  const response = await fetch('https://api-dev.wpfcoaching.de/workout-planner/exercises?lang=ENG');
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }
  return response.json();
}
