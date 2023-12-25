import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {ButtonAction, EmptyBackground, Gap, Header} from '../../../components';
import api from '../../../services/axiosInstance';
import {ImgCCTV} from '../../../assets';
import {colors} from '../../../utils/constant';

export default function OrderCctv({navigation, route}) {
  const [jumlah, setJumlah] = useState(0);
  const [dataOrder, setDataOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1500);

  useEffect(() => {
    if (route && route.params && route.params.selectedProduct) {
      setSelectedProduct(route.params.selectedProduct);
    }
  }, [route]);

  //! handle WhastApp
  async function bukaWhatsApp() {
    const phoneNumber = '+6282161196119';
    try {
      await Linking.openURL(`https://wa.me/${phoneNumber}`);
    } catch (error) {
      console.log(error);
    }
  }

  // order product
  async function handleOrderProduct(id) {
    try {
      const response = await api.post(`/teknisi/order/${id}`);
      console.log('order cctv', response.data.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('Error', error.message);
      }
    }
  }

  return (
    <View style={{flex: 1}}>
      <EmptyBackground />
      <Header title="Order cctv" onPress={() => navigation.goBack()} />
      {ready && (
        <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
          <View style={styles.container}>
            <View style={styles.viewImgProduct}>
              <Image source={ImgCCTV} style={{width: '80%', height: '70%'}} />
            </View>
            <Text style={styles.textProductTitle}>
              {selectedProduct?.nama_produk}
            </Text>
            <View style={{padding: 20}}>
              <TouchableOpacity onPress={bukaWhatsApp}>
                <Text style={styles.textOrderTitle}>WhatsApp</Text>
              </TouchableOpacity>
              <Gap height={20} />
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
                <Text style={{color: 'black'}}>
                  {new Date().toDateString()}
                </Text>
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
                <Text style={{color: 'black'}}>
                  Rp{selectedProduct?.harga},-
                </Text>
              </View>
            </View>
          </View>
          <ButtonAction title="Beli Sekarang" />
          <Gap height={20} />
        </ScrollView>
      )}
      {!ready && (
        <View style={styles.ViewLoading}>
          <Text style={[styles.textLoading, {fontSize: 16}]}>
            Memuat formulir
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textOrderTitle: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    borderWidth: 1,
    elevation: 3,
  },
  textInput: {
    marginLeft: 90,
    flex: 1,
    color: 'black',
  },
  viewReciptKet: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    elevation: 3,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  viewRecipt: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    elevation: 3,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textProductTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  viewImgProduct: {
    margin: 10,
    height: 270,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    alignSelf: 'center',
    maxWidth: 520,
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
});
