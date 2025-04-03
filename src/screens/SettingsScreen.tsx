import { Text, View } from 'react-native';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

const SettingsScreen = () => {
  const { battery, model, os, identifier, isLoading } = useDeviceInfo();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Battery: {battery}%</Text>
      <Text>Model: {model}</Text>
      <Text>OS: {os}</Text>
      {identifier !== 'Unavailable' && <Text>Identifier: {identifier}</Text>}
    </View>
  );
};


export default SettingsScreen;