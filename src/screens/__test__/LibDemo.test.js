// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {EmptyBackground, Gap, Header, Styles} from '../../components';
// import api from '../../services/axiosInstance';
// import {colors} from '../../utils/constant';

// export default function LibDemo({navigation}) {
//   const [photoTeknisi, setPhotoTeknisi] = useState(null);
//   const [dataTeknisi, setDataTeknisi] = useState({});
//   const [ready, setReady] = useState(false);
//   setTimeout(() => setReady(true), 2000);

//   useEffect(() => {
//     DetailBioTeknisi();
//   }, []);

//   // PRODUCT DETAIL
//   async function DetailBioTeknisi() {
//     try {
//       const response = await api.get('/member/detail-teknisi/11');
//       console.log('product details,', response.data.data);
//       setDataTeknisi(response.data.data);
//       setReady(true);
//     } catch (error) {
//       if (error.response) {
//         console.log('error from server', error.response.data);
//       } else {
//         console.log('Error fecthing product details', error.message);
//       }
//     }
//   }

//   return (
//     <SafeAreaView style={Styles.container}>
//       <EmptyBackground />
//       <Header title="Detail Product" onPress={() => navigation.goBack()} />
//       <View style={styles.ModalContainer}>
//         {!ready ? (
//           <View style={styles.loadingActivityIndicator}>
//             <ActivityIndicator size="large" color="black" />
//             <Gap height={70} />
//             <Text style={styles.textLoading}>Memuat formulir..</Text>
//           </View>
//         ) : (
//           <ScrollView>
//             <View style={styles.viewImgProduct}>
//               {photoTeknisi && photoTeknisi.photo_produk ? (
//                 <Image
//                   source={{
//                     uri: 'https://genksi.ejctechnology.com/photo_produk',
//                   }}
//                   style={{height: '100%', width: '100%'}}
//                 />
//               ) : (
//                 <Icon name="account-circle" size={150} color="grey" />
//               )}
//             </View>
//             <Gap height={20} />
//             <View>
//               <View style={styles.ViewNameTeknisi}>
//                 <Text style={styles.TxtName}> {dataTeknisi?.name}</Text>
//               </View>
//               <Gap height={20} />

//               <View style={styles.ViewNameTeknisi}>
//                 <Text style={styles.TxtName}> {dataTeknisi?.email}</Text>
//               </View>
//               <Gap height={20} />

//               <View style={styles.ViewNameTeknisi}>
//                 <Text style={styles.TxtName}>
//                   {dataTeknisi?.profile.nomor_telepon}
//                 </Text>
//               </View>
//             </View>
//           </ScrollView>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   TxtName: {
//     color: colors.BLACK,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   ViewNameTeknisi: {
//     justifyContent: 'center',
//     height: 40,
//     width: 240,
//     backgroundColor: colors.WHITE,
//     borderWidth: 0.6,
//     borderRadius: 5,
//     padding: 10,
//   },
//   loadingActivityIndicator: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ModalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   textLoading: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     color: colors.GREY,
//     flex: 1,
//     fontStyle: 'italic',
//   },
//   viewImgProduct: {
//     alignSelf: 'center',
//     backgroundColor: colors.WHITE,
//     height: 150,
//     width: 150,
//     borderRadius: 50,
//     overflow: 'hidden',
//     elevation: 4,
//     borderWidth: 0.5,
//   },
// });

// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {EmptyBackground, Header, Styles} from '../../components';
// import api from '../../services/axiosInstance';
// import {colors} from '../../utils/constant';

// export default function LibDemo({navigation}) {
//   const [photoTeknisi, setPhotoTeknisi] = useState(null);
//   const [dataTeknisi, setDataTeknisi] = useState({});
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     DetailBioTeknisi();
//   }, []);

//   // PRODUCT DETAIL
//   async function DetailBioTeknisi() {
//     try {
//       const response = await api.get('/member/detail-teknisi/11');
//       setDataTeknisi(response.data.data);
//       setReady(true);
//     } catch (error) {
//       if (error.response) {
//         console.log('error from server', error.response.data);
//       } else {
//         console.log('Error fetching product details', error.message);
//       }
//     }
//   }

//   return (
//     <SafeAreaView style={Styles.container}>
//       <EmptyBackground />
//       <Header title="Detail Product" onPress={() => navigation.goBack()} />
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.profileContainer}>
//           <View style={styles.profileImageContainer}>
//             {ready ? (
//               <Image
//                 source={
//                   photoTeknisi && photoTeknisi.photo_produk
//                     ? {uri: 'https://genksi.ejctechnology.com/photo_produk'}
//                     : require('../../assets/images/profilePicture.png')
//                 }
//                 style={styles.profileImage}
//               />
//             ) : (
//               <ActivityIndicator size="large" color={colors.PRIMARY} />
//             )}
//           </View>
//           <Text style={styles.profileName}>{dataTeknisi.name}</Text>
//         </View>
//         <View style={styles.detailContainer}>
//           <View style={styles.detailItem}>
//             <Text style={styles.detailLabel}>Email:</Text>
//             <Text style={styles.detailValue}>{dataTeknisi.email}</Text>
//           </View>
//           <View style={styles.detailItem}>
//             <Text style={styles.detailLabel}>Nomor Telepon:</Text>
//             <Text style={styles.detailValue}>
//               {dataTeknisi.profile && dataTeknisi.profile.nomor_telepon}
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     marginTop: 80,
//     alignItems: 'center',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImageContainer: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     overflow: 'hidden',
//     marginBottom: 10,
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//   },
//   profileName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: colors.BLACK,
//   },
//   detailContainer: {
//     width: '80%',
//   },
//   detailItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: colors.DARKGRAY,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: colors.BLACK,
//   },
// });

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function LibDemo() {
  return (
    <View>
      <Text>LibDemo.test</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
