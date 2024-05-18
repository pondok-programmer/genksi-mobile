import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {ImgNothingPhoto} from '../../../assets';
import {colors} from '../../../utils/constant';

const ProductItem = ({product, onUploadTransaction, imageUploaded}) => {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Image
          source={
            product?.photo_produk
              ? {
                  uri: `https://genksi.ejctechnology.com/${product?.photo_produk}`,
                }
              : ImgNothingPhoto
          }
          style={styles.transactionImage}
        />
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>{product?.produk}</Text>
          <Text style={styles.transactionBrand}>Merk: {product?.merk}</Text>
          <Text style={styles.transactionResolusi}>
            Resolusi: {product?.resolusi}
          </Text>
          <Text style={styles.transactionTipe}>Tipe: {product?.tipe}</Text>
          <Text style={styles.transactionDate}>
            Jumlah order: {product?.jumlah_order_produk}
          </Text>
          <Text style={styles.transactionAmount}>
            Harga: Rp {product?.harga}
          </Text>
          <View style={styles.transactionFooter}>
            <Text style={styles.transactionAmountAll}>
              Total Harga: Rp {product?.total_harga_order}
            </Text>
            <TouchableNativeFeedback
              onPress={() => onUploadTransaction(product?.id_order)}
              background={TouchableNativeFeedback.Ripple('#DDD')}>
              <View style={styles.trashButton}>
                {imageUploaded[product?.id_order] ? (
                  <Image
                    source={{uri: imageUploaded[product?.id_order]}}
                    style={styles.trashIcon}
                  />
                ) : (
                  <Image source={ImgNothingPhoto} style={styles.trashIcon} />
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionItem: {
    marginBottom: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    elevation: 4,
    overflow: 'scroll', // Add overflow: 'scroll' to allow scrolling
    padding: 10,
  },
  transactionTipe: {
    fontSize: 15,
    color: '#555',
  },
  transactionAmountAll: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.BLUE,
  },
  trashIcon: {
    width: 20,
    height: 30,
  },
  trashButton: {
    padding: 2,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  transactionBrand: {
    fontSize: 15,
    color: '#555',
  },
  transactionResolusi: {
    fontSize: 15,
    color: '#555',
  },
  transactionAmount: {
    fontSize: 14,
    color: '#555',
  },
  transactionDate: {
    fontSize: 14,
    color: '#555',
  },
  transactionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  transactionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  transactionDetails: {
    flex: 1,
    marginBottom: 10, // Add marginBottom to create space between products
  },
});

export default ProductItem;
