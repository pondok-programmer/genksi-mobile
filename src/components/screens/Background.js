import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ImgBackground} from '../../assets';

export default function Background() {
  return <Image source={ImgBackground} style={styles.img} />;
}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
