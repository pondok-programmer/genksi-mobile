import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils/constant';

const ProfileDetailItem = ({value}) => (
  <View style={styles.userDetail}>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  userDetail: {
    backgroundColor: colors.WHITE,
    elevation: 3,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    color: colors.BLACK,
    fontWeight: '500',
  },
  // detailLabel: {
  //   fontWeight: '500',
  //   fontSize: 16,
  //   color: colors.BLACK,
  //   textAlign: 'center',
  // },
  detailValue: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.BLACK,
    textAlign: 'center',
  },
});

export default ProfileDetailItem;
