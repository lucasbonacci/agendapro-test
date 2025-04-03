import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {useGlobalContext} from '@/hooks/useGlobalContext';
import {StarWarsCharacter} from '@/types/StarWarsCharacter';
import CharacterItem from './components/CharacterItem';
import SearchInput from './components/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import * as NavigationService from '@/navigation/NavigationService';
import {Paths} from '@/navigation/paths';

const API_URL = 'https://swapi.dev/api/people/';

const CharactersListScreen = () => {
  const [starWarsCharacters, setStarWarsCharacters] = useState<
    StarWarsCharacter[]
  >([]);
  const [searchResults, setSearchResults] = useState<StarWarsCharacter[]>([]);
  const [search, setSearch] = useState('');
  const [nextPage, setNextPage] = useState<string | null>(API_URL);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const {selectCharacter} = useGlobalContext();

  const fetchCharacters = async (url: string, isSearch: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (isSearch) {
        setSearchResults(prev => [...prev, ...data.results]);
      } else {
        setStarWarsCharacters(prev => [...prev, ...data.results]);
      }
      setNextPage(data.next);
    } catch (error) {
      console.error('Error al cargar personajes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (nextPage) {
      fetchCharacters(nextPage);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearch !== '') {
      setSearchResults([]);
      const searchUrl = `${API_URL}?search=${search}`;
      setNextPage(searchUrl);
      fetchCharacters(searchUrl, true);
    } else {
      setSearchResults([]);
      setNextPage(API_URL);
      setStarWarsCharacters([]);
      fetchCharacters(API_URL);
    }
  }, [debouncedSearch]);

  const loadMoreCharacters = () => {
    if (nextPage && !isLoading) {
      fetchCharacters(nextPage, debouncedSearch !== '');
    }
  };

  const handleSelectCharacter = useCallback(
    (character: StarWarsCharacter) => {
      selectCharacter(character);
      NavigationService.navigate(Paths.CharacterDetailScreen);
    },
    [selectCharacter],
  );

  const dataToShow =
    debouncedSearch !== '' ? searchResults : starWarsCharacters;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
      enabled>
      <View style={{flex: 1}}>
        <SearchInput value={search} onChangeText={setSearch} />
        {dataToShow.length === 0 && isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={dataToShow}
            style={{flex: 1}}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({item}) => (
              <CharacterItem
                name={item.name}
                birthYear={item.birth_year}
                handleSelectCharacter={() => handleSelectCharacter(item)}
              />
            )}
            onEndReached={loadMoreCharacters}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoading && dataToShow.length > 0 ? (
                <ActivityIndicator size="large" style={{marginVertical: 20}} />
              ) : null
            }
            removeClippedSubviews={true}
            initialNumToRender={10}
            windowSize={10}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CharactersListScreen;
