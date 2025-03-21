import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import AddExerciseModal from '~/components/AddExercisesModal';
import Detail from '~/components/Detail';
import ItemList from '~/components/ItemList';
import exerciseData from '~/data/dummyData';

const ExerciseDetails: React.FC = () => {
  const [exercises, setExercises] = useState(exerciseData.exercises);
  const [selectedExercise, setSelectedExercise] = useState(exerciseData.exercises[0]);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleEditMode = () => {
    setIsEdit(!isEdit);
  };
  const removeExercise = (exerciseName: string) => {
    setExercises((prevExercises) => prevExercises.filter((ex) => ex.name !== exerciseName));
    if (selectedExercise.name === exerciseName && exercises.length > 1) {
      setSelectedExercise(exercises[0]);
    }
  };
  return (
    <View className="mt-10 p-5">
      <View className="mb-4 flex-row items-center">
        <TouchableOpacity className="pr-5" onPress={() => console.log('back clicked')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">{exerciseData.workout_name}</Text>
      </View>
      <FlatList
        data={exercises}
        horizontal
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <ItemList
            item={item}
            setSelectedExercise={setSelectedExercise}
            selectedExercise={selectedExercise}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            removeExercise={removeExercise}
          />
        )}
        ListFooterComponent={
          isEdit ? (
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              className="relative m-2 rounded-full">
              <Image
                source={require('../../assets/images/plus.png')}
                className="h-24 w-24 rounded-full border-2 border-gray-300"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleEditMode} className="m-2 items-center justify-center">
              <View className="h-24 w-24 items-center justify-center rounded-full bg-white">
                <Ionicons name="pencil" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )
        }
        showsHorizontalScrollIndicator={false}
      />
      <Detail selectedExercise={selectedExercise} />

      {isEdit && (
        <View>
          <View className="m-10 flex-row items-center justify-between rounded-3xl bg-white p-1">
            <TouchableOpacity
              className="rounded-3xl bg-gray-300 px-10 py-3"
              onPress={toggleEditMode}>
              <Text className="text-3xl text-black">Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-3xl bg-[#FFE74C] px-5 py-3 ">
              <Text className="text-3xl text-black">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <AddExerciseModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddSelected={(newExercises) => {
          // Merge them into your workout or edit-mode list
        }}
        setIsEdit={setIsEdit}
      />
    </View>
  );
};

export default ExerciseDetails;
