import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from '@/components';
import {SVG} from '@/assets/svg';

export interface HeaderProps {
  name: string;
  gender: string;
  starships?: string[];
  films?: string[];
}

const Header: React.FC<HeaderProps> = ({name, gender, starships, films}) => {
  const renderGenderIcon = (gender: string): JSX.Element => {
    switch (gender) {
      case 'female':
        return <SVG.FemaleIcon />;
      case 'male':
        return <SVG.MaleIcon />;
      default:
        return <Text>N/A</Text>;
    }
  };

  return (
    <View style={styles.header}>
      <Avatar
        name={name}
        width={100}
        height={100}
        fontSize={40}
        borderWidth={5}
        backgroundColor="#FFFFFF"
      />

      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.iconsContainer}>
        <View style={styles.iconWrapper}>{renderGenderIcon(gender)}</View>
        <View style={styles.iconWrapper}>
          {(starships ?? []).length > 0 ? (
            <SVG.StarshipIcon />
          ) : (
            <Text>N/A</Text>
          )}
        </View>
        <View style={styles.iconWrapper}>
          {(films ?? []).length > 3 ? (
            <SVG.ThumbsUpIcon />
          ) : (
            <SVG.ThumbsDownIcon />
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F4C542',
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 16,
  },
  nameText: {
    fontSize: 18,
    marginVertical: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
