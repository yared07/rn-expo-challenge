import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import exerciseData from '~/data/dummyData';
import ExerciseDetailSection from '~/components/ExerciseDetailSection';
import ExceriseListItem from '~/components/ExceriseListItem';
import AddExerciseModal from '~/components/AddExercisesModal';

const ExerciseDetails: React.FC = () => {
    const [exercises, setExercises] = useState(
        exerciseData.exercises.map((ex, index) => ({ ...ex, order: index }))
    );
    const [prevExercises, setPrevExercises] = useState([]); // Backup state
    const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
       setPrevExercises(exerciseData.exercises.map((ex, index) => ({ ...ex, order: index })))
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
        setExercises(prevExercises => prevExercises.filter(ex => ex.name !== exerciseName));
        if (selectedExercise.name === exerciseName) {
            setSelectedExercise(exercises.length > 1 ? exercises[0] : null);
        }
    };

    return (
        <View className="flex-1 p-5 mt-5">
            <View className="flex-row items-center mb-4">
                <TouchableOpacity className='pr-5' onPress={() => console.log('back clicked')}>
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
                        isActive={isActive}
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
                    <TouchableOpacity onPress={() => setIsEdit(true)} className="m-2 items-center justify-center">
                      <View className="h-24 w-24 items-center justify-center rounded-full bg-white">
                        <Ionicons name="pencil" size={24} color="black" />
                      </View>
                    </TouchableOpacity>
                  )
                }
            />

            <ExerciseDetailSection selectedExercise={selectedExercise} />

            {isEdit && (
                  <View className="absolute bottom-0 left-0 right-0 bg-white m-5 rounded-3xl">
                  <View className="flex-row justify-between items-center p-2 rounded-3xl">
                      <TouchableOpacity className="bg-gray-300 py-3 px-6 rounded-3xl" onPress={discardChanges}>
                          <Text className="text-black text-2xl">Discard</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-[#FFE74C] py-3 px-6 rounded-3xl" onPress={saveChanges}>
                          <Text className="text-black text-2xl">Save Changes</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            )}

            <AddExerciseModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onAddSelected={(newExercises) => {
                    setExercises([...exercises, ...newExercises.map((ex, index) => ({ ...ex, order: exercises.length + index }))]);
                }}
                setIsEdit={setIsEdit}
            />
        </View>
    );
};

export default ExerciseDetails;
