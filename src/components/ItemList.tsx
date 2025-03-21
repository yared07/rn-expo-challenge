import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const ItemList = ({ item, setSelectedExercise, selectedExercise }) => {
  const isSelected = selectedExercise.name === item.name;

  return (
    <TouchableOpacity
      onPress={() => setSelectedExercise(item)}
      style={[
        styles.container,
        isSelected && styles.selectedContainer, // Apply yellow border if selected
      ]}
    >
      <Image
        source={{ uri: item.asset_url }}
        style={[styles.image, isSelected && styles.selectedImage]} // Apply yellow border if selected
      />
      {isSelected && (
        <View style={styles.playIconContainer}>
          <Ionicons name="play" size={20} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    position: 'relative',
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#E5E7EB', // Default border color (gray)
  },
  selectedContainer: {
    borderRadius: 48,
    backgroundColor: '#FFD700', // Yellow background for selected item
  },
  selectedImage: {
    borderColor: '#FFD700', // Yellow border for selected item
  },
  playIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFD700', // Yellow background for play icon
    borderRadius: 12,
    padding: 4,
  },
});