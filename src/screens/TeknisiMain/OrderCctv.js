import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImgCCTV} from '../../assets';
import {ButtonAction, EmptyBackground, Gap, Header} from '../../components';
import {LoadingScreen, OrderDetailComponent} from '../../features/Teknisi';
import {colors} from '../../utils/constant';

export default function OrderCctv({navigation}) {
  const [jumlah, setJumlah] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ready, setReady] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const dummyProduct = {
      id: 1, // Pastikan Anda memiliki ID untuk penanganan pesanan
      nama_produk: 'CCTV Dummy',
      kategori: 'Security',
      merk: 'BrandX',
      resolusi: '1080p',
      tipe: 'Outdoor',
      harga: '1,500,000',
    };
    setSelectedProduct(dummyProduct);
    const timeoutId = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  async function bukaWhatsApp() {
    const phoneNumber = '+6282161196119';
    try {
      await Linking.openURL(`https://wa.me/${phoneNumber}`);
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  }

  async function handleOrderProduct(id) {
    if (!id) {
      console.error('Product ID is missing');
      return;
    }

    // Menyimulasikan pemesanan produk
    setTimeout(() => {
      setOrderStatus(`Order successful for product ID: ${id}`);
      Alert.alert(
        'Order Successful',
        `Your order for product ID: ${id} has been placed successfully.`,
      );
    }, 1000);
  }

  return (
    <View style={{flex: 1}}>
      <EmptyBackground />
      <Gap height={10} />
      <Header title="Order CCTV" onPress={() => navigation.goBack()} />
      {ready ? (
        <ScrollView
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll
          style={styles.container}>
          <View style={styles.viewImgProduct}>
            <Image
              source={ImgCCTV}
              style={{width: '80%', height: 200, alignSelf: 'center'}}
            />
          </View>
          <Text style={styles.textProductTitle}>
            {selectedProduct?.nama_produk}
          </Text>
          <OrderDetailComponent
            selectedProduct={selectedProduct}
            jumlah={jumlah}
            setJumlah={setJumlah}
          />
          <TouchableOpacity onPress={bukaWhatsApp}>
            <Text style={styles.textOrderTitle}>WhatsApp</Text>
          </TouchableOpacity>
          <Gap height={20} />
          <ButtonAction
            title="Beli Sekarang"
            onPress={() => handleOrderProduct(selectedProduct?.id)}
          />
          <Gap height={20} />
        </ScrollView>
      ) : (
        <LoadingScreen message="Memuat formulir..." />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewRecipt: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    height: 55,
    width: 80,
    elevation: 3,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textOrderTitle: {
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 30,
    textAlign: 'center',
    color: colors.BLACK,
    fontWeight: '500',
    fontSize: 16,
    borderWidth: 1,
    elevation: 3,
  },
  textProductTitle: {
    color: colors.BLACK,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  viewImgProduct: {
    margin: 10,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: colors.WHITE,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container: {
    width: '100%',
    alignSelf: 'center',
    maxWidth: 520,
    padding: 10,
  },
});
