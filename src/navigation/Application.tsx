import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import BottomTabs from './BottomTabs';
import {navigationRef} from './NavigationService';
import {Paths} from './paths';
import {CharacterDetailScreen} from '@/screens';
import {SVG} from '@/assets/svg';

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
              headerBackTitleVisible: false,
              headerBackImage: () => (
                <View style={{marginLeft: 10}}>
                  <SVG.ArrowLeftIcon />
                </View>
              ),
              headerStyle: {
                backgroundColor: '#F4C542',
                height: 120,
              },
              headerTitleStyle: {
                fontWeight: '400',
                fontSize: 16,
              },
            })}
            component={CharacterDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
