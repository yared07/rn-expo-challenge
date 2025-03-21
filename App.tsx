import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import ExerciseDetails from '~/screens/ExerciseDetails';

export default function App() {
  return (
    <View className="flex-1 bg-gray-100">
      <ExerciseDetails />
      <StatusBar style="light" />
      </View>
  );
}
