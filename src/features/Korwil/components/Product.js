import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {Gap} from '../../../components';
import {ImgprofilePicture} from '../../../assets';
import {colors} from '../../../utils/constant';
import {ButtonSubmit} from '../../Auth';
import {useNavigation} from '@react-navigation/native';

export default function Product() {
  const navigation = useNavigation();
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
    {
      id: 1,
      name: 'EKA SAPUTRA',
      latitude: -6.1740533,
      longitude: 106.8212586,
      device_token:
        'd05UEbhsRQSvPCKqRj46Pv:APA91bFUe9nMkvtGLDiknVRHnd0MfnIm9nC1hjv8TmRCCHCXRG2eAdyeB2ly9KW8Lu7ZQdcTnLbXHNNnlnlU8PS6CWh0uUi4msma289Zgw8L8PbTZYUw-qrp1m6F93ADLnlN8gmNbwg0',
    },
  ]);
  function getTeknisi() {
    fetch();
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [teknisiDetail, setTeknisiDetail] = useState({
    id: null,
    name: '',
    device_token: '',
  });

  const [productCCTV, setProductCCTV] = useState([
    {
      name: 'CCTV 2000 FULL HD',
      description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
      price: 3000000,
      stok: '10 Pics',
    },
    {
      name: 'CCTV 4000 FULL HD',
      description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
      price: 5000000,
      stok: '20 Pics',
    },
    {
      name: 'CCTV 5000 Crystal Clear',
      description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
      price: 7000000,
      stok: '30 Pics',
    },
  ]);
  function getCCTVProducts(id) {
    fetch(`http://localhost:3000/product-cctv/${id}`);
  }

  async function beliCCTV(selectedProduct) {
    try {
      navigation.navigate('Product');
      // const response = axios.post('http://localhost:3000/send-fcm', {
      //   device_token: teknisiDetail.device_token,
      //   title: `Teknisi Rafi Membeli CCTV ${selectedProduct.name}`,
      //   body: 'Harap periksa ketersediaan produk',
      // });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

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
            <Text style={styles.textListProduct}> Product cctv:</Text>
            {/* <View style={styles.viewContainer}>
              <View style={styles.ViewContentProductCctv}>
                <Text style={styles.textProduct}>
                  Masuk ke Applikasi WhatsApp untuk memulai pembelian product ke
                  distributor
                </Text>
                <ButtonSubmit title="Beli" />
              </View>
            </View> */}
            {productCCTV.map((value, index) => {
              return (
                <View key={index} style={styles.viewContainer}>
                  <View style={styles.ViewContentProductCctv}>
                    <Image source={ImgprofilePicture} />
                    <View style={styles.viewTextDatasProduct}>
                      <Text style={styles.textProductTitleProduct}>
                        {value.name}
                      </Text>
                      <Text style={styles.textProduct}>
                        {value.description}
                      </Text>
                      <Text style={styles.textProduct}>
                        Harga: {value.price}
                      </Text>
                      <Text style={styles.textProduct}>STOK: {value.stok}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 80,
                      marginBottom: 10,
                    }}>
                    <Button
                      title="beli"
                      onPress={() => beliCCTV(value)}
                      color={'green'}
                    />
                  </View>
                </View>
              );
            })}
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
    elevation: 15,
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
