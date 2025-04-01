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
        options={{title: 'Characters', tabBarIcon: () => <SVG.ListIcon />}}
      />
      <Tab.Screen
        name={Paths.SettingsScreen}
        component={SettingsScreen}
        options={{title: 'Setting', tabBarIcon: () => <SVG.SettingsIcon />}}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
