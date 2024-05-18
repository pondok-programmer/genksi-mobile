import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ImgWarning} from '../../../assets';
import {colors} from '../../../utils/constant';

const EmptyContent = () => {
  return (
    <View style={styles.ViewNothingContent}>
      <View>
        <Image source={ImgWarning} style={{height: 180, width: 100}} />
      </View>
      <Text style={styles.TxtNothingProduct}>Product Not found!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TxtNothingProduct: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: '600',
  },
  ViewNothingContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptyContent;
