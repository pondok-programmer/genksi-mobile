import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImgNothingPhoto} from '../../../assets';
import {Gap, Header, Styles} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

export default function DetailProduct({route}) {
  const navigation = useNavigation();
  const {id_produk, id_teknisi} = route.params;
  const [jumlah, setJumlah] = useState(1);
  const [data, setData] = useState({
    photoProduk: null,
    dataProdukCctv: {},
    ready: false,
  });

  useEffect(() => {
    const fetchDetailProduk = async id_produk => {
      try {
        const response = await api.get(`/member/detail-produk/${id_produk}`);
        console.log('detail produk', response.data.data);
        setData({
          photoProduk: response.data.data.photo_produk,
          dataProdukCctv: response.data.data,
          ready: true,
        });
      } catch (error) {
        if (error.message) {
          console.log('error from server', error.response.data);
        } else {
          console.log('error fetching product details', error.message);
        }
      }
    };
    fetchDetailProduk(id_produk);
  }, [id_produk]);

  const fetchOrderProduk = async () => {
    try {
      const response = await api.post(
        `/member/order/${id_teknisi}/${id_produk}`,
        {jumlah_order_produk: jumlah},
      );
      console.log('sukses', response.data.message);
      console.log('order response', response.data.data);
      ToastAndroid.show(response.data.message, ToastAndroid.LONG);
      navigation.replace('SuccesCheckOut');
    } catch (error) {
      if (error.message) {
        console.log('error from server', error.response.data);
        Alert.alert(
          'Error',
          error.response.data.message || 'Pesanan gagal di lakukan',
        );
      } else {
        console.log('error ordering product', error.message);
        const defaultErrorMessage = 'Pesanan gagal dilakukan';
        const serverErrorMessage =
          error.response?.data?.message || defaultErrorMessage;
        Alert.alert('Error', serverErrorMessage);
      }
    }
  };

  const {photoProduk, dataProdukCctv, ready} = data;

  return (
    <KeyboardAvoidingView
      style={Styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Gap height={20} />
      <Header title="Detail Produk" onPress={() => navigation.goBack()} />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <View style={styles.Content}>
          {ready ? (
            <Image
              source={
                photoProduk
                  ? {uri: `https://genksi.ejctechnology.com/${photoProduk}`}
                  : ImgNothingPhoto
              }
              style={{width: '100%', height: 330}}
            />
          ) : (
            <ActivityIndicator size={'large'} color={colors.PRIMARY} />
          )}
        </View>
        <View style={styles.body}>
          {ready ? (
            <Text style={styles.title}>{dataProdukCctv?.nama_produk}</Text>
          ) : (
            <ActivityIndicator size={'small'} color={colors.PRIMARY} />
          )}
          <Gap height={10} />
          <View style={styles.ViewTipeAndMerek}>
            <View style={styles.ViewMerek}>
              {ready ? (
                <Text style={styles.TxtMerek}>
                  Merk: {dataProdukCctv?.merk}
                </Text>
              ) : (
                <ActivityIndicator size={'small'} color={colors.PRIMARY} />
              )}
            </View>
            <Gap height={10} />
            <View style={styles.ViewMerek}>
              {ready ? (
                <Text style={styles.Txttipe}>Tipe: {dataProdukCctv?.tipe}</Text>
              ) : (
                <ActivityIndicator size={'small'} color={colors.PRIMARY} />
              )}
            </View>
          </View>
          <Gap height={10} />
          {ready ? (
            <Text style={styles.TxtDes}>{dataProdukCctv?.deskripsi}</Text>
          ) : (
            <ActivityIndicator size={'small'} color={colors.PRIMARY} />
          )}
          <Gap height={20} />
          <View style={{flexDirection: 'row', gap: 15}}>
            <View style={styles.ViewResolusi}>
              {ready ? (
                <Text style={styles.TxtResolusi}>
                  Resolusi: {dataProdukCctv?.resolusi}
                </Text>
              ) : (
                <ActivityIndicator size={'small'} color={colors.PRIMARY} />
              )}
            </View>

            <View style={styles.ViewResolusi}>
              {ready ? (
                <Text style={styles.TxtResolusi}>
                  Total Stok: {dataProdukCctv?.total_stok_produk}
                </Text>
              ) : (
                <ActivityIndicator size={'small'} color={colors.PRIMARY} />
              )}
            </View>
          </View>
          <Gap height={20} />
          <View style={styles.ViewJumlah}>
            <Text style={styles.TxtLabel}>Jumlah Produk :</Text>
            <TextInput
              style={styles.TxtInput}
              keyboardType="numeric"
              value={String(jumlah)}
              onChangeText={text => setJumlah(Number(text))}
            />
          </View>
          <Gap height={25} />
          <View style={styles.ViewButton}>
            {ready ? (
              <Text style={styles.TxtPrice}>
                Rp.{dataProdukCctv?.harga * jumlah}
              </Text>
            ) : (
              <ActivityIndicator size={'small'} color={colors.PRIMARY} />
            )}
            <TouchableOpacity
              style={styles.ViewCardBottom}
              onPress={fetchOrderProduk}>
              <Text style={styles.TxtCard}>ADD CARD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  ViewResolusi: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    width: 130,
    borderColor: colors.BLACK,
  },
  TxtResolusi: {
    fontWeight: '300',
    fontSize: 14,
    color: colors.BLACK,
  },
  TxtDes: {
    fontWeight: '300',
    fontSize: 14,
    color: colors.BLACK,
    maxWidth: 350,
    textAlign: 'center',
  },
  Txttipe: {
    fontWeight: '300',
    fontSize: 14,
    color: colors.BLACK,
  },
  TxtMerek: {
    fontWeight: '300',
    fontSize: 14,
    color: colors.BLACK,
  },
  TxtPrice: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'left',
    color: colors.BLACK,
  },
  TxtCard: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.WHITE,
  },
  ViewCardBottom: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 50,
    width: 210,
    borderColor: colors.BLACK,
    backgroundColor: colors.BLUE,
  },
  ViewBottom: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    width: 70,
    borderColor: colors.BLACK,
  },
  ViewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
  },
  ViewTipeAndMerek: {
    flexDirection: 'row',
    gap: 15,
  },
  ViewMerek: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    width: 125,
    borderColor: colors.BLACK,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.BLACK,
  },
  body: {
    padding: 20,
  },
  Content: {
    backgroundColor: colors.GREY,
  },
  ViewJumlah: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  TxtLabel: {
    fontSize: 16,
    color: colors.BLACK,
  },
  TxtInput: {
    borderWidth: 1,
    color: colors.BLACK,
    borderColor: colors.BLACK,
    borderRadius: 5,
    padding: 5,
    width: 100,
    textAlign: 'center',
  },
});
