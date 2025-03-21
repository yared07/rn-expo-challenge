import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ExerciseDetails from '~/screens/ExerciseDetails';
import './global.css';

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
