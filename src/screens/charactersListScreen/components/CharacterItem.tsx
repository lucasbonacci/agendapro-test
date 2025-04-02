import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {SVG} from '@/assets/svg';

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
  const initials = () => {
    const names = name.trim().split(' ');
    if (names.length === 0) return '';
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const formattedBirthYear = () => {
    if (birthYear.toLowerCase() === 'unknown') return 'unknown';
    return birthYear.replace(/(\d+)([A-Za-z]+)/, '$1 $2');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSelectCharacter}>
      <View style={styles.cardContainer}>
        <View style={styles.avatarInfoContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials()}</Text>
          </View>
          <View style={styles.infoContainer}>
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
  avatarInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  avatarText: {
    fontWeight: '600',
    fontSize: 16,
  },
  infoContainer: {
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
