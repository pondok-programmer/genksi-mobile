import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconDecoment, IconPlus} from '../../../assets';
import {Gap} from '../../../components';
import {colors} from '../../../utils/constant';

export default function AddNewProductSection() {
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
      <TouchableOpacity style={styles.Fristbox}>
        <View style={{margin: 15, gap: 45}}>
          <View style={styles.ViewAdd}>
            <Image source={IconPlus} style={{height: 30, width: 30}} />
          </View>
          <Text style={styles.txtBoxNewProduk}>Add New{'\n'}Produk</Text>
        </View>
      </TouchableOpacity>
      <Gap width={15} />
      <TouchableOpacity style={styles.box}>
        <View style={{margin: 15, gap: 45}}>
          <View style={styles.ViewAdd}>
            <Image source={IconDecoment} style={{height: 30, width: 30}} />
          </View>
          <Text style={styles.txtBoxNewProduk}>
            Pengirim Permintaan{'\n'}Produk
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Fristbox: {
    height: 180,
    width: 170,
    backgroundColor: '#D7CCC8',
    borderRadius: 20,
  },
  box: {
    height: 180,
    width: 170,
    backgroundColor: '#D7CCC8',
    borderRadius: 20,
  },
  ViewAdd: {
    height: 40,
    width: 40,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  txtBoxNewProduk: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.BLACK,
  },
});
