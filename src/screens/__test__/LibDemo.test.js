import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import PushNotification from 'react-native-push-notification';

export default function LibDemo() {
  async function triggerNotification() {
    try {
      const user = await EncryptedStorage.getItem('user');
      const teknisi = await EncryptedStorage.getItem('teknisi');
      PushNotification.localNotification({
        channelId: 'user-channel',
        title: 'My User Notification Title',
        message: 'My User Notification Message',
      });
      PushNotification.localNotification({
        channelId: 'tech-channel',
        title: 'My Tech Notification Title',
        message: 'My Tech Notification Message',
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Button
        title="save role: user"
        onPress={() => {
          EncryptedStorage.setItem('user', 'user');
        }}
      />
      <Button
        title="get role: user"
        onPress={() => {
          EncryptedStorage.getItem('user')
            .then(value => console.log(value))
            .catch(err => console.log(err));
        }}
      />
      <Button
        title="save role: teknisi"
        onPress={() => {
          EncryptedStorage.setItem('teknisi', 'teknisi');
        }}
      />
      <Button
        title="get role: teknisi"
        onPress={() => {
          EncryptedStorage.getItem('teknisi')
            .then(value => console.log(value))
            .catch(err => console.log(err));
        }}
      />
      <Text>LibDemo</Text>
      <Button title="trigger notification" onPress={triggerNotification} />
    </View>
  );
}

const styles = StyleSheet.create({});
