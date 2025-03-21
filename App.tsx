import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ExerciseDetails from '~/screens/ExerciseDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native';

// Create the QueryClient instance
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-gray-100">
        <GestureHandlerRootView>
          <ExerciseDetails />
          </GestureHandlerRootView>
          <StatusBar style="light" />
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
