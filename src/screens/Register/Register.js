import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap, Header} from '../../components';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import {Picker} from '@react-native-picker/picker';
import {colors} from '../../utils/constant';
import {useForm} from 'react-hook-form';
import api from '../../services/axiosInstance';

export default function Register({navigation}) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1000);
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm();

  // fect register handle
  async function submitRegister(authRegister) {
    try {
      if (!authRegister.email.includes('@gmail.com')) {
        Alert.alert('Perhatian!', 'Email harus menggunakan @gmail.com');
      } else if (authRegister.password.length < 6) {
        Alert.alert('Perhatian!', 'Kata sandi minimal 6 karakter');
      } else {
        const response = await api.post('/register', {
          name: authRegister.nama,
          email: authRegister.email,
          password: authRegister.password,
        });
        console.log('response', response.data.message);
        console.log('User Details', response.data.user);
        ToastAndroid.show('Berhasil mendaftarkan akun', ToastAndroid.SHORT);
        navigation.goBack();
      }
    } catch (error) {
      if (error.response) {
        console.log('Error', error.response.data);
      } else {
        console.log('error course code', error.message);
      }
    }
  }
  return (
    <View style={{flex: 1}}>
      <Background />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView stickyHeaderHiddenOnScroll>
          <Header title="Register" onPress={() => navigation.goBack()} />
          {ready && (
            <View style={styles.container}>
              <Text style={styles.textContainer}>
                Yuk, daftar untuk memulai berinteraksi!
              </Text>

              <FormInput
                name={'nama'}
                placeholder={'nama'}
                iconName={'account'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                errors={errors}
                control={control}
                setValue={setNama}
              />

              {/* EMAIL */}
              <FormInput
                name={'email'}
                placeholder={'contoh@gmail.com'}
                iconName={'gmail'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                errors={errors}
                control={control}
                setValue={setEmail}
              />

              {/* PASSWORD */}
              <FormInput
                name={'password'}
                placeholder={'Kata sandi..'}
                iconName={'lock'}
                secureTextEntry
                errors={errors}
                control={control}
                setValue={setPassword}
              />

              {/*  DROPDOWN ROUTE */}
              {/* <View style={styles.viewPicker}>
          <Icon name={'routes'} color={'black'} size={25} />
          <Picker
            style={styles.ContentPicker}
            selectedValue={selectRoute}
            mode="dropdown"
            dropdownIconColor={'black'}
            onValueChange={itemValue => setSelectRoute(itemValue)}>
            <Picker.Item
              label="pilih role"
              value="pilih role"
              enabled={false}
            />
            <Picker.Item label="User" value="User" />
            <Picker.Item label="Teknisi" value="Teknisi" />
            <Picker.Item label="Korwil" value="Korwil" />
          </Picker>
        </View> */}

              {/* BUTTON SUBMIT */}
              <View style={{alignItems: 'center'}}>
                <TouchableNativeFeedback useForeground>
                  <ButtonSubmit
                    title="Sign In"
                    onPress={handleSubmit(submitRegister)}
                  />
                </TouchableNativeFeedback>
              </View>

              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text>Sudah punya akun? </Text>
                <Text>Login </Text>
              </View>
            </View>
          )}
        </ScrollView>
        {!ready && <Text style={styles.textLoading}>Memuat formulir...</Text>}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    color: 'black',
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    marginBottom: 20,
    fontWeight: '700',
  },
  textLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'grey',
    flex: 1,
    fontStyle: 'italic',
  },
  textImagePicker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    top: 25,
    color: colors.BLACK,
  },
  iconCamera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    top: -15,
  },
  ContentPicker: {
    flex: 1,
    overflow: 'hidden',
    color: 'black',
  },
  viewPicker: {
    borderWidth: 1,
    borderColor: 'dodgerblue',
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'white',
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    width: '80%',
  },
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
    marginTop: 80,
    alignContent: 'center',
    width: '100%',
    maxWidth: 480,
    padding: 20,
  },
});
