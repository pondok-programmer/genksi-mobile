import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap} from '../../components';
import {FormInput} from '../../features/Auth';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submitLogin() {
    console.log({email, password});
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
        <TouchableNativeFeedback onPress={submitLogin} useForeground>
          <View style={styles.btnSubmit}>
            <Text style={styles.textBtnSubmit}>Masuk</Text>
          </View>
        </TouchableNativeFeedback>
        <Gap height={10} />
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('Register')}
          useForeground>
          <View style={styles.btnRegister}>
            <Text style={styles.textBtnSubmit}>Daftar</Text>
          </View>
        </TouchableNativeFeedback>
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
