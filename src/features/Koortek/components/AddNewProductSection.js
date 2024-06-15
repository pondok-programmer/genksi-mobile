import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconDecoment, IconPlus} from '../../../assets';
import {Gap} from '../../../components';
import {colors} from '../../../utils/constant';

export default function AddNewProductSection() {
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
      <TouchableOpacity style={styles.fristbox}>
        <View style={{margin: 15, gap: 45}}>
          <View style={styles.ViewAddFrist}>
            <Image
              source={IconPlus}
              style={{height: 25, width: 27, tintColor: colors.BLACK}}
            />
          </View>
          <Text style={styles.txtBoxNewProduk}>Add New{'\n'}Produk</Text>
        </View>
      </TouchableOpacity>
      <Gap width={15} />
      <TouchableOpacity style={styles.secondarybox}>
        <View style={{margin: 15, gap: 45}}>
          <View style={styles.ViewAdd}>
            <Image
              source={IconDecoment}
              style={{height: 25, width: 27, tintColor: colors.WHITE}}
            />
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
  fristbox: {
    height: 180,
    width: 170,
    backgroundColor: '#B2FF59',
    borderRadius: 20,
  },
  secondarybox: {
    height: 180,
    width: 170,
    backgroundColor: '#D7CCC8',
    borderRadius: 20,
  },
  ViewAddFrist: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  ViewAdd: {
    height: 40,
    width: 40,
    backgroundColor: '#536DFE',
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
