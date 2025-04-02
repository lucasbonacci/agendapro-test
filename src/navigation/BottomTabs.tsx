import { Platform } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CharactersListScreen, SettingsScreen} from '@/screens';
import {Paths} from './paths';
import {SVG} from '@/assets/svg';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'lightgray',
      }}>
      <Tab.Screen
        name={Paths.CharactersListScreen}
        component={CharactersListScreen}
        options={{
          title: 'Personajes',
          tabBarIcon: ({ color }) => <SVG.ListIcon fill={color} />,
          tabBarLabel: () => null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F4C542',
            height: Platform.OS === 'ios' ? 120 : 80
          },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 16,
          },
        }}
      />
      <Tab.Screen
        name={Paths.SettingsScreen}
        component={SettingsScreen}
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <SVG.SettingsIcon fill={color} />,
          tabBarLabel: () => null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#2d3748',
            height: Platform.OS === 'ios' ? 120 : 80
          },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18,
            color: '#FFFFFF',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
