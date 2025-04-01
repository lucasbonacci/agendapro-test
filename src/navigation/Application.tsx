import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import BottomTabs from './BottomTabs';
import {navigationRef} from './NavigationService';
import {Paths} from './paths';
import {CharacterDetailScreen} from '@/screens';

import {RootStackParamList} from './types';
const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false, gestureEnabled: true}}>
          <Stack.Screen name={Paths.BottomTabs} component={BottomTabs} />
          <Stack.Screen
            name={Paths.CharacterDetailScreen}
            options={() => ({
              headerShown: true,
              title: 'Character',
              headerTitleAlign: 'center',
            })}
            component={CharacterDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
