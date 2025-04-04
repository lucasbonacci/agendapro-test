import React, {useCallback, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';

import {useGlobalContext} from '@/hooks/useGlobalContext';
import {StarWarsCharacter} from '@/types/StarWarsCharacter';
import {ErrorMessage} from '@/components';
import {SearchInput, EmptyListComponent} from './components';
import useDebounce from '@/hooks/useDebounce';
import * as NavigationService from '@/navigation/NavigationService';
import {Paths} from '@/navigation/paths';
import CharacterItem, {CHARACTER_ITEM_HEIGHT} from './components/CharacterItem';

const API_URL = 'https://swapi.dev/api/people/';

const CharactersListScreen = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const {selectCharacter} = useGlobalContext();

  const queryKey = debouncedSearch
    ? ['characters', 'search', debouncedSearch]
    : ['characters'];

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({pageParam = 1}) => {
      const url = debouncedSearch
        ? `${API_URL}?search=${debouncedSearch}&page=${pageParam}`
        : `${API_URL}?page=${pageParam}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },

    getNextPageParam: (lastPage, pages) =>
      lastPage.next ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const loadMoreCharacters = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleSelectCharacter = useCallback(
    (character: StarWarsCharacter) => {
      selectCharacter(character);
      NavigationService.navigate(Paths.CharacterDetailScreen);
    },
    [selectCharacter],
  );

  const dataToShow = data?.pages.flatMap(page => page.results) || [];

  if (error) return <ErrorMessage />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
      enabled
      

      >
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
            ListEmptyComponent={
              <EmptyListComponent isSearch={debouncedSearch !== ''} />
            }
            onEndReached={loadMoreCharacters}
            onEndReachedThreshold={0.9}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator size="large" style={{marginVertical: 20}} />
              ) : null
            }
            removeClippedSubviews={true}
            initialNumToRender={10}
            windowSize={5}
            getItemLayout={(_, index) => ({
              length: CHARACTER_ITEM_HEIGHT,
              offset: CHARACTER_ITEM_HEIGHT * index,
              index,
            })}
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
