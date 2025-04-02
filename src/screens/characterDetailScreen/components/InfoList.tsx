import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface InfoListProps {
  title: string;
  items: string[];
}

const InfoList: React.FC<InfoListProps> = ({title, items}) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.infoLabel}>{title}</Text>
      {items.map((item, index) => (
        <View style={styles.listItem} key={`${item}-${index}`}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.infoValue}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default InfoList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  infoLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bullet: {
    marginLeft: 10,
    marginRight: 8,
    lineHeight: 20,
    fontSize: 16,
  },

  infoValue: {
    fontSize: 16,
    lineHeight: 20,
  },
});
