import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Background, Gap, Header} from '../../../components';
import {ImgprofilePicture} from '../../../assets';
import api from '../../../services/axiosInstance';

export default function ProductTeknisi({navigation}) {
  const [dataProdukKorwil, setDataProdukKorwil] = useState(null);
  const [ready, setReady] = useState(true);

  // const [loading, setLoading] = useState(true);

  async function bukaWhatsApp(NoWhatsApp) {
    try {
      await Linking.openURL(`https://wa.me/${NoWhatsApp}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function konfirmasiPembelian(namaPembeli, productId) {
    try {
      // kirim notifikasi ke korwil untuk melihat detail transaksi
      const response = axios.post('http://localhost:3000/send-fcm', {
        device_token: teknisiDetail.device_token, // Pastikan variabel teknisiDetail sudah didefinisikan
        title: `User ${namaPembeli} Telah Membeli CCTV ${productId}`,
        body: 'Harap periksa detail transaksi',
      });
      console.log(response);

      // kurangi stok cctv yang dibeli user
      const responseDua = axios.put(
        `http://localhost:3000/product-cctv/${productId}`,
      );
      console.log(responseDua);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      const response = await api.get('/teknisi/produk');
      setDataProdukKorwil(response.data);
      // console.log('data', response.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('Error', error.message);
      }
    } finally {
      setTimeout(() => setReady(false), 1500);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Produk" onPress={() => navigation.goBack()} />
      <Background />
      {ready ? (
        <View style={styles.ViewLoading}>
          <Text style={[styles.textLoading, {fontSize: 16}]}>
            Memuat formulir...
          </Text>
        </View>
      ) : (
        <ScrollView stickyHeaderHiddenOnScroll={true} stickyHeaderIndices={[0]}>
          {dataProdukKorwil?.map((user, index) => (
            <View key={index} style={styles.viewContent}>
              <View style={styles.viewContextProductCctv}>
                <Image source={ImgprofilePicture} style={styles.productImage} />
                <View style={styles.textProduct}>
                  <Text style={styles.ProductName}>
                    Nama: {user.nama_produk}
                  </Text>
                  <Text style={styles.ProductKatogori}>
                    Description: {user.kategori}
                  </Text>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Medium'}}>
                    Merk: {user.merk}
                  </Text>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                    Tipe: {user.tipe}
                  </Text>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                    {user.resolusi}
                  </Text>
                  <Text style={styles.ProductAmount}>
                    Amount: Rp{user.harga},-
                  </Text>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                    Stok cctv: {user.jumlah_stok_produk_teknisi}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  productImage: {height: 100, borderRadius: 10},
  ProductKatogori: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  ProductName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  ProductAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 5,
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
  viewTextUser: {
    color: 'black',
    margin: 14,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 19,
    top: 15,
  },
  viewContent: {
    margin: 20,
    backgroundColor: 'white',
    elevation: 7,
    borderRadius: 15,
    alignItems: 'center',
    maxWidth: 340,
  },
  viewProfileUser: {
    alignItems: 'flex-start',
  },
  textUserDetail: {
    color: 'black',
    fontSize: 17,
    maxWidth: 200,
    fontFamily: 'Poppins-Medium',
  },
  viewContextProductCctv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textProduct: {
    maxWidth: 210,
    padding: 11,
  },
});
