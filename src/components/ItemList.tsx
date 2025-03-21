import { View, TouchableOpacity, Image } from 'react-native';

import { Exercise } from '~/types/exercise';
interface ItemListProps {
  item: Exercise;
  setSelectedExercise: React.Dispatch<React.SetStateAction<Exercise>>;
  selectedExercise: { name: string; asset_url: string; equipment: string };
  setIsEdit: (isEdit: boolean) => void;
  isEdit: boolean;
  removeExercise: (name: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  item,
  setSelectedExercise,
  selectedExercise,
  setIsEdit,
  isEdit,
  removeExercise,
}) => {
  const isSelected = selectedExercise.name === item.name;

  return (
    <TouchableOpacity
      onPress={() => setSelectedExercise(item)}
      className={`relative m-2 ${isSelected && !isEdit ? 'rounded-full bg-yellow-400' : ''}`}
      onLongPress={() => setIsEdit(true)}>
      <Image
        source={{ uri: item.asset_url }}
        className={`h-24 w-24 rounded-full border-2 ${isSelected && !isEdit ? 'border-yellow-400' : 'border-gray-300'}`}
      />
      {/* Show remove icon when in edit mode */}
      {isEdit && (
        <TouchableOpacity
          onPress={() => removeExercise(item.name)}
          className="absolute right-0 top-0 rounded-full p-1">
          <Image source={require('../../assets/images/remove-circle.png')} className="h-7 w-7" />
        </TouchableOpacity>
      )}
      {/* Hide other icons when isEdit is true */}
      {!isEdit && (
        <>
          {item.equipment === 'barbell' && !isSelected && (
            <View className="absolute bottom-0 right-0 rounded-full bg-black">
              <Image source={require('../../assets/images/tick.png')} className="h-7 w-7" />
            </View>
          )}
          {isSelected && (
            <View className="absolute bottom-0 right-0 rounded-full p-1">
              <Image source={require('../../assets/images/check-circle.png')} className="h-7 w-7" />
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default ItemList;
