import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React from 'react';
import {Background, Gap} from '../../components';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import api from '../../services/axiosInstance';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {setName} from '../../features/Auth/services/authSlice';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  // async function submitLogin(authLogin) {
  //   const {email, password} = authLogin;
  //   console.log('Login', {
  //     ...authLogin,
  //     latitude: '0.0235',
  //     longitude: '-023233',
  //   });
  //   if (!email.includes('@gmail.com')) {
  //     Alert.alert('Perhatian!', 'Email harus menggunakan @gmail.com');
  //   } else if (password.length < 6) {
  //     Alert.alert('Perhatian!', 'Kata sandi minimal 6 karakter');
  //   } else {
  //     try {
  //       const response = await api.post('/login', {
  //         ...authLogin,
  //         latitude: '0.0235',
  //         longitude: '-023233',
  //       });
  //       console.log('response', response.data);
  //       await EncryptedStorage.setItem(
  //         'token',
  //         response.data.authorization.token,
  //       );
  //       if (response.data.message) {
  //         // Jika respons menyertakan pesan peran
  //         // Alert.alert('Peran', response.data.message);

  //         if (response.data.message.includes('teknisi')) {
  //           // Navigasi ke layar Teknisi jika peran adalah Teknisi
  //           navigation.navigate('TeknisiScreen');
  //         } else if (response.data.message.includes('member')) {
  //           // Navigasi ke layar Home jika peran adalah Member
  //           navigation.navigate('Home');
  //           ToastAndroid.show('Selamat datang', ToastAndroid.SHORT);
  //         }
  //       } else {
  //         // Lakukan navigasi ke layar default jika tidak ada pesan peran
  //         navigation.navigate('Home');
  //         ToastAndroid.show('Selamat datang', ToastAndroid.SHORT);
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         // Handle error responses from the server
  //         console.log('Error ', error.response.data);
  //         ToastAndroid.show('Terjadi kesalahan dari server', ToastAndroid.LONG);
  //       } else {
  //         // Handle other types of errors
  //         console.log('error cource code', error.message);
  //         ToastAndroid.show('Terjadi kesalahan', ToastAndroid.LONG);
  //       }
  //     }
  //   }
  // }

  async function submitLogin(authLogin) {
    const {email, password} = authLogin;
    console.log('Login', {
      ...authLogin,
      latitude: '0.0235',
      longitude: '-023233',
    });

    try {
      const response = await api.post('/login', {
        ...authLogin,
        latitude: '0.0235',
        longitude: '-023233',
      });
      console.log('response', response.data);
      dispatch(setName(response.data.user.name));
      // dispatch(setToken(response.data.authorization.token));
      await EncryptedStorage.setItem(
        'token',
        response.data.authorization.token,
      );

      if (response.data.message.includes('teknisi')) {
        await EncryptedStorage.setItem('userRole', 'teknisi');
        navigation.navigate('Teknisi');
        ToastAndroid.show('Selamat datang', ToastAndroid.SHORT);
      } else if (response.data.message.includes('member')) {
        await EncryptedStorage.setItem('userRole', 'member');
        navigation.navigate('Home');
        ToastAndroid.show('Selamat datang', ToastAndroid.SHORT);
      } else {
        navigation.navigate('Home');
        ToastAndroid.show('Selamat datang', ToastAndroid.SHORT);
      }
    } catch (error) {
      if (error.response) {
        console.log('Error ', error.response.data);
        ToastAndroid.show(
          'Perhatian email dan password anda ',
          ToastAndroid.LONG,
        );
      } else {
        console.log('error cource code', error.message);
        ToastAndroid.show('Perhatian internet anda', ToastAndroid.LONG);
      }
    }
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.textTitle}>Login</Text>
        </View>
        <View style={{height: 21}} />

        <FormInput
          name={'email'}
          placeholder={'contoh@gmail.com'}
          iconName={'gmail'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          errors={errors}
          control={control}
        />

        <FormInput
          name={'password'}
          placeholder={'Kata sandi..'}
          iconName={'lock'}
          secureTextEntry
          errors={errors}
          control={control}
        />
        <Gap height={20} />

        <TouchableNativeFeedback useForeground>
          <ButtonSubmit title="Masuk" onPress={handleSubmit(submitLogin)} />
        </TouchableNativeFeedback>
        <Gap height={15} />

        <TouchableNativeFeedback useForeground>
          <ButtonSubmit
            title="Daftar"
            onPress={() => navigation.navigate('Register')}
          />
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
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
