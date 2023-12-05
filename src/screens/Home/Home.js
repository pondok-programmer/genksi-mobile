import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {IconMenu, ImgprofilePicture} from '../../assets';
import {Gap} from '../../components';
import {colors} from '../../utils/constant';
import api from '../../services/axiosInstance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [daftarTeknisi, setDaftarTeknisi] = useState([]);
  const [daftarProduct, setDaftarProduct] = useState([]);
  const [productCctv, setProductCctv] = useState([]);
  const [ready, setReady] = useState(false);
  const [coords, setCoords] = useState({
    latitude: -6.175724,
    longitude: 106.827129,
  });

  function requestAuthGeo() {
    Geolocation.requestAuthorization(
      () => {
        console.log('success');
        Geolocation.getCurrentPosition(
          ({coords}) => {
            setCoords(coords);
            console.log(coords);
          },
          error => {
            console.log(error);
          },
        );
      },
      error => {
        console.log('error:', error);
      },
    );
  }

  const [teknisiDetail, setTeknisiDetail] = useState({
    id: null,
    name: '',
    email: '',
    latitude: '',
    longitude: '',
    profile: {
      id_user: null,
      nama_lengkap: '',
      nomor_telepon: '',
    },
  });

  // Data teknisi
  async function fetchData() {
    try {
      const response = await api.get('/member/teknisi');
      console.log('teknisi', response.data.message);
      setDaftarTeknisi(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server teknisi', error.response.data);
        if (error.response.data.message === 'Unauthenticated.') {
          navigation.replace('Login');
          ToastAndroid.show(
            'login ulang untuk perbarui data anda',
            ToastAndroid.LONG,
          );
        }
      } else {
        console.log('error souce code', error.message);
      }
    }
  }

  // ! FCM PRODUCT
  async function beliCCTV(selectedProduct) {
    try {
      const response = axios.post('http://localhost:3000/send-fcm', {
        device_token: teknisiDetail.device_token,
        title: `User Anu Membeli CCTV ${selectedProduct.name}`,
        body: 'Harap periksa ketersediaan produk',
      });
      console.log(response);
    } catch (error) {
      if (error.message) {
        console.log('error from server', error.response.data);
      } else {
        console.log('error', error.message);
      }
    }
  }

  async function dataProductCctv(id) {
    try {
      const response = await api.get(`/member/produk-teknisi/${id}`);
      console.log('product CCTV', response.data.message);
      setDaftarProduct(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('Error fetching product details', error.message);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ! DRAWER LAYOUTING

  return (
    <View style={{flex: 1}}>
      {/* image menu */}
      <TouchableNativeFeedback
        useForeground
        onPress={() => navigation.navigate('Menu')}>
        <ImageBackground source={IconMenu} style={styles.bgMenu} />
      </TouchableNativeFeedback>
      <MapView
        showsCompass
        showsMyLocationButton
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        region={{
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker pinColor="dodgerblue" coordinate={coords}>
          <Callout>
            <Text style={{color: 'black'}}>Anda berada disini</Text>
          </Callout>
        </Marker>
        {daftarTeknisi.map((value, index) => (
          <Marker
            key={index}
            onPress={() => {
              setModalVisible(true);
              setTeknisiDetail(value);
              console.log('ID teknisi yang dipilih:', value.id);
              console.log(value);
              dataProductCctv(value.id);
              setProductCctv(value);
              setReady(false);
              setTimeout(() => setReady(true), 2000);
            }}
            coordinate={{
              latitude: parseFloat(value.latitude),
              longitude: parseFloat(value.longitude),
            }}></Marker>
        ))}
      </MapView>

      <Button title="get current position" onPress={requestAuthGeo} />

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.ModalContainer}>
          {!ready ? (
            <View style={styles.loadingActivityIndicator}>
              <ActivityIndicator size="large" color="black" />
              <Gap height={70} />
              <Text style={styles.textLoading}>Memuat formulir..</Text>
            </View>
          ) : (
            <ScrollView>
              <View>
                <Gap height={20} />
                <View style={styles.viewImgProduct}>
                  <Image source={ImgprofilePicture} />
                </View>
                <Text style={styles.textNameTeknisi}>{teknisiDetail.name}</Text>
                <Gap height={10} />
                <Text style={styles.textListProduct}>Daftar Cctv:</Text>
                {daftarProduct.map((value, index) => {
                  return (
                    <View key={index} style={styles.modalProduct}>
                      <Text style={styles.textListProduct}>
                        Nama cctv: {value.nama_produk}
                      </Text>
                      <Text style={styles.textListProduct}>
                        merk: {value.merk}
                      </Text>
                      <Text style={styles.textListProduct}>
                        tipe: {value.tipe}
                      </Text>
                      <Text style={styles.textListProduct}>
                        resolusi: {value.resolusi}
                      </Text>
                      <Text style={styles.textListProduct}>
                        harga: {value.harga}
                      </Text>
                      <Text style={styles.textListProduct}>
                        stok product cctv: {value.jumlah_stok_produk_teknisi}
                      </Text>
                      <Gap height={10} />
                      <View style={{marginHorizontal: 30}}>
                        <Button
                          title="Membeli Cctv"
                          onPress={() => beliCCTV(value)}
                          color={'green'}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bgMenu: {
    width: 33,
    height: 26,
    marginLeft: 15,
    marginTop: 30,
    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden',
  },
  loadingActivityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
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
  modalProduct: {
    elevation: 5,
    backgroundColor: colors.secondaryMain,
    maxWidth: 400,
    margin: 10,
    borderRadius: 10,
  },
  viewImgProduct: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  textNameTeknisi: {
    color: 'black',
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  textListProduct: {
    color: 'black',
    fontSize: 19,
    marginHorizontal: 20,
    fontFamily: 'Poppins-Medium',
  },
  viewContainer: {
    margin: 17,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    elevation: 30,
  },
  ViewContentProductCctv: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  viewTextDatasProduct: {
    marginHorizontal: 10,
  },
  textProduct: {
    marginVertical: 3,
    color: 'black',
    maxWidth: 200,
  },
  textProductTitleProduct: {
    color: 'black',
    maxWidth: 200,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});
