import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({label, value}) => {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  infoItem: {
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  infoLabel: {
    fontSize: 14,
    color: 'gray',
  },
  infoValue: {
    paddingVertical: 8,
    fontSize: 16,
  },
});
