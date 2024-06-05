import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/constant';

export default function ProfileData({value}) {
  return (
    <View style={styles.container}>
      <Text style={styles.TxtValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  TxtValue: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.BLACK,
    textAlign: 'center',
  },
  container: {
    backgroundColor: colors.WHITE,
    elevation: 3,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    color: colors.BLACK,
    fontWeight: '500',
  },
});
