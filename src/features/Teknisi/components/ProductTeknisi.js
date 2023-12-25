import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {EmptyBackground, Gap, Header} from '../../../components';
import {ImgCCTV} from '../../../assets';
import api from '../../../services/axiosInstance';
import {useNavigation} from '@react-navigation/native';

export default function ProductTeknisi({navigation, prop}) {
  // const navigation = useNavigation();
  const [ready, setReady] = useState(true);
  const [profileTeknisi, setProfileTeknisi] = useState([]);
  const [wilayahTeknsi, setWilayahTeknsi] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [dataProdukKorwil, setDataProdukKorwil] = useState([
    {
      'Koordinator Teknisi': '',
      Wilayah: '',
      'Produk Koordinator Teknisi': [
        {
          id: null,
          kategori: '',
          nama_produk: '',
          merk: '',
          tipe: '',
          resolusi: '',
          harga: null,
          stok_produk_user: null,
        },
        {
          id: null,
          kategori: '',
          nama_produk: '',
          merk: '',
          tipe: '',
          resolusi: '',
          harga: null,
          stok_produk_user: null,
        },
      ],
    },
  ]);

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
      setDataProdukKorwil(response.data['Produk Koordinator Teknisi']);
      setProfileTeknisi(response.data['Koordinator Teknisi']);
      setWilayahTeknsi(response.data['Wilayah']);
      // console.log(
      //   'data product teknisi',
      //   response.data['Produk Koordinator Teknisi'],
      // );
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

  return (
    <View style={{flex: 1}}>
      <EmptyBackground />
      <Header title="Produk" onPress={() => navigation.goBack()} />
      {ready ? (
        <View style={styles.ViewLoading}>
          <Text style={[styles.textLoading, {fontSize: 16}]}>
            Memuat formulir...
          </Text>
        </View>
      ) : (
        <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
          {dataProdukKorwil?.map((user, index) => (
            <TouchableOpacity
              style={styles.viewContent}
              key={index}
              onPress={() => {
                setSelectedProduct(user);
                navigation.navigate('OrderCctvTeknisi', {
                  selectedProduct: user,
                }); // Pass the selected product
              }}>
              <View style={styles.viewContextProductCctv}>
                <Image source={ImgCCTV} style={styles.productImage} />
                <View style={styles.textProduct}>
                  <Text style={styles.ProductName}>
                    Nama korwil: {profileTeknisi}
                  </Text>
                  <Text style={styles.ProductKorwil}>
                    Nama product: {user.nama_produk}
                  </Text>
                  <Text style={styles.ProductKorwil}>
                    Wilayah korwil: {wilayahTeknsi}
                  </Text>
                  <Text style={styles.ProductKatogori}>
                    Description: {user.kategori}
                  </Text>
                  <Text style={styles.ProductKorwil}>Merk: {user.merk}</Text>
                  <Text style={styles.ProductKorwil}>Tipe: {user.tipe}</Text>
                  <Text style={styles.ProductKorwil}>
                    Resolusi: {user.resolusi}
                  </Text>
                  <Text style={styles.ProductAmount}>
                    Amount: Rp{user.harga},-
                  </Text>
                  <Text style={styles.ProductKorwil}>
                    Stok cctv: {user.stok_produk_user}
                  </Text>
                  <Gap height={10} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ProductKorwil: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
  },
  txtHeadingProfileTeknisi: {
    padding: 10,
  },
  productImage: {
    height: 100,
    width: 100,
  },
  ProductKatogori: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  ProductName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
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
    color: 'black',
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
    margin: 10,
    backgroundColor: 'white',
    elevation: 7,
    borderRadius: 15,
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textProduct: {
    maxWidth: 210,
  },
});
