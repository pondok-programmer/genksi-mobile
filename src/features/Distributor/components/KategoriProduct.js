import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Background, EmptyBackground, Header, Styles} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

export default function KategoriProduct({navigation}) {
  const [dataKategori, setDataKategori] = useState(null);
  const [ready, setReady] = useState(true);

  async function fetchKategori() {
    try {
      const response = await api.get('/distributor/kategori-produk');
      setDataKategori(response.data);
      // console.log('data kategori', response.data);
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
    fetchKategori();
  }, []);

  const renderKategori = (item, index) => (
    <View style={styles.kategoriItem} key={index}>
      {/* <Image source={{uri: item.imageUri}} style={styles.kategoriImage} /> */}
      <View style={styles.kategoriDetails}>
        <Text style={styles.kategoriName}>{item.nama_kategori}</Text>
        <Text style={styles.kategoriJumlahProduct}>
          jumlah_produk: {item.jumlah_produk}
        </Text>
        <Text style={styles.kategoriStok}>
          stok: {item.total_stok_seluruh_produk}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={Styles.container}>
      <EmptyBackground />
      <Header title="kategori product" onPress={() => navigation.goBack()} />
      {ready ? (
        <View style={styles.ViewLoading}>
          <Text style={[styles.textLoading, {fontSize: 16}]}>
            Memuat formulir
          </Text>
        </View>
      ) : (
        <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
          <View style={{padding: 20}}>
            {dataKategori?.map((kategori, index) => (
              <View style={styles.kategoriItem} key={index}>
                {renderKategori(kategori)}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  kategoriItem: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  kategoriImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  kategoriDetails: {
    flex: 1,
    padding: 10,
  },
  kategoriName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  kategoriJumlahProduct: {
    fontSize: 14,
    color: '#555',
  },
  kategoriStok: {
    fontSize: 14,
    color: '#555',
  },
});
