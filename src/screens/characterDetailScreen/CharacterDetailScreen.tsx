import {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, ActivityIndicator} from 'react-native';
import {useGlobalContext} from '@/hooks/useGlobalContext';
import {StarWarsCharacter} from '@/types/StarWarsCharacter';
import {Header, InfoList, InfoItem} from './components';

const CharacterCard = () => {
  const {character} = useGlobalContext() as {character: StarWarsCharacter};

  const [films, setFilms] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [homeWorld, setHomeWorld] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!character) return;
      setIsLoading(true);
      try {
        const filmsData = await Promise.all(
          character.films.map(async url => {
            const response = await fetch(url);
            const data = await response.json();
            return data.title;
          }),
        );
        setFilms(filmsData);

        const vehiclesData = await Promise.all(
          character.vehicles.map(async url => {
            const response = await fetch(url);
            const data = await response.json();
            return data.name;
          }),
        );
        setVehicles(vehiclesData);

        const starshipsData = await Promise.all(
          character.starships.map(async url => {
            const response = await fetch(url);
            const data = await response.json();
            return data.name;
          }),
        );
        setStarships(starshipsData);

        const speciesData = await Promise.all(
          character.species.map(async url => {
            const response = await fetch(url);
            const data = await response.json();
            return data.name;
          }),
        );
        setSpecies(speciesData);

        const homeworldResponse = await fetch(character.homeworld);
        const homeworldData = await homeworldResponse.json();
        setHomeWorld(homeworldData.name);
      } catch (error) {
        console.error('Error fetching extra data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [character]);

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
