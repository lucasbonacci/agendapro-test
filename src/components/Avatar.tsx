import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface AvatarProps {
  name?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  backgroundColor?: string;
  borderWidth?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  name = '',
  width = 100,
  height = 100,
  fontSize = 16,
  backgroundColor = 'lightgray',
  borderWidth = 2,
}) => {
  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length === 0) return '';
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <View
      style={[
        styles.avatar,
        {width, height, borderRadius: width / 2, backgroundColor, borderWidth},
      ]}>
      <Text style={[styles.avatarText, {fontSize}]}>{getInitials(name)}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: '600',
  },
});
