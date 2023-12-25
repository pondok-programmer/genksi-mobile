// import {
//   Button,
//   StyleSheet,
//   Text,
//   View,
//   Modal,
//   Image,
//   ScrollView,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import axios from 'axios';
// import {ImgprofilePicture} from '../../assets';
// import {Gap} from '../../components';
// import {colors} from '../../utils/constant';
// import api from '../../services/axiosInstance';

// export default function Home() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [daftarTeknisi, setDaftarTeknisi] = useState([]);
//   const [coords, setCoords] = useState({
//     latitude: -6.175724,
//     longitude: 106.827129,
//   });
//   function requestAuthGeo() {
//     Geolocation.requestAuthorization(
//       () => {
//         console.log('success');
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

//   const [teknisiDetail, setTeknisiDetail] = useState({
//     id: null,
//     name: '',
//     email: '',
//     latitude: '',
//     longitude: '',
//     profile: {
//       id_user: null,
//       nama_lengkap: '',
//       nomor_telepon: '',
//     },
//   });

//   const [productCctv, setProductCctv] = useState([
//     {
//       nama_teknisi: '',
//       kategori: '',
//       nama_produk: '',
//       merk: '',
//       tipe: '',
//       resolusi: '',
//       harga: '',
//       jumlah_stok_produk_teknisi: null,
//     },
//     // {
//     //   name: 'CCTV 2000 FULL HD',
//     //   description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
//     //   price: 3000000,
//     //   stok: 29,
//     // },
//     // {
//     //   name: 'CCTV 4000 FULL HD',
//     //   description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
//     //   price: 5000000,
//     //   stok: 30,
//     // },
//     // {
//     //   name: 'CCTV 5000 Crystal Clear',
//     //   description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
//     //   price: 7000000,
//     //   stok: 79,
//     // },
//   ]);

//   // Data teknisi
//   async function fetchData() {
//     try {
//       const response = await api.get('/pembeli/teknisi');
//       console.log('success');
//       setDaftarTeknisi(response.data.data);
//     } catch (error) {
//       if (error.response) {
//         console.log('error from server', error.response.data);
//       } else {
//         console.log('error souce code', error.message);
//       }
//     }
//   }

//   // contoh pengunaan fecth data
//   async function beliCCTV(selectedProduct) {
//     try {
//       const response = axios.post('http://localhost:3000/send-fcm', {
//         device_token: teknisiDetail.device_token,
//         title: `User Anu Membeli CCTV ${selectedProduct.name}`,
//         body: 'Harap periksa ketersediaan produk',
//       });
//       console.log(response);
//     } catch (error) {
//       if (error.message) {
//         console.log('error from server', error.response.data);
//       } else {
//         console.log('error', error.message);
//       }
//     }
//   }

//   const [daftarProduct, setDaftarProduct] = useState([]);
//   async function dataProductCctv() {
//     try {
//       const response = await api.get('/pembeli/produk-teknisi/3');
//       console.log('tes');
//       setDaftarProduct(response.data.data);
//     } catch (error) {
//       if (error.response) {
//         console.log('error from server', error.response.data);
//       } else {
//         console.log('error', error.message);
//       }
//     }
//   }

//   useEffect(() => {
//     fetchData();
//     dataProductCctv();
//     // console.log(daftarTeknisi.map(val => val.longitude));
//     // console.log(parseFloat('110.3898173'));
//   }, []);

//   return (
//     <View style={{flex: 1}}>
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
//         {daftarTeknisi.map((value, index) => (
//           <Marker
//             key={index}
//             onPress={() => {
//               setModalVisible(true);
//               setTeknisiDetail(value);
//               console.log(value);
//               setProductCctv(value);
//               // setDaftarTeknisi(value);
//               // getCCTVProducts(value.id);
//               // setSelectedMarker(v);
//               // dispatch(SetModal(true));
//             }}
//             coordinate={{
//               latitude: parseFloat(value.latitude),
//               longitude: parseFloat(value.longitude),
//             }}></Marker>
//         ))}
//       </MapView>
//       <Button title="get current position" onPress={requestAuthGeo} />

//       {/* MODAL */}
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={() => setModalVisible(false)}>
//         <ScrollView>
//           <View>
//             <Gap height={20} />
//             <View style={styles.viewImgProduct}>
//               <Image source={ImgprofilePicture} />
//             </View>
//             <Text style={styles.textNameTeknisi}>{teknisiDetail.name}</Text>
//             <Gap height={10} />
//             <Text style={styles.textListProduct}>Daftar Cctv:</Text>
//             {productCctv.map((value, index) => {
//               return (
//                 <View key={index} style={styles.modalProduct}>
//                   <Text style={styles.textListProduct}>
//                     Nama cctv: {value.nama_produk}
//                   </Text>
//                   <Text style={styles.textListProduct}>merk: {value.merk}</Text>
//                   <Text style={styles.textListProduct}>tipe: {value.tipe}</Text>
//                   <Text style={styles.textListProduct}>
//                     resolusi: {value.resolusi}
//                   </Text>
//                   <Text style={styles.textListProduct}>
//                     harga: {value.harga}
//                   </Text>
//                   <Text style={styles.textListProduct}>
//                     stok product cctv: {value.jumlah_stok_produk_teknisi}
//                   </Text>
//                   <Gap height={10} />
//                   <View style={{marginHorizontal: 30}}>
//                     <Button title="HUBUNGI WHATSAPP" color={'green'} />
//                   </View>
//                 </View>
//               );
//             })}
//           </View>
//         </ScrollView>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   modalProduct: {
//     elevation: 20,
//     backgroundColor: colors.WHITE,
//     height: 210,
//     maxWidth: 400,
//     margin: 15,
//     borderRadius: 10,
//   },
//   viewImgProduct: {
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   textNameTeknisi: {
//     color: 'black',
//     fontSize: 19,
//     fontFamily: 'Poppins-Medium',
//     textAlign: 'center',
//   },
//   textListProduct: {
//     color: 'black',
//     fontSize: 19,
//     marginHorizontal: 20,
//     fontFamily: 'Poppins-Medium',
//   },
//   viewContainer: {
//     margin: 17,
//     backgroundColor: colors.WHITE,
//     borderRadius: 15,
//     elevation: 30,
//   },
//   ViewContentProductCctv: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 10,
//   },
//   viewTextDatasProduct: {
//     marginHorizontal: 10,
//   },
//   textProduct: {
//     marginVertical: 3,
//     color: 'black',
//     maxWidth: 200,
//   },
//   textProductTitleProduct: {
//     color: 'black',
//     maxWidth: 200,
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 18,
//   },
// });

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
