import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the minus icon

const ItemList = ({ item, setSelectedExercise, selectedExercise, setIsEdit,isEdit }) => {
  const isSelected = selectedExercise.name === item.name;

  return (
    <TouchableOpacity
      onPress={() => setSelectedExercise(item)}
      className={`m-2 relative ${(isSelected && !isEdit) ? 'bg-yellow-400 rounded-full' : ''}`}
      onLongPress={()=>setIsEdit(true)}
    >
      <Image
        source={{ uri: item.asset_url }}
        className={`w-24 h-24 rounded-full border-2 ${(isSelected && !isEdit)? 'border-yellow-400' : 'border-gray-300'}`}
      />
      {/* Show the minus icon when isEdit is true */}
      {isEdit && (
        <View className="absolute top-0 right-0 rounded-full p-1">
           <Image source={require('../../assets/images/remove-circle.png')} className="w-7 h-7" />
        </View>
      )}
      {/* Hide other icons when isEdit is true */}
      {!isEdit && (
        <>
          {(item.equipment == 'barbell' && !isSelected) && (
            <View className="absolute bottom-0 right-0 rounded-full bg-black">
              <Image source={require('../../assets/images/tick.png')} className="w-7 h-7" />
            </View>
          )}
          {isSelected && (
            <View className="absolute bottom-0 right-0 rounded-full p-1">
              <Image source={require('../../assets/images/check-circle.png')} className="w-7 h-7" />
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default ItemList;