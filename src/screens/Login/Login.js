import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Background, Gap} from '../../components';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import api from '../../services/axiosInstance';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const {
    control,
    fromState: {errors},
    handlesubmit,
  } = useFrom();

  const validateEmail = () => {
    setEmailError(!email);
  };

  const validatePassword = () => {
    setPasswordError(!password);
  };

  async function handleLogin() {
    var formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://genksi.ejctechnology.com/api/login', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log('error', error.message);
      });
  }

  // const submitLogin = async () => {
  //   if (!email || !password) {
  //     console.log('Email atau password kosong');
  //     setEmailError(!email);
  //     setPasswordError(!password);
  //     ToastAndroid.show('email dan password harus diisi.', ToastAndroid.SHORT);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       'https://genksi.ejctechnology.com/api/login',
  //       JSON.stringify({
  //         email,
  //         password,
  //         latitude,
  //         longitude,
  //       }),
  //     );
  //     console.log('response', response);

  // if (response.data.authorization && response.data.user) {
  //   // Jika autentikasi berhasil
  //   navigation.navigate('Home');
  //   ToastAndroid.show('Selamat datang', ToastAndroid.LONG);
  // } else {
  //   // Jika autentikasi gagal
  //   ToastAndroid.show('Email atau password salah!', ToastAndroid.LONG);
  // }
  // } catch (error) {
  //     if (error.response) {
  //       // Handle error responses from the server
  //       console.log('Error ', error.response.data);
  //       ToastAndroid.show('Terjadi kesalahan dari server', ToastAndroid.LONG);
  //     } else {
  //       // Handle other types of errors
  //       console.log('error cource code', error.message);
  //       ToastAndroid.show('Terjadi kesalahan', ToastAndroid.LONG);
  //     }
  //   }
  // };

  const emailErrorMessage = emailError ? 'email wajib diisi' : '';
  const passwordErrorMessage = passwordError ? 'password wajib diisi' : '';

  useEffect(() => {
    getLocation();
  }, []);

  // Fungsi untuk mendapatkan data geolokasi
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
      },
      error => {
        console.log(error.message);
        ToastAndroid.show('Gagal mengambil lokasi', ToastAndroid.LONG);
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.container}>
        {/* text login */}
        <View style={{alignItems: 'center'}}>
          <Text style={styles.textTitle}>Login</Text>
        </View>
        <View style={{height: 20}} />

        {/* textInput email dan text warning email */}
        <Text style={{color: 'red', textAlign: 'left', marginLeft: 40}}>
          {emailErrorMessage}
        </Text>
        <View style={{alignItems: 'center'}}>
          <FormInput
            onChangeText={text => {
              setEmail(text);
              setEmailError(false);
            }}
            placeholder="contoh@email.com"
            autoCapitalize={'none'}
            errors={errors}
            control={control}
          />
        </View>
        <View style={{height: 15}} />

        {/* textInput password dan text warning password */}
        <Text style={{color: 'red', textAlign: 'left', marginLeft: 40}}>
          {passwordErrorMessage}
        </Text>
        <View style={{alignItems: 'center'}}>
          <FormInput
            onChangeText={text => {
              setPassword(text);
              setPasswordError(false);
            }}
            password
            placeholder="password123"
            iconName="lock"
            autoCapitalize={'none'}
            onBlur={validateEmail}
            control={control}
            errors={errors}
          />
        </View>
        <Gap height={20} />

        {/* button masuk */}
        <View style={{alignItems: 'center'}}>
          <ButtonSubmit title="Masuk" onPress={handlesubmit(handleLogin)} />
          <Gap height={10} />
        </View>

        {/* button Register */}
        <View style={{alignItems: 'center'}}>
          <ButtonSubmit
            title="Daftar"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
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
    flex: 1,
    width: '100%',
    maxWidth: 480,
    justifyContent: 'center',
  },
});
