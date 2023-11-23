import {View, Text} from 'react-native';
import React from 'react';
import {Product} from '../../features/Korwil';

export default function Korwil() {
  return (
    <View style={{flex: 1}}>
      {/* <Text>Korwil</Text> */}
      <Product />
    </View>
  );
}
