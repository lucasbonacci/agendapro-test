import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CharactersListScreen, SettingsScreen} from '@/screens';
import {Paths} from './paths';

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
        options={{title: 'Characters'}}
      />
      <Tab.Screen
        name={Paths.SettingsScreen}
        component={SettingsScreen}
        options={{title: 'Setting'}}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
