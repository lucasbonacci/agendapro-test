import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StarWarsCharacter} from '@/types/StarWarsCharacter';
import CharacterItem from './components/CharacterItem';
import SearchInput from './components/SearchInput';
import useDebounce from '@/hooks/useDebounce';

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
      enabled>
      <View style={{flex: 1}}>
        <SearchInput value={search} onChangeText={setSearch} />
        <FlatList
          data={debouncedSearch !== '' ? searchResults : starWarsCharacters}
          style={{flex: 1}}
          keyExtractor={(item) => item.url}
          renderItem={({item}) => (
            <CharacterItem name={item.name} birthYear={item.birth_year} />
          )}
          onEndReached={loadMoreCharacters}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? <ActivityIndicator size="large" /> : null
          }
          removeClippedSubviews={true}
          initialNumToRender={10}
          windowSize={10}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F6',
  },
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
