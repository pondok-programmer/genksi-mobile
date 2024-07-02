import messaging from '@react-native-firebase/messaging';
import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';

export default function LibDemo() {
  async function sendNotificationtoInfinix() {
    const message = {
      data: {
        title: 'Hello',
        body: 'World',
      },
      token: 'the-token',
    };

    await messaging().sendMessage(message);
  }

  async function sendNotificationtoSamsung() {
    const message = {
      data: {
        title: 'Hello',
        body: 'World',
      },
      token:
        'dxOTqgrDTuGRaJ6Lu1Lkk7:APA91bHdV8w17lzcHcHZdsaGS3Y7aHpKlZOurxYqVRHQKZfDMZrGMPixuaWVth_9T-YfcgJ0Ep1f9Z3KJw35U4EQ17SR2iAnQVwFLf46TfPljiuqc6JC5eZ3s8_uDZG10CObLHck-gna',
    };

    await messaging().sendMessage({});
  }

  const test = () => {
    Alert.alert('ini pusNotif');
  };
  return (
    <View style={{marginTop: 50}}>
      <Text>LibDemo</Text>
      <Button title="kirim notifikasi ke samsung" onPress={null} />
      <Button
        title="get fcm token samsung"
        onPress={async () => {
          try {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            console.log('the token samsung:', token);
          } catch (error) {
            console.log('the error:', error.message);
          }
        }}
      />
      <Button
        title="send notification to infinix"
        onPress={sendNotificationtoInfinix}
      />
      <Button
        title="get fcm token infinix"
        onPress={async () => {
          try {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            console.log('the token infinix:', token);
          } catch (error) {
            console.log('the error:', error.message);
          }
        }}
      />

      <Button title="pusnotif" onPress={test} />
    </View>
  );
}

const styles = StyleSheet.create({});
