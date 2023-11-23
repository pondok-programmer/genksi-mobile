import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {ImgprofilePicture} from '../../assets';
import {Gap} from '../../components';
import {colors} from '../../utils/constant';
import api from '../../services/axiosInstance';

export default function Home() {
  const [role, setRole] = useState('user');
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

  const [daftarTeknisi, setDaftarTeknisi] = useState([
    // {
    //   id: 1,
    //   name: 'NAMA USER',
    //   latitude: -6.18033,
    //   longitude: 106.813003,
    //   device_token:
    //     'd05UEbhsRQSvPCKqRj46Pv:APA91bFUe9nMkvtGLDiknVRHnd0MfnIm9nC1hjv8TmRCCHCXRG2eAdyeB2ly9KW8Lu7ZQdcTnLbXHNNnlnlU8PS6CWh0uUi4msma289Zgw8L8PbTZYUw-qrp1m6F93ADLnlN8gmNbwg0',
    // },
    // {
    //   id: 2,
    //   name: 'NAMA USER',
    //   latitude: -6.173976,
    //   longitude: 106.818664,
    //   device_token:
    //     'easdfasdfee1teuOlhOwefwefsdfGBMrDziwYXft_K9lP4STXFroJmmKjJcj7ek7ZunwPmeKbF-AGoLqz-qEGvr-bEUI_3m3x-pVkzrVGHVYG6nlZ-fEC4CDoCxsMwx1h19G2b0PI6IB7J8pXGwefwefwef',
    // },
    // {
    //   id: 3,
    //   name: 'NAMA USER',
    //   latitude: -6.179804,
    //   longitude: 106.818006,
    //   device_token:
    //     'fasdxcvvdsvfAPA91bGBMrDziwYXft_K9lP4STXFroJmmKjJcj7ek7ZunwPmeKbF-AGoLqz-qEGvr-bEUI_3m3x-pVkzrVGHVYG6nlZ-fEC4CDoCxsMwx1h19G2b0PI6IB7J8pXGLfsadfasdf',
    // },
  ]);
  function getTeknisi() {
    fetch();
  }

  const [modalVisible, setModalVisible] = useState(false);
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

  async function fetchData() {
    try {
      const response = await api.get('/pembeli/teknisi');
      console.log('response:', response);
      if (response.data.message === 'Data teknisi berhasil diperoleh') {
        const dataTeknisiAll = response.data;
        setDaftarTeknisi(dataTeknisiAll);
      } else {
        console.log('failed to fetch technicans data');
      }
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('error souce code', error.message);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const [productCCTV, setProductCCTV] = useState([
  //   {
  //     name: 'CCTV 2000 FULL HD',
  //     description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
  //     price: 3000000,
  //   },
  //   {
  //     name: 'CCTV 4000 FULL HD',
  //     description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
  //     price: 5000000,
  //   },
  //   {
  //     name: 'CCTV 5000 Crystal Clear',
  //     description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
  //     price: 7000000,
  //   },
  // ]);
  // function getCCTVProducts(id) {
  //   fetch(`http://localhost:3000/product-cctv/${id}`);
  // }

  return (
    <View style={{flex: 1}}>
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
              // setDaftarTeknisi(value);
              // getCCTVProducts(value.id);
              // setSelectedMarker(v);
              // dispatch(SetModal(true));
            }}
            coordinate={{
              latitude: value.latitude,
              longitude: value.longitude,
            }}></Marker>
        ))}
      </MapView>
      <Button title="get current position" onPress={requestAuthGeo} />

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <ScrollView>
          <View>
            <Gap height={30} />
            <View style={styles.viewImgProduct}>
              <Image source={ImgprofilePicture} />
            </View>
            <Text style={styles.textNameTeknisi}>{teknisiDetail.name}</Text>
            <Gap height={20} />

            {role === 'user' && (
              <Text style={styles.textListProduct}>Daftar Product cctv:</Text>
            )}
            {role === 'teknisi' && (
              <Text style={styles.textListProduct}>
                Daftar dan stok product cctv:
              </Text>
            )}
            {role == 'korwil' && (
              <Text style={styles.textListProduct}>
                Masuk ke Applikasi WhatsApp untuk memulai pembelian product ke
                distributor
              </Text>
            )}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewImgProduct: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  textNameTeknisi: {
    color: 'black',
    fontSize: 23,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    top: 10,
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
