import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Status = () => {
  return (
    <View style={styles.parent}>
      <Text>Status</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
