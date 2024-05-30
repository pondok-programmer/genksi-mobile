import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {LoadingScreen, ProductItemComponent} from '../../features/Teknisi';
import {colors} from '../../utils/constant';

export default function ProductTeknisi() {
  const [ready, setReady] = useState(true);
  const [dataProdukKorwil, setDataProdukKorwil] = useState([]);

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

  async function konfirmasiPembelian(namaPembeli, productId) {
    try {
      const response = await axios.post('http://localhost:3000/send-fcm', {
        device_token: teknisiDetail.device_token,
        title: `User ${namaPembeli} Telah Membeli CCTV ${productId}`,
        body: 'Harap periksa detail transaksi',
      });
      console.log(response);

      const responseDua = await axios.put(
        `http://localhost:3000/product-cctv/${productId}`,
      );
      console.log(responseDua);
    } catch (error) {
      console.error('Error during purchase confirmation:', error);
    }
  }

  useEffect(() => {
    setDataProdukKorwil(dummyData);
    const timeoutId = setTimeout(() => setReady(false), 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={{flex: 1}}>
      {ready ? (
        <LoadingScreen message="Memuat formulir..." />
      ) : (
        <ScrollView style={{padding: 10}}>
          {dataProdukKorwil.map((product, index) => (
            <ProductItemComponent product={product} key={index} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.GRAYDEFAULT,
    flex: 1,
    fontStyle: 'italic',
  },
});
