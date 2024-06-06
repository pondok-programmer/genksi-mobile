import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/constant';

const LoadingScreen = ({message}) => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.BLACK,
    flex: 1,
    fontStyle: 'italic',
  },
});

export default LoadingScreen;
