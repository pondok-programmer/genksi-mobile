import {View} from 'react-native';
import React from 'react';
import {DistributorHome} from '../../features/Distributor';
import {Styles} from '../../components';

export default function Distributor() {
  return (
    <View style={Styles.container}>
      <DistributorHome />
    </View>
  );
}
