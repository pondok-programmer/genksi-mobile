import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Gap} from '../../components';
import {
  AddNewProductSection,
  NavbarComponent,
  ProdukListComponent,
} from '../../features/Korwil';
import {colors} from '../../utils/constant';

export default function HomeScreenKoortek() {
  const [ready, setReady] = useState(true);
  const [dataProduk, setDataProduk] = useState([]);

  const dummyData = [
    {
      id: 1,
      nama_teknisi: 'John Doe',
      Wilayah: 'Jakarta Selatan',
      kategori: 'CCTV',
      nama_produk: 'CCTV ABC',
      merk: 'BrandX',
      tipe: 'Type1',
      resolusi: '1080p',
      harga: 1500000,
      stok_produk_user: 10,
    },
    {
      id: 2,
      nama_teknisi: 'Al ZUlkun',
      kategori: 'CCTV Pro',
      nama_produk: 'CCTV DEF',
      Wilayah: 'Jakarta Selatan',
      merk: 'BrandY',
      tipe: 'Type2',
      resolusi: '4K',
      harga: 2500000,
      stok_produk_user: 5,
    },
  ];

  useEffect(() => {
    setDataProduk(dummyData);
    const timeoutId = setTimeout(() => setReady(false), 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  const tasbar = () => {
    Alert.alert('Nantikan Fitur Nya!', 'Masih tahap perkembangan', [
      {text: 'OK', style: 'cancel'},
    ]);
  };

  return (
    <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
      <View style={styles.Container}>
        <NavbarComponent onMenuPress={tasbar} />
        <Gap height={25} />
        <AddNewProductSection />
        <Gap height={36} />
        <Text style={styles.TxtProduk}>Produck</Text>
        <Text style={styles.TxtDescriptionProduk}>
          Check and manage your produck
        </Text>
        <Gap height={25} />
        <ProdukListComponent ready={ready} dataProduk={dataProduk} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  TxtDescriptionProduk: {
    fontSize: 20,
    fontWeight: '400',
    color: '#555',
  },
  TxtProduk: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.BLACK,
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
  txtName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  imgMenu: {
    height: 39,
    width: 37,
    backgroundColor: '#D7CCC8',
    padding: 10,
    borderRadius: 10,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  Container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.WHITE,
  },
});
