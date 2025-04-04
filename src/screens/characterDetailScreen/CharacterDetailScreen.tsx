import React from 'react';
import {ScrollView, View, StyleSheet, ActivityIndicator} from 'react-native';
import {useGlobalContext} from '@/hooks/useGlobalContext';
import {Header, InfoList, InfoItem} from './components';
import { ErrorMessage } from '@/components';
import {StarWarsCharacter} from '@/types/StarWarsCharacter';
import {useFetchMultipleResources} from '@/hooks/useFetchMultipleResources';
import {useFetchSingleResource} from '@/hooks/useFetchSingleResource';

const CharacterCard = () => {
  const {character} = useGlobalContext() as {character: StarWarsCharacter};
  const {
    data: films,
    isLoading: loadingFilms,
    isError: errorFilms,
  } = useFetchMultipleResources(character.films, 'film');
  const {
    data: vehicles,
    isLoading: loadingVehicles,
    isError: errorVehicles,
  } = useFetchMultipleResources(character.vehicles, 'vehicle');
  const {
    data: starships,
    isLoading: loadingStarships,
    isError: errorStarships,
  } = useFetchMultipleResources(character.starships, 'starship');
  const {
    data: species,
    isLoading: loadingSpecies,
    isError: errorSpecies,
  } = useFetchMultipleResources(character.species, 'species');
  const {
    data: homeWorld,
    isLoading: loadingHomeWorld,
    isError:isErrorHomeWorld,
  } = useFetchSingleResource(character.homeworld, 'homeworld');

  const isLoading =
    loadingFilms ||
    loadingVehicles ||
    loadingStarships ||
    loadingSpecies ||
    loadingHomeWorld;
    
  const hasError =
    errorFilms ||
    errorVehicles ||
    errorStarships ||
    errorSpecies ||
    isErrorHomeWorld;

  if (hasError) return <ErrorMessage/>;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Header
        name={character.name}
        starships={character.starships}
        gender={character.gender}
        films={character.films}
      />
      <View style={styles.infoContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <InfoItem label="height" value={character.height} />
            <InfoItem label="mass" value={character.mass} />
            <InfoItem label="home planet" value={homeWorld} />
            <InfoList
              title="Películas en las que está presente"
              items={films}
            />
            <InfoItem label="hair color" value={character.hair_color} />
            <InfoItem label="skin color" value={character.skin_color} />
            <InfoList title="Especies" items={species} />
            <InfoList title="Vehículos" items={vehicles} />
            <InfoList title="Naves" items={starships} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  infoContainer: {
    flex: 1,
    padding: 16,
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
