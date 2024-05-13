import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Styles} from '../../components';
import {RiwayatTransaksiMember} from '../../features/HomeMain';

export default function RiwayatOrderMain() {
  return (
    <SafeAreaView style={Styles.container}>
      <RiwayatTransaksiMember />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
