import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {ModalMember} from '..';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

export default function MapsMember({navigation}) {
  const [ready, setReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [daftarTeknisi, setDaftarTeknisi] = useState([]);
  const [daftarProduct, setDaftarProduct] = useState([]);
  const [coords, setCoords] = useState({
    latitude: -6.175724,
    longitude: 106.827129,
  });
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

  // Lifecycle Hooks
  useEffect(() => {
    fetchData();
    requestAuthGeo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
    }, []),
  );

  // Geolocation Functions
  const requestAuthGeo = () => {
    Geolocation.requestAuthorization(
      () => {
        Geolocation.getCurrentPosition(
          ({coords}) => setCoords(coords),
          error => console.error(error),
        );
      },
      error => console.error('Authorization error:', error),
    );
  };

  // Data Fetching Functions
  const fetchData = async () => {
    try {
      const response = await api.get('/member/teknisi');
      console.log('daftar teknisi', response.data.data);
      setDaftarTeknisi(response.data.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const dataProductCctv = async id => {
    try {
      const response = await api.get(`/member/produk-teknisi/${id}`);
      setDaftarProduct(response.data.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const beliCCTV = async selectedProduct => {
    try {
      const response = await axios.post('http://localhost:3000/send-fcm', {
        device_token: dataTeknisi.device_token,
        title: `User Anu Membeli CCTV ${selectedProduct.name}`,
        body: 'Harap periksa ketersediaan produk',
      });
      console.log(response);
    } catch (error) {
      handleApiError(error);
    }
  };

  // Helper Functions
  const handleApiError = error => {
    if (error.response) {
      console.error('API error:', error.response.data);
      if (error.response.data.message === 'Unauthenticated.') {
        navigation.replace('Login');
        ToastAndroid.show(
          'Login ulang untuk memperbarui data anda',
          ToastAndroid.LONG,
        );
      }
    } else {
      console.error('Code error:', error.message);
    }
  };

  // Marker Press Handler
  const handleMarkerPress = value => {
    setModalVisible(true);
    setDataTeknisi(value);
    dataProductCctv(value.id);
    setReady(false);
    setTimeout(() => setReady(true), 2000);
  };

  return (
    <View style={{flex: 1}}>
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
            onPress={() => handleMarkerPress(value)}
            coordinate={{
              latitude: parseFloat(value?.latitude) || 0.0,
              longitude: parseFloat(value?.longitude) || 0.0,
            }}
          />
        ))}
      </MapView>

      <ModalMember
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        ready={ready}
        dataTeknisi={dataTeknisi}
        daftarProduct={daftarProduct}
        // beliCCTV={beliCCTV}
      />
    </View>
  );
}

// Styles
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
