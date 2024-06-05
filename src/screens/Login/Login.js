import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {Background, Gap} from '../../components';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import {setLoading, setName} from '../../features/Auth/services/authSlice';
import api from '../../services/axiosInstance';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();

  async function submitLogin(authLogin) {
    const {email, password} = authLogin;
    const formData = {...authLogin, latitude: '0.0235', longitude: '-023233'};
    console.log('Login', formData);

    try {
      setIsLoading(true);
      dispatch(setLoading('pending'));

      const response = await api.post('/login', formData);

      await EncryptedStorage.setItem(
        'user_credential',
        JSON.stringify(formData),
      );

      // console.log('response', response.data);
      dispatch(setName(response.data.user.name));
      await EncryptedStorage.setItem(
        'token',
        response.data.authorization.token,
      );

      if (response.data.message.includes('koordinator_teknisi')) {
        await EncryptedStorage.setItem('userRole', 'koordinator_teknisi');
        navigation.replace('BottomTopKoortek');
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else if (response.data.message.includes('member')) {
        await EncryptedStorage.setItem('userRole', 'member');
        navigation.replace('MainNavigator');
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else if (response.data.message.includes('distributor')) {
        await EncryptedStorage.setItem('userRole', 'distributor');
        navigation.replace('DistributorHome');
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else if (response.data.message.includes('teknisi')) {
        await EncryptedStorage.setItem('userRole', 'teknisi');
        navigation.replace('BottomTopTeknisi');
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        navigation.replace('Login');
      }

      setIsLoading(false);
      dispatch(setLoading('pending'));
    } catch (error) {
      setIsLoading(false);
      dispatch(setLoading('pending'));

      if (error.response) {
        console.log('Error ', error.response.data);
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
      } else {
        console.log('error cource code', error.message);
        ToastAndroid.show('Maaf Sedang Terjadi kesalahan', ToastAndroid.LONG);
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
          <ButtonSubmit
            title="Masuk"
            disabled={isLoading}
            loading={isLoading}
            onPress={handleSubmit(submitLogin)}
          />
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
