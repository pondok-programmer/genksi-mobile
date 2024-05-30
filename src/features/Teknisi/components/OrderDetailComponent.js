import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../../utils/constant';

const ProductDetails = ({selectedProduct, jumlah, setJumlah}) => {
  return (
    <View>
      <View style={styles.viewRecipt}>
        <Text style={{color: 'black'}}>Kategori</Text>
        <Text style={{color: 'black', maxWidth: 150}} numberOfLines={1}>
          {selectedProduct?.kategori}
        </Text>
      </View>
      <View style={styles.viewRecipt}>
        <Text style={{color: 'black'}}>Merk</Text>
        <Text style={{color: 'black', maxWidth: 150}} numberOfLines={1}>
          {selectedProduct?.merk}
        </Text>
      </View>
      <View style={styles.viewRecipt}>
        <Text style={{color: 'black'}}>Resolusi</Text>
        <Text style={{color: 'black', maxWidth: 150}} numberOfLines={1}>
          {selectedProduct?.resolusi}
        </Text>
      </View>
      <View style={styles.viewRecipt}>
        <Text style={{color: 'black'}}>Tipe</Text>
        <Text style={{color: 'black', maxWidth: 150}} numberOfLines={1}>
          {selectedProduct?.tipe}
        </Text>
      </View>
      <View style={styles.viewRecipt}>
        <Text style={{color: 'black'}}>No Rek Pembayaran</Text>
        <Text style={{color: 'black'}}>09123091238</Text>
      </View>
      <View style={styles.viewRecipt}>
        <Text style={{color: 'black'}}>Tanggal pembayaran</Text>
        <Text style={{color: 'black'}}>{new Date().toDateString()}</Text>
      </View>
      <View style={styles.viewRecipt}>
        <Text style={{color: 'black'}}>Jumlah</Text>
        <TextInput
          placeholder="jumlah pembelian"
          style={styles.textInput}
          value={jumlah === 0 ? '' : jumlah.toString()}
          onChangeText={text => {
            if (/^\d*$/.test(text)) {
              if (text === '') {
                setJumlah(0);
              } else {
                setJumlah(Math.max(1, parseInt(text)));
              }
            }
          }}
          placeholderTextColor={'black'}
        />
      </View>
      <View style={styles.viewRecipt}>
        <Text style={{color: 'black'}}>Total order</Text>
        <Text style={{color: 'black'}}>Rp{selectedProduct?.harga},-</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewRecipt: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    height: 40,
    elevation: 3,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textInput: {
    marginLeft: 90,
    flex: 1,
    color: colors.WHITE,
  },
});

export default ProductDetails;
