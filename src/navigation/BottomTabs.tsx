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
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name={Paths.CharactersListScreen}
        component={CharactersListScreen}
        options={{
          title: 'Personajes',
          tabBarIcon: () => <SVG.ListIcon />,
          tabBarLabel: () => null,
          headerStyle: {
            backgroundColor: '#F4C542',
            height: 120,
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
          tabBarIcon: () => <SVG.SettingsIcon />,
          tabBarLabel: () => null,
          headerStyle: {
            backgroundColor: '#2d3748',
            height: 120,
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
