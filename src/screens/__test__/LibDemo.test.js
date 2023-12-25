import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import api from '../../services/axiosInstance';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function LibDemo() {
  async function handleProfile() {
    try {
      const response = await api.get('/profile');
      console.log('SUCCESS:', response.data);
    } catch (error) {
      console.log('ERROR:', error.response.data);
    }
  }
  return (
    <View>
      <Text>LibDemo</Text>
      <Button title="get profile" onPress={handleProfile} />
      <Button
        title="set user credential"
        onPress={async () => {
          EncryptedStorage.setItem(
            'user_credential',
            JSON.stringify({
              email: 'distributor@gmail.com',
              password: '4444',
              latitude: '0.005',
              longitude: '0.0004',
            }),
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
