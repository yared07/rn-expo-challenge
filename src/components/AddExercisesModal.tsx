import React from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  Pressable,
  FlatList,
  Image,
  TextInput,
  PanResponder,
  Animated,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

import { fetchExercises, APIExerciseResponse } from '../services/fetchExercises';
import { Exercise } from '../types/exercise';
import { transformFetchedToLocal } from '~/utlis/transformResponse';

interface AddExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSelected: (exercises: Exercise[]) => void;
  setIsEdit: void;
}

export default function AddExerciseModal({
  visible,
  onClose,
  onAddSelected,
  setIsEdit
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
    return [
        {
          "name": "Squat",
          "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.png",
          "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/143513.gif",
          "equipment": "barbell"
        },
        {
          "name": "Inclined Bench Press",
          "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.png",
          "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/031413.gif",
          "equipment": "barbell"
        },
        {
          "name": "Pull Ups",
          "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.png",
          "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/142913.gif",
          "equipment": "bodyweight"
        },
        {
          "name": "Shoulder Press",
          "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.png",
          "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/040513.gif",
          "equipment": "dumbbell"
        },
        {
          "name": "Curl Biceps",
          "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.png",
          "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/016513.gif",
          "equipment": "cable"
        },
        {
          "name": "Extension Triceps",
          "asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/020013.png",
          "gif_asset_url": "https://jyfpzydnxyelsxofxcnz.supabase.co/storage/v1/object/public/exercise_gifs/1080/020013.gif",
          "equipment": "cable"
        }
      ] as Exercise[];
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
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
      className='rounded-lg'
    >
      <View className="flex-1 bg-white">
        <Animated.View
          style={{ transform: [{ translateY: pan.y }] }}
          {...panResponder.panHandlers}
        >
          {/* Dragging bar (centered) */}
          <View className="items-center py-2">
            <View className="w-12 h-1 rounded-full bg-gray-300 mb-2" />
          </View>

          {/* Title (aligned to the start) */}
          <View className="px-4">
            <Text className="text-lg font-semibold">Add Exercises</Text>
          </View>
        </Animated.View>

        <View className="px-4 mb-2">
          <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-3xl">
            <Ionicons name="search" size={18} color="#999" />
            <TextInput
              placeholder="Search here"
              placeholderTextColor="#999"
              className="flex-1 ml-2 text-base text-gray-800"
              // no onChangeText yet—just for UI
            />
            <Pressable onPress={() => console.log('Filter pressed')}>
              <Ionicons name="filter" size={20} color="#999" />
            </Pressable>
          </View>
        </View>

        <View className="px-4 mb-1">
          <Text className="text-sm text-gray-600">{totalCount} exercises</Text>
        </View>

        <View className="flex-1 px-4">
          {isLoading && (
            <View className="flex-1 justify-center items-center">
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
                    flex-row items-center justify-between
                    rounded-md px-3 py-2 mb-2 
                    border 
                    ${
                      isSelected
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 bg-white'
                    }
                  `}
                >
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: item.asset_url }}
                      className="w-10 h-10 rounded mr-3"
                    />
                    <View>
                      <Text
                        className="text-base font-medium text-gray-800"
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {item.equipment}
                      </Text>
                    </View>
                  </View>

                  <View
                    className={`
                      w-5 h-5 rounded-full border-2
                      flex items-center justify-center
                      ${
                        isSelected
                          ? 'border-yellow-400 bg-yellow-400'
                          : 'border-gray-300 bg-white'
                      }
                    `}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    )}
                  </View>
                </Pressable>
              );
            }}
          />

          {isError && (
            <Text className="text-red-500">
              Failed to load: {error?.message}
            </Text>
          )}
        </View>

        <View className="px-4 pb-4">
          <Pressable
            onPress={handleAdd}
            className="flex-row items-center justify-center bg-yellow-400 py-4 rounded-full"
          >
            <Text className="text-base font-semibold text-gray-900 mr-2">
              Add exercise
            </Text>
            <Ionicons name="add-outline" size={20} color="#000" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}