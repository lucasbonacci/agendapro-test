import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ApplicationNavigator from './src/navigation/Application';
import {GlobalProvider} from '@/context/GlobalContext';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <ApplicationNavigator />
        </GlobalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
