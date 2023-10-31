import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Background} from '../../components';
import {FormInput} from '../../features/Auth';

export default function Login() {
  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.container}>
        <Text style={styles.textTitle}>Login</Text>
        <FormInput />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
