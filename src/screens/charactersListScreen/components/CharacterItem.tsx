import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {SVG} from '@/assets/svg';
import {Avatar} from '@/components';

interface CharacterItemProps {
  name: string;
  birthYear: string;
  handleSelectCharacter: () => void;
}

const CharacterItem: React.FC<CharacterItemProps> = ({
  name,
  birthYear,
  handleSelectCharacter,
}) => {
  const formattedBirthYear = () => {
    if (birthYear.toLowerCase() === 'unknown') return 'unknown';
    return birthYear.replace(/(\d+)([A-Za-z]+)/, '$1 $2');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSelectCharacter}>
      <View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
          <Avatar
            name={name}
            width={50}
            height={50}
            fontSize={16}
            borderWidth={2}
            backgroundColor="lightgray"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{formattedBirthYear()}</Text>
          </View>
        </View>
        <SVG.RightArrow />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CharacterItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F6',
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});
