import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as NavigationService from '@/navigation/NavigationService';
import {Paths} from '@/navigation/paths';

interface StarWarsCharacter {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}

const CharactersListScreen = () => {
  const [starWarsCharacter, setStarWarsCharacters] = useState<
    StarWarsCharacter[] | []
  >([]);
  const [searchResults, setsearchResults] = useState<StarWarsCharacter[] | []>(
    [],
  );
  const [search, setSearch] = useState('');

  const getNameInitials = (name: string) => {
    const nameArray = name.split(' ');
    return nameArray[0][0] + nameArray[nameArray.length - 1][0];
  };

  useEffect(() => {
    const getStarWarsCharacters = async () => {
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();

      setStarWarsCharacters(data.results);
    };

    getStarWarsCharacters();
  });

  useEffect(() => {
    if (search !== '') {
      const searchCharacters = async () => {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${search}`,
        );
        const data = await response.json();

        setsearchResults(data.results);
      };

      searchCharacters();
    }
  }, [search]);

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 16,
        }}
        onChangeText={setSearch}
        value={search}
        placeholder="Buscar personaje de Star Wars"
      />

      <FlatList
        data={searchResults.length > 0 ? searchResults : starWarsCharacter}
        style={{flex: 1}}
        renderItem={({item}) => {
          return (
            <Pressable
              style={styles.itemContainer}
              onPress={() => NavigationService.navigate(Paths.CharacterDetailScreen)}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  marginVertical: 8,
                  marginHorizontal: 16,
                  borderRadius: 10,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View style={styles.avatar}>
                  <Text>{getNameInitials(item.name)}</Text>
                </View>

                <View style={{marginTop: 10}}>
                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                  <Text>fecha de nacimiento: {item.birth_year}</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CharactersListScreen;
