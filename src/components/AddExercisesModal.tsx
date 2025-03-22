import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  Image,
  TextInput,
  PanResponder,
  Animated,
  ActivityIndicator,
} from 'react-native';

import { fetchExercises, APIExerciseResponse } from '../services/fetchExercises';
import { Exercise } from '../types/exercise';

import { transformFetchedToLocal } from '~/utlis/transformResponse';

interface AddExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSelected: (exercises: Exercise[]) => void;
  setIsEdit: (isEdit: boolean) => void;
}

export default function AddExerciseModal({
  visible,
  onClose,
  onAddSelected,
  setIsEdit,
}: AddExerciseModalProps) {
  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
  } = useQuery<APIExerciseResponse[], Error>({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    enabled: visible, // only fetch when modal is open
    staleTime: 1000 * 60 * 10,
  });

  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const pan = React.useRef(new Animated.ValueXY()).current;

  React.useEffect(() => {
    if (!visible) {
      setSelected({});
      pan.setValue({ x: 0, y: 0 }); // Reset the pan value when modal closes
    }
  }, [visible]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const localExercises: Exercise[] = React.useMemo(() => {
    // return exerciseData.exercises;
    if (!fetchedData) return [];
    return fetchedData.map(transformFetchedToLocal);
  }, [fetchedData]);

  const handleAdd = () => {
    const itemsToAdd = localExercises.filter((ex) => selected[ex.id]);
    onAddSelected(itemsToAdd);
    setIsEdit(false);
    onClose();
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  const totalCount = localExercises.length;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <Animated.View
          style={{
            height: '83%',
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            transform: [{ translateY: pan.y }],
          }}
          {...panResponder.panHandlers}>
          <View className="h-5 w-full items-center justify-center">
            <Ionicons name="remove" size={28} color="gray" />
          </View>
          <View className="px-4">
            <Text className="text-lg font-semibold">Add Exercises</Text>
          </View>

          <View className="mb-2 mt-5 flex-row items-center justify-between px-4">
            <View className="flex-row items-center rounded-2xl bg-gray-100 px-3">
              <Ionicons name="search" size={18} color="#999" />
              <TextInput
                placeholder="Search here"
                placeholderTextColor="#999"
                className="ml-2 w-4/5 text-base text-gray-800"
              />
            </View>
            <Pressable onPress={() => console.log('Filter pressed')}>
              <Image source={require('../../assets/images/filter.png')} />
            </Pressable>
          </View>

          <View className="mb-1 px-4">
            <Text className="text-sm text-gray-600">{totalCount} exercises</Text>
          </View>

          <View className="flex-1 px-4">
            {isLoading && (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#999" />
              </View>
            )}
            <FlatList
              data={localExercises}
              keyExtractor={(item) => item.id}
              className="mt-1"
              renderItem={({ item }) => {
                const isSelected = !!selected[item.id];
                return (
                  <Pressable
                    onPress={() => toggleSelect(item.id)}
                    className={`
                    mb-2 flex-row items-center
                    justify-between rounded-md border px-3 
                    py-2 
                    ${isSelected ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}
                  `}>
                    <View className="flex-row items-center">
                      <Image source={{ uri: item.asset_url }} className="mr-3 h-10 w-10 rounded" />
                      <View>
                        <Text className="text-base font-medium text-gray-800" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text className="text-xs text-gray-500">{item.equipment}</Text>
                      </View>
                    </View>

                    <View
                      className={`
                      flex h-5 w-5 items-center
                      justify-center rounded-full border-2
                      ${isSelected ? 'border-yellow-400 bg-yellow-400' : 'border-gray-300 bg-white'}
                    `}>
                      {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
                    </View>
                  </Pressable>
                );
              }}
            />

            {isError && <Text className="text-red-500">Failed to load: {error?.message}</Text>}
          </View>

          <View className="px-4 pb-4">
            <Pressable
              onPress={handleAdd}
              className="flex-row items-center justify-center rounded-full bg-yellow-400 py-4">
              <Text className="mr-2 text-base font-semibold text-gray-900">Add exercise</Text>
              <Ionicons name="add-outline" size={20} color="#000" />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
