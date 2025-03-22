import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import AddExerciseModal from '~/components/AddExercisesModal';
import ExceriseListItem from '~/components/ExceriseListItem';
import ExerciseDetailSection from '~/components/ExerciseDetailSection';
import exerciseData from '~/data/dummyData';
import { Exercise } from '~/types/exercise';

const ExerciseDetails: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>(
    exerciseData.exercises.map((ex, index) => ({ ...ex, order: index }))
  );
  const [prevExercises, setPrevExercises] = useState<Exercise[]>([]); // Backup state
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPrevExercises(exerciseData.exercises.map((ex, index) => ({ ...ex, order: index })));
  }, []);

  const discardChanges = () => {
    setExercises(prevExercises); // Restore previous state
    setIsEdit(false);
  };

  const saveChanges = () => {
    setPrevExercises(exercises); // Update backup
    setIsEdit(false);
  };

  const removeExercise = (exerciseName: string) => {
    setExercises((prevExercises) => prevExercises.filter((ex) => ex.name !== exerciseName));
    if (selectedExercise.name === exerciseName && exercises.length > 1) {
      setSelectedExercise(exercises[0]);
    }
  };

  return (
    <View className="mt-5 flex-1 p-5">
      <View className="mb-4 flex-row items-center">
        <TouchableOpacity className="pr-5" onPress={() => console.log('back clicked')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">{exerciseData.workout_name}</Text>
      </View>

      <DraggableFlatList
        data={exercises}
        keyExtractor={(item) => item.name}
        onDragEnd={({ data }) => setExercises(data)}
        renderItem={({ item, drag, isActive }) => (
          <ExceriseListItem
            item={item}
            setSelectedExercise={setSelectedExercise}
            selectedExercise={selectedExercise}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            removeExercise={removeExercise}
            drag={drag}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
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
            <TouchableOpacity
              onPress={() => setIsEdit(true)}
              className="m-2 items-center justify-center">
              <View className="h-24 w-24 items-center justify-center rounded-full bg-white">
                <Ionicons name="pencil" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )
        }
      />

      <ExerciseDetailSection selectedExercise={selectedExercise} />

      {isEdit && (
        <View className="absolute bottom-0 left-0 right-0 m-5 rounded-3xl bg-white">
          <View className="flex-row items-center justify-between rounded-3xl p-2">
            <TouchableOpacity
              className="rounded-3xl bg-gray-300 px-6 py-3"
              onPress={discardChanges}>
              <Text className="text-2xl text-black">Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-3xl bg-[#FFE74C] px-6 py-3" onPress={saveChanges}>
              <Text className="text-2xl text-black">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <AddExerciseModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddSelected={(newExercises) => {
          setExercises([
            ...exercises,
            ...newExercises.map((ex, index) => ({ ...ex, order: exercises.length + index })),
          ]);
        }}
        setIsEdit={setIsEdit}
      />
    </View>
  );
};

export default ExerciseDetails;
