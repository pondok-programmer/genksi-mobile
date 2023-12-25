import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import api from '../../../services/axiosInstance';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {ButtonAction, Gap, Styles} from '../../../components';
import {IconProfile} from '../../../assets';

export default function MapMember() {
  const [dataMember, setDataMember] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [coords, setCoords] = useState({
    latitude: -6.175724,
    longitude: 106.827129,
  });

  function requestAuthGeo() {
    Geolocation.requestAuthorization(
      () => {
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

  async function handleMember() {
    try {
      const response = await api.get('/distributor/member');
      // console.log('data teknisi', response.data);
      setDataMember(response.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('error', error.message);
      }
    }
  }

  async function onClick(val) {
    try {
      setModalVisible(true);
      setSelectedMarker(val);
    } catch (error) {
      console.log('error mas bro..');
    }
  }

  useEffect(() => {
    handleMember();
  }, []);

  //! handle WhastApp
  async function handleWhatsApp() {
    if (selectedMarker) {
      const {nomor_whatsapp, latitude, longitude} = selectedMarker;
      if (nomor_whatsapp) {
        const number = nomor_whatsapp.slice(1, nomor_whatsapp.length);
        const googleMapUrl = `https://www.google.com/maps/place/${latitude},${longitude}`;
        const message = encodeURIComponent(
          `Haii,perkenalkan saya Eka.%0ABerikut lokasi saya saat ini:%0A%0A${googleMapUrl}`,
        );

        await Linking.openURL(`https://wa.me/62${number}?text=${message}`);
      } else {
        console.log('Nomor whatsApp tidak tersedia');
      }
    } else {
      // Handle case when no marker is selected
      console.log('Tidak ada marker yang dipilih.');
    }
  }

  return (
    <View style={Styles.container}>
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
        {dataMember.map((val, ind) => (
          <Marker
            key={ind}
            onPress={() => {
              onClick(val);
            }}
            coordinate={{
              latitude: parseFloat(val.latitude),
              longitude: parseFloat(val.longitude),
            }}></Marker>
        ))}
      </MapView>
      <Button title="get current position" onPress={requestAuthGeo} />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.viewAlginment}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.viewImgProfile}>
                <Image
                  source={IconProfile}
                  // set user image to default if uri is invalid
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                <Text style={styles.textProfileName} numberOfLines={2}>
                  {selectedMarker?.name}
                </Text>
                <Text style={{color: 'black'}}>
                  {selectedMarker?.profile.alamat}
                </Text>
                <Text numberOfLines={1} style={{color: 'grey'}}>
                  {selectedMarker?.email}
                </Text>
              </View>
            </View>
            <Gap height={20} />
            {/* <Text>{no_whatsapp.slice(1, no_whatsapp.length)}</Text> */}
            <ButtonAction
              title="Hubungi WhatsApp"
              onPress={handleWhatsApp}
              iconLeft={'whatsapp'}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.1,
  },
  textProfileName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  viewImgProfile: {
    width: 100,
    height: 100,
    borderRadius: 20,
    elevation: 3,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    width: '90%',
    maxWidth: 520,
    borderRadius: 20,
    marginBottom: 20,
  },
  viewAlginment: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
});
