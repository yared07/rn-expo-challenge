import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Image as Image2 } from 'expo-image';
import React from 'react';

interface DetailProps {
  selectedExercise: {
    name: string;
    gif_asset_url: string;
    equipment: string;
  };
}

const Detail: React.FC<DetailProps> = ({ selectedExercise }) => {
  return (
    <View className="mt-6 items-center bg-white p-5">
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-3xl mb-2">{selectedExercise.name}</Text>
        <TouchableOpacity className="bg-[#FFE74C] p-3 rounded-3xl mb-4 flex-row items-center">
        <Image source={ require('../../assets/images/arrows-right-left.png') } className='mr-2' />
          <Text className="text-black text-3xl">Replace</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full items-center relative"> {/* Added 'relative' for positioning */}
        <Image2
          source={{ uri: selectedExercise.gif_asset_url }}
          style={{ width: '100%', height: 300, borderRadius: 10, borderWidth: 1, borderColor: 'gray' }}
          contentFit="contain"
        />
        {/* Equipment text positioned absolutely */}
        <View className="absolute bottom-2 left-2 bg-white flex-row  rounded-md px-2 py-1">
        <Image source={ require('../../assets/images/barbell.png') } className='mr-2' />
        <Text className=" text-gray-500 capitalize ">
          {selectedExercise.equipment}
        </Text>
        </View>
      </View>
      <View className="flex-row justify-between mt-4 w-full px-8">
        <TouchableOpacity className="bg-white px-4 py-2 rounded-3xl border-black border-2 flex-row">
          <Image source={ require('../../assets/images/document.png') } className='mr-2' />
          <Text className="text-black font-semibold">Instructions</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white px-4 py-2 rounded-3xl border-black border-2 flex-row">
        <Image source={ require('../../assets/images/warm-up.png') } className='mr-2' />
          <Text className="text-black font-semibold">Warm up</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white px-4 py-2 rounded-3xl border-black border-2 flex-row">
          <Image source={ require('../../assets/images/question-mark.png') } className='mr-2' />
          <Text className="text-black font-semibold">FAQ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;