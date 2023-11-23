import {Button, StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function Home() {
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
      name: 'Teknisi Satu',
      latitude: -6.18033,
      longitude: 106.813003,
      device_token:
        'e9GRlVgjSee1teuOlhOXnk:APA91bGBMrDziwYXft_K9lP4STXFroJmmKjJcj7ek7ZunwPmeKbF-AGoLqz-qEGvr-bEUI_3m3x-pVkzrVGHVYG6nlZ-fEC4CDoCxsMwx1h19G2b0PI6IB7J8pXGLgx5XMNAXGjG49q-',
    },
    {
      id: 2,
      name: 'Teknisi Dua',
      latitude: -6.173976,
      longitude: 106.818664,
      device_token:
        'easdfasdfee1teuOlhOwefwefsdfGBMrDziwYXft_K9lP4STXFroJmmKjJcj7ek7ZunwPmeKbF-AGoLqz-qEGvr-bEUI_3m3x-pVkzrVGHVYG6nlZ-fEC4CDoCxsMwx1h19G2b0PI6IB7J8pXGwefwefwef',
    },
    {
      id: 3,
      name: 'Teknisi Tiga',
      latitude: -6.179804,
      longitude: 106.818006,
      device_token:
        'fasdxcvvdsvfAPA91bGBMrDziwYXft_K9lP4STXFroJmmKjJcj7ek7ZunwPmeKbF-AGoLqz-qEGvr-bEUI_3m3x-pVkzrVGHVYG6nlZ-fEC4CDoCxsMwx1h19G2b0PI6IB7J8pXGLfsadfasdf',
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
    },
    {
      name: 'CCTV 4000 FULL HD',
      description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
      price: 5000000,
    },
    {
      name: 'CCTV 5000 Crystal Clear',
      description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
      price: 7000000,
    },
  ]);
  function getCCTVProducts(id) {
    fetch(`http://localhost:3000/product-cctv/${id}`);
  }

  async function beliCCTV(selectedProduct) {
    try {
      const response = axios.post('http://localhost:3000/send-fcm', {
        device_token: teknisiDetail.device_token,
        title: `User Anu Membeli CCTV ${selectedProduct.name}`,
        body: 'Harap periksa ketersediaan produk',
      });
      console.log(response);
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
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View>
          <Icon name={'account'} size={35} color={'black'} />
          <Text style={{color: 'black', fontSize: 23}}>
            Nama Teknisi: {teknisiDetail.name}
          </Text>
          <Text>Daftar cctv:</Text>
          {productCCTV.map((value, index) => {
            return (
              <View
                key={index}
                style={{
                  margin: 20,
                  backgroundColor: 'aqua',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon name={'camera-party-mode'} color={'black'} size={35} />
                  <View>
                    <Text>{value.name}</Text>
                    <Text>{value.description}</Text>
                    <Text>{value.price}</Text>
                  </View>
                </View>
                <Button title="beli" onPress={() => beliCCTV(value)} />
              </View>
            );
          })}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
