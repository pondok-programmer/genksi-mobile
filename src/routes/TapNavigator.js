import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {ProductTeknisi, Transaksi} from '../screens';

export default function TapNavigator() {
  const Top = createMaterialTopTabNavigator();
  return (
    <Top.Navigator initialRouteName="Orderan CCTV">
      <Top.Screen name="Orderan CCTV" component={ProductTeknisi} />
      <Top.Screen name="Transaksi" component={Transaksi} />
    </Top.Navigator>
  );
}
