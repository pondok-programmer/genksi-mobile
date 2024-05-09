import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {EmptyBackground, Header, Styles} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

export default function DataProduct({navigation}) {
  const [dataProduct, setDataProduct] = useState([]);
  const [ready, setReady] = useState(true);

  async function fetchDataProduct() {
    try {
      const response = await api.get('/distributor/produk');
      setDataProduct(response.data['data produk']);
      // ! JIKA KALAU END PONT MENGUNAKAN SPACE
      console.log('data product', response.data['data produk']);
    } catch (e) {
      if (e.response) {
        console.log('error from server', e.response.data);
      } else {
        console.log('Error', e.message);
      }
    } finally {
      setTimeout(() => setReady(false), 1500);
    }
  }

  useEffect(() => {
    fetchDataProduct();
  }, []);

  const renderDataProduct = (item, index) => (
    <View style={styles.productItem} key={index}>
      {/* <Image source={{uri: item?.imageUri}} style={styles.kategoriImage} /> */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>Nama: {item?.nama_produk}</Text>
        <Text style={styles.productName}>Kategori: {item?.kategori}</Text>
        <Text style={styles.productName}>Merk: {item?.merk}</Text>
        <Text style={styles.productName}>Tipe: {item?.tipe}</Text>
        <Text style={styles.productName}>Resolusi: {item?.resolusi}</Text>
        <Text style={styles.productJumlahProduct}>harga: {item?.harga}</Text>
        <Text style={styles.productStok}>stok: {item?.total_stok_produk}</Text>
      </View>
    </View>
  );

  return (
    <View style={Styles.container}>
      <EmptyBackground />
      <Header title="Data Product" onPress={() => navigation.goBack()} />
      {ready ? (
        <View style={styles.ViewLoading}>
          <Text style={[styles.textLoading, {fontSize: 16}]}>
            Memuat formulir
          </Text>
        </View>
      ) : (
        <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
          <View style={styles.ContentData}>
            {dataProduct &&
              dataProduct.map((kategori, index) => (
                <View style={styles.kategoriItem} key={index}>
                  {renderDataProduct(kategori)}
                </View>
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ContentData: {
    padding: 20,
    elevation: 10,
  },
  textLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'grey',
    flex: 1,
    fontStyle: 'italic',
  },
  ViewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  productItem: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productJumlahProduct: {
    fontSize: 14,
    color: '#555',
  },
  productStok: {
    fontSize: 14,
    color: '#555',
  },
});
