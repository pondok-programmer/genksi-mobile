import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ProdukItemKoortek} from '..';
import {LoadingScreen} from '../../Teknisi';

export default function ProdukListComponent({ready, dataProduk}) {
  return ready ? (
    <LoadingScreen message="memuat formulir..." />
  ) : (
    <ScrollView>
      {dataProduk.map((product, index) => (
        <ProdukItemKoortek product={product} key={index} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
