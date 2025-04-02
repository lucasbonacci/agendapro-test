import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ApplicationNavigator from './src/navigation/Application';
import { GlobalProvider } from '@/context/GlobalContext';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GlobalProvider>
      <ApplicationNavigator />
      </GlobalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
