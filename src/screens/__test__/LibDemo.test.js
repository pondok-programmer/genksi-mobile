// import {Button, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import messaging from '@react-native-firebase/messaging';

// export default function LibDemo() {
//   async function sendNotificationtoAquos() {
//     const message = {
//       data: {
//         title: 'Hello',
//         body: 'World',
//       },
//       token: 'the-token',
//     };

//     await messaging().sendMessage(message);
//   }

//   async function sendNotificationtoSamsung() {
//     const message = {
//       data: {
//         title: 'Hello',
//         body: 'World',
//       },
//       token:
//         'dxOTqgrDTuGRaJ6Lu1Lkk7:APA91bHdV8w17lzcHcHZdsaGS3Y7aHpKlZOurxYqVRHQKZfDMZrGMPixuaWVth_9T-YfcgJ0Ep1f9Z3KJw35U4EQ17SR2iAnQVwFLf46TfPljiuqc6JC5eZ3s8_uDZG10CObLHck-gna',
//     };

//     await messaging().sendMessage({});
//   }

//   return (
//     <View style={{marginTop: 50}}>
//       <Text>LibDemo</Text>
//       <Button title="kirim notifikasi ke samsung" onPress={null} />
//       <Button
//         title="get fcm token samsung"
//         onPress={async () => {
//           try {
//             await messaging().registerDeviceForRemoteMessages();
//             const token = await messaging().getToken();
//             console.log('the token samsung:', token);
//           } catch (error) {
//             console.log('the error:', error.message);
//           }
//         }}
//       />
//       <Button
//         title="send notification to aquos"
//         onPress={sendNotificationtoAquos}
//       />
//       <Button
//         title="get fcm token aquos"
//         onPress={async () => {
//           try {
//             await messaging().registerDeviceForRemoteMessages();
//             const token = await messaging().getToken();
//             console.log('the token aquos:', token);
//           } catch (error) {
//             console.log('the error:', error.message);
//           }
//         }}
//       />
//       <Button
//         title="Get fcm token Infinix"
//         onPress={async () => {
//           try {
//             await messaging().registerDeviceForRemoteMessages();
//             const token = await messaging().getToken();
//             console.log('the token infinix', token);
//           } catch (err) {
//             console.log('error bro..', err.message);
//           }
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

// ! CONTOH MENGUNAKAN REDUX
import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export default function LibDemo() {
  const demo = useSelector(state => state.demo);
  console.log(demo);

  return (
    <View>
      <Text>LibDemo</Text>
    </View>
  );
}
