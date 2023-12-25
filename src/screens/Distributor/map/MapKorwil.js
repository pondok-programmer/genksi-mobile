// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Modal,
//   ScrollView,
//   Image,
//   Button,
//   Linking,
//   Pressable,
// } from 'react-native';
// import {Background, ButtonAction, Gap, Styles} from '../../../components';
// import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import api from '../../../services/axiosInstance';
// import {IconProfile} from '../../../assets';

// export default function MapKorwil() {
//   const [dataUserKorwil, setDataUserKorwil] = useState([]);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [modalKorwil, setModalKorwil] = useState(false);
//   const [coords, setCoords] = useState({
//     latitude: -6.175724,
//     longitude: 106.827129,
//   });

//   function requestAuthGeo() {
//     Geolocation.requestAuthorization(
//       () => {
//         Geolocation.getCurrentPosition(
//           ({coords}) => {
//             setCoords(coords);
//             console.log(coords);
//           },
//           error => {
//             console.log(error);
//           },
//         );
//       },
//       error => {
//         console.log('error:', error);
//       },
//     );
//   }

//   // ! Data Korwil
//   async function fecthData() {
//     try {
//       const response = await api.get('/distributor/koordinator-teknisi');
//       setDataUserKorwil(response.data);
//     } catch (error) {
//       if (error.response) {
//         console.log('error from server', error.response.data);
//       } else {
//         console.log('error', error.message);
//       }
//     }
//   }

//   //! handle WhastApp
//   async function handleWhatsApp() {
//     if (selectedMarker) {
//       const {nomor_telepon, latitude, longitude} = selectedMarker;
//       if (nomor_telepon) {
//         const number = nomor_telepon.slice(1, nomor_telepon.length);
//         const googleMapUrl = `https://www.google.com/maps/place/${latitude},${longitude}`;
//         const message = encodeURIComponent(
//           `Haii,perkenalkan saya Eka.%0ABerikut lokasi saya saat ini:%0A%0A${googleMapUrl}`,
//         );

//         await Linking.openURL(`https://wa.me/62${number}?text=${message}`);
//       } else {
//         console.log('Nomor whatsApp tidak tersedia');
//       }
//     } else {
//       // Handle case when no marker is selected
//       console.log('Tidak ada marker yang dipilih.');
//     }
//   }

//   async function onClick(val) {
//     try {
//       setModalKorwil(true);
//       setSelectedMarker(val);
//     } catch (error) {
//       console.log('error mas bro..');
//     }
//   }

//   useEffect(() => {
//     fecthData();
//   }, []);

//   return (
//     <View style={Styles.container}>
//       <MapView
//         showsCompass
//         showsMyLocationButton
//         style={{flex: 1}}
//         provider={PROVIDER_GOOGLE}
//         region={{
//           ...coords,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}>
//         <Marker pinColor="dodgerblue" coordinate={coords}>
//           <Callout>
//             <Text style={{color: 'black'}}>Anda berada disini</Text>
//           </Callout>
//         </Marker>
//         {dataUserKorwil.map((val, ind) => (
//           <Marker
//             key={ind}
//             onPress={() => {
//               onClick(val);
//             }}
//             coordinate={{
//               latitude: parseFloat(val.latitude),
//               longitude: parseFloat(val.longitude),
//             }}></Marker>
//         ))}
//       </MapView>
//       <Button title="get current position" onPress={requestAuthGeo} />

//       {/* Modal */}
//       <Modal
//         visible={modalKorwil}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setModalKorwil(false)}>
//         <View style={styles.viewAlginment}>
//           <Pressable
//             style={styles.modalOverlay}
//             onPress={() => setModalKorwil(false)}
//           />
//           <View style={styles.container}>
//             <View style={{flexDirection: 'row'}}>
//               <View style={styles.viewImgProfile}>
//                 <Image
//                   source={IconProfile}
//                   // set user image to default if uri is invalid
//                   style={{width: '100%', height: '100%'}}
//                 />
//               </View>
//               <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
//                 <Text style={styles.textProfileName} numberOfLines={2}>
//                   {selectedMarker?.nama_lengkap}
//                 </Text>
//                 <Text style={{color: 'black'}}>
//                   {selectedMarker?.koordinator}
//                 </Text>
//                 <Text style={{color: 'black'}}>{selectedMarker?.provinsi}</Text>
//                 <Text numberOfLines={1} style={{color: 'grey'}}>
//                   {selectedMarker?.email}
//                 </Text>
//               </View>
//             </View>
//             <Gap height={20} />
//             {/* <Text>{no_whatsapp.slice(1, no_whatsapp.length)}</Text> */}
//             <ButtonAction
//               title="Hubungi WhatsApp"
//               onPress={handleWhatsApp}
//               iconLeft={'whatsapp'}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   modalOverlay: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'black',
//     opacity: 0.1,
//   },
//   textProfileName: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: 'black',
//   },
//   viewImgProfile: {
//     width: 100,
//     height: 100,
//     borderRadius: 20,
//     elevation: 3,
//     overflow: 'hidden',
//     backgroundColor: 'white',
//   },
//   container: {
//     backgroundColor: 'white',
//     elevation: 5,
//     padding: 20,
//     width: '90%',
//     maxWidth: 520,
//     borderRadius: 20,
//     marginBottom: 20,
//   },
//   viewAlginment: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     flex: 1,
//   },
// });

import {Alert, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

export default function MapKorwil({navigation}) {
  const [coords, setCoords] = useState({
    latitude: -6.175724,
    longitude: 106.827129,
  });

  function getPosition() {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        // console.log('SUCCESS:', coords.latitude, coords.longitude);
        setCoords({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      error => {
        // console.log('ERROR:', error);
        if (error.PERMISSION_DENIED) {
          Alert.alert(
            'Izin Lokasi',
            'Izin lokasi diperlukan. Harap izinkan di pengaturan aplikasi. Setelah diizinkan, harap restart aplikasinya.',
            [
              {text: 'Buka Pengaturan', onPress: () => Linking.openSettings()},
              {text: 'Batal', onPress: () => navigation.goBack()},
            ],
            {cancelable: false},
          );
        }
      },
    );
  }

  useEffect(() => {
    getPosition();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          longitudeDelta: 0.5,
          latitudeDelta: 0.5,
        }}>
        <Marker
          pinColor="dodgerblue"
          coordinate={{latitude: coords.latitude, longitude: coords.longitude}}>
          <Callout>
            <Text style={{color: 'black'}}>Anda berada disini</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({});
