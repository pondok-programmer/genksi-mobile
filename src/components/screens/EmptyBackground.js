import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ImgBg, ImgEmptyBackground} from '../../assets';

export default function EmptyBackground() {
  return <Image source={ImgBg} style={styles.img} fadeDuration={300} />;
}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
