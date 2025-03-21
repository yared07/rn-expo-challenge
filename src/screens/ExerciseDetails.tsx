import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import exerciseData from '~/data/dummyData';
import Detail from '~/components/Detail';
import ItemList from '~/components/ItemList';


const ExerciseDetails: React.FC = () => {
    const [selectedExercise, setSelectedExercise] = useState(exerciseData.exercises[0]);
  return (
    <View className="p-5 mt-10">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity className='pr-5' onPress={() => console.log('back clicked')}>
          <Ionicons name="arrow-back" size={24} color="black" /> 
        </TouchableOpacity>
        <Text className="text-2xl font-bold">{exerciseData.workout_name}</Text>
      </View>
      <FlatList
        data={exerciseData.exercises}
        horizontal
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
         <ItemList item={item} setSelectedExercise={setSelectedExercise} />
        )}
        showsHorizontalScrollIndicator={false}
      />
      <Detail selectedExercise={selectedExercise} />
    </View>
  );
};

export default ExerciseDetails;
