import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap} from '../../components';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import api from '../../services/axiosInstance';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submitLogin() {
    try {
      const response = await api.post('/register', {email, password});
      console.log(response);
    } catch (error) {
      if (error.response) {
        console.log('Error ', error.response.data);
      } else {
        console.log('error', error.message);
      }
    }
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.container}>
        <Text style={styles.textTitle}>Login</Text>
        <View style={{height: 20}} />
        <FormInput
          onChangeText={setEmail}
          placeholder="contoh@email.com"
          autoCapitalize={'none'}
        />
        <View style={{height: 15}} />
        <FormInput
          onChangeText={setPassword}
          password
          iconName="lock"
          autoCapitalize={'none'}
        />
        <Gap height={20} />
        <ButtonSubmit
          title="Masuk"
          onPress={() => navigation.navigate('Home')}
        />
        <Gap height={10} />
        <ButtonSubmit
          title="Daftar"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnSubmit: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnRegister: {
    backgroundColor: '#006bd6',
    width: 180,
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  btnSubmit: {
    backgroundColor: 'dodgerblue',
    width: 275,
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
});
