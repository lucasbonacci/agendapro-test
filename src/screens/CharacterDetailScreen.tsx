import React from 'react';
import {Text, View} from 'react-native';
import {useGlobalContext} from '@/hooks/useGlobalContext';

const CharacterDetailScreen = () => {
  const {character} = useGlobalContext();
  
  return (
    <View style={{flex: 1}}>
      <Text>{character?.name}</Text>
    </View>
  );
};

export default CharacterDetailScreen;
