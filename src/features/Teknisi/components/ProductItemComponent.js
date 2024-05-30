import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImgCCTV} from '../../../assets';
import {Gap} from '../../../components';
import {colors} from '../../../utils/constant';

const ProductItemComponent = ({product}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('OrderCctvTeknisi')}>
      <View style={styles.productDetails}>
        <Image source={ImgCCTV} style={styles.productImage} />
        <View style={styles.productText}>
          <Text style={styles.productName}>
            Nama korwil: {product?.nama_teknisi}
          </Text>
          <Text style={styles.productInfo}>
            Nama produk: {product?.nama_produk}
          </Text>
          <Text style={styles.productInfo}>
            Wilayah korwil: {product?.Wilayah}
          </Text>
          <Text style={styles.productInfo}>Kategori: {product?.kategori}</Text>
          <Text style={styles.productInfo}>Merk: {product?.merk}</Text>
          <Text style={styles.productInfo}>Tipe: {product?.tipe}</Text>
          <Text style={styles.productInfo}>Resolusi: {product?.resolusi}</Text>
          <Text style={styles.productInfo}>
            Stok: {product?.stok_produk_user}
          </Text>
          <Text style={styles.productPrice}>Harga: Rp{product?.harga}</Text>
          <Gap height={10} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    margin: 10,
    backgroundColor: colors.WHITE,
    elevation: 7,
    borderRadius: 15,
    padding: 10,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  productText: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  productInfo: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.GREEN,
    marginTop: 5,
  },
});

export default ProductItemComponent;
