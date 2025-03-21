import { Exercise } from '../types/exercise';
import { APIExerciseResponse } from '../services/fetchExercises';

export function transformFetchedToLocal(item: APIExerciseResponse): Exercise {
  const animation = item.maleGifUrl || item.femaleGifUrl || '';
  const thumbnail = item.maleThumbnailUrl || item.femaleThumbnailUrl || '';

  // The API returns an object for equipment, so pick name or key
  const equipmentName = item.equipment?.name || item.equipment?.key || 'Unknown';

  return {
    id: item.id,
    name: item.name,
    equipment: equipmentName,
    asset_url: thumbnail,
    gif_asset_url: animation,
    completed: false,
  };
}
