import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {ModalMember} from '..';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

export default function MapsMember({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [daftarTeknisi, setDaftarTeknisi] = useState([]);
  const [daftarProduct, setDaftarProduct] = useState([]);
  const [productCctv, setProductCctv] = useState([]);
  const [ready, setReady] = useState(false);
  const [coords, setCoords] = useState({
    latitude: -6.175724,
    longitude: 106.827129,
  });

  useEffect(() => {
    fetchData();
    requestAuthGeo();
  }, []);

  // PENCARIAN LOKASI TEKNISI
  function requestAuthGeo() {
    Geolocation.requestAuthorization(
      () => {
        // console.log('success');
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

  const [dataTeknisi, setDataTeknisi] = useState({
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

  // DATA ALL TEKNISI
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

  // DATA PRODUCT CCTV
  async function dataProductCctv(id) {
    try {
      const response = await api.get(`/member/produk-teknisi/${id}`);
      // console.log('product CCTV', response.data.message);
      setDaftarProduct(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('Error fetching product details', error.message);
      }
    }
  }

  // ! FCM PRODUCT
  async function beliCCTV(selectedProduct) {
    try {
      const response = axios.post('http://localhost:3000/send-fcm', {
        device_token: setDataTeknisi.device_token,
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

  return (
    <View style={{flex: 1}}>
      {/* image menu */}
      {/* <TouchableNativeFeedback
        useForeground
        onPress={() => navigation.navigate('Menu')}>
        <ImageBackground source={IconMenu} style={styles.bgMenu} />
      </TouchableNativeFeedback> */}
      <MapView
        showsCompass
        showsMyLocationButton
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: coords?.latitude || 0.0,
          longitude: coords?.longitude || 0.0,
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
              setDataTeknisi(value);
              console.log('ID teknisi yang dipilih:', value.id);
              console.log(value);
              dataProductCctv(value.id);
              setProductCctv(value);
              setReady(false);
              setTimeout(() => setReady(true), 2000);
            }}
            coordinate={{
              latitude: parseFloat(value?.latitude) || 0.0,
              longitude: parseFloat(value?.longitude) || 0.0,
            }}></Marker>
        ))}
      </MapView>

      {/* MODAL */}
      <ModalMember
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        ready={ready}
        dataTeknisi={dataTeknisi}
        daftarProduct={daftarProduct}
        beliCCTV={beliCCTV}
      />
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
