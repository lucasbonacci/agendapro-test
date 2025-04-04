import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
  },
});

export default ErrorMessage;
