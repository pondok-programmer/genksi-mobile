import messaging from '@react-native-firebase/messaging';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function FCMdemo() {
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
        'eRbj4648T0aDGQQsvmF9dw:APA91bH7iLMMGj6w-tvpXjgIZPpGwC5jAMp8fz0eRq5AnolnqH41Vrkfu59WCylKFepjpU-T1pUKyDoIU6PkOSfenfvxFCoqIlomrpy2DkDvEkskW7tCOP3j3i8s9qqnvRijGcBMhhgz',
    };

    await messaging().sendMessage({});
  }

  return (
    <View style={{marginTop: 50}}>
      <Text>LibDemo</Text>
      <Button
        title="kirim notifikasi ke Oppo"
        onPress={sendNotificationtoSamsung}
      />
      <Button
        title="get fcm token Oppo"
        onPress={async () => {
          try {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            console.log('the token Oppo:', token);
          } catch (error) {
            console.log('the error:', error.message);
          }
        }}
      />
      <Button
        title="send notification to Infinix"
        onPress={sendNotificationtoInfinix}
      />
      <Button
        title="get fcm token infinix"
        onPress={async () => {
          try {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            console.log('the token Infinix:', token);
          } catch (error) {
            console.log('the error:', error.message);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
