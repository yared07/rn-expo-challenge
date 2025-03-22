import { Image as Image2 } from 'expo-image';
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

interface DetailProps {
  selectedExercise: {
    name: string;
    gif_asset_url: string;
    equipment: string;
  };
}

const ExerciseDetailSection: React.FC<DetailProps> = ({ selectedExercise }) => {
  return (
    <View className="mt-6 items-center bg-white p-5">
      <View className="w-full flex-row items-center justify-between">
        <Text className="mb-2 text-2xl">{selectedExercise.name}</Text>
        <TouchableOpacity className="mb-4 flex-row items-center rounded-3xl bg-[#FFE74C] p-3 px-6">
          <Image source={require('../../assets/images/arrows-right-left.png')} className="mr-2" />
          <Text className="text-xl text-black">Replace</Text>
        </TouchableOpacity>
      </View>
      <View className="relative w-full items-center">
        {' '}
        {/* Added 'relative' for positioning */}
        <Image2
          source={{ uri: selectedExercise.gif_asset_url }}
          style={{
            width: '100%',
            height: 300,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'gray',
          }}
          contentFit="contain"
        />
        {/* Equipment text positioned absolutely */}
        <View className="absolute bottom-2 left-2 flex-row rounded-md  bg-white px-2 py-1">
          <Image source={require('../../assets/images/barbell.png')} className="mr-2" />
          <Text className=" capitalize text-gray-500 ">{selectedExercise.equipment}</Text>
        </View>
      </View>
      <View className="mt-4 w-full flex-row justify-between px-8">
        <TouchableOpacity className="flex-row rounded-3xl border-2 border-black bg-white px-4 py-2">
          <Image source={require('../../assets/images/document.png')} className="mr-2" />
          <Text className="font-semibold text-black">Instructions</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row rounded-3xl border-2 border-black bg-white px-4 py-2">
          <Image source={require('../../assets/images/warm-up.png')} className="mr-2" />
          <Text className="font-semibold text-black">Warm up</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row rounded-3xl border-2 border-black bg-white px-4 py-2">
          <Image source={require('../../assets/images/question-mark.png')} className="mr-2" />
          <Text className="font-semibold text-black">FAQ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciseDetailSection;
