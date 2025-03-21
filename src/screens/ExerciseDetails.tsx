import { View, Text, Image, FlatList, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import exerciseData from '~/data/dummyData';
import Detail from '~/components/Detail';
import ItemList from '~/components/ItemList';
import AddExerciseModal from '~/components/AddExercisesModal';

const ExerciseDetails: React.FC = () => {
    const [exercises, setExercises] = useState(exerciseData.exercises);
    const [selectedExercise, setSelectedExercise] = useState(exerciseData.exercises[0]);
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    

  const toggleEditMode = () => {
    setIsEdit(!isEdit);
  };
  const removeExercise = (exerciseName: string) => {
    setExercises(prevExercises => prevExercises.filter(ex => ex.name !== exerciseName));
    if (selectedExercise.name === exerciseName) {
        setSelectedExercise(exercises.length > 1 ? exercises[0] : null);
    }
};
  return (
    <View className="p-5 mt-10">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity className='pr-5' onPress={() => console.log('back clicked')}>
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
              setIsEdit= {setIsEdit} 
              isEdit={isEdit} 
              removeExercise={removeExercise} />
        )}
        ListFooterComponent={
          isEdit ? <TouchableOpacity
                onPress={()=>setShowModal(true)}
                className="m-2 relative rounded-full"
              >
                <Image
                         source={require('../../assets/images/plus.png')}
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                      />
              </TouchableOpacity>:
          <TouchableOpacity onPress={toggleEditMode} className="m-2 justify-center items-center">
            <View className="w-24 h-24 rounded-full bg-white justify-center items-center">
              <Ionicons name= "pencil" size={24} color="black" />
            </View>
          </TouchableOpacity>
        }
        showsHorizontalScrollIndicator={false}
      />
      <Detail selectedExercise={selectedExercise} />

      {isEdit && <View>
         <View className='flex-row justify-between items-center bg-white p-1 m-10 rounded-3xl'>
        <TouchableOpacity className="bg-gray-300 py-3 px-10 rounded-3xl" onPress={toggleEditMode}>
          <Text className="text-black text-3xl">Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#FFE74C] py-3 px-5 rounded-3xl ">
          <Text className="text-black text-3xl">Save Changes</Text>
          </TouchableOpacity>
      </View></View>}

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