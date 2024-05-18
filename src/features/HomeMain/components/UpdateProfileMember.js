import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {ButtonAction, EmptyBackground, Gap, Header} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';
import {FormInput} from '../../Auth';
import {setLoading} from '../../Auth/services/authSlice';

export default function UpdateProfileMember({navigation}) {
  const [selectedImageCamera, setSelectedImageCamera] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm();

  const dispatch = useDispatch();

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('Batal memilih gambar');
    } else if (response.error) {
      console.log('Error:', response.error);
    } else {
      const {fileName: name, uri, type} = response.assets[0];
      setSelectedImageCamera({uri, name, type});
    }
  };

  const handleImagePicker = async () => {
    const imagePicker = source => {
      const options = {
        title: 'Pilih Gambar',
        cancelButtonTitle: 'Batal',
        takePhotoButtonTitle: 'Ambil Gambar dari Kamera',
        chooseFromLibraryButtonTitle: 'Pilih Gambar dari Galeri',
        quality: 0.2,
      };
      if (source === 'camera') {
        launchCamera(options, handleImageResponse);
      } else if (source === 'gallery') {
        launchImageLibrary(options, handleImageResponse);
      }
    };

    const permissionCamera = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) imagePicker('camera');
    };

    Alert.alert(
      '',
      'Ambil gambar dari...',
      [
        {text: 'Kamera', onPress: permissionCamera},
        {text: 'Galeri', onPress: () => imagePicker('gallery')},
      ],
      {cancelable: true},
    );
  };

  const fetchUpdateProfile = async data => {
    try {
      setIsLoading(true);
      dispatch(setLoading('pending'));

      // Check if selectedImageCamera is not null and the file type is jpg, png, or jpeg
      if (
        selectedImageCamera &&
        !['jpg', 'png', 'jpeg'].includes(selectedImageCamera.type.split('/')[1])
      ) {
        ToastAndroid.show(
          'Photo profile harus berupa file dengan tipe: jpg, png, atau jpeg.',
          ToastAndroid.LONG,
        );
        setIsLoading(false);
        return;
      }

      const requestBody = {
        nama_lengkap: data.nama_lengkap,
        nomor_telepon: data.nomor_telepon,
        provinsi: data.provinsi,
        kabupaten: data.kabupaten,
        alamat: data.alamat,
        photo_profile: selectedImageCamera ? selectedImageCamera.uri : null,
      };

      const response = await api.put(
        '/member/update-profile?_method=put',
        requestBody,
      );

      ToastAndroid.show(response.data.message, ToastAndroid.LONG);
      setIsLoading(false);
      dispatch(setLoading('idle'));
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      dispatch(setLoading('idle'));
      if (error.response) {
        console.log('Error:', error.response.data);
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG);
      } else {
        console.log('Error:', error.message);
        ToastAndroid.show('Terjadi kesalahan', ToastAndroid.LONG);
      }
    }
  };

  const onSubmit = data => {
    confirmUpdateProfile(data);
  };

  const confirmUpdateProfile = data => {
    Alert.alert(
      'Peringatan!!',
      'Apakah anda ingin update data pribadi?',
      [
        {text: 'Tidak', onPress: () => console.log('Batal update profile')},
        {text: 'Ya', onPress: () => fetchUpdateProfile(data)},
      ],
      {cancelable: true},
    );
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <EmptyBackground />
      <ScrollView style={{padding: 15}}>
        <Header title="Perbarui Profil" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.viewProfile}
            onPress={handleImagePicker}>
            <View style={styles.imgPfp}>
              {selectedImageCamera?.uri ? (
                <Image
                  source={{uri: selectedImageCamera.uri}}
                  style={styles.image}
                />
              ) : (
                <Icon
                  name="account-circle"
                  size={140}
                  color="grey"
                  style={styles.icon}
                />
              )}
            </View>
            <Gap height={10} />
          </TouchableOpacity>
          <Gap height={10} />
          <FormInput
            name="nama_lengkap"
            placeholder="Nama lengkap.."
            autoCapitalize="words"
            control={control}
            errors={errors}
            setValue={setValue}
          />
          <FormInput
            name="nomor_telepon"
            placeholder="Nomor telepon.."
            iconName="phone"
            control={control}
            errors={errors}
            setValue={setValue}
          />
          <FormInput
            name="provinsi"
            placeholder="Provinsi.."
            iconName="map-marker"
            autoCapitalize="words"
            control={control}
            errors={errors}
            setValue={setValue}
          />
          <FormInput
            name="kabupaten"
            placeholder="Kabupaten/kota.."
            iconName="map-marker"
            autoCapitalize="words"
            control={control}
            errors={errors}
            setValue={setValue}
          />
          <FormInput
            name="alamat"
            placeholder="Alamat lengkap.."
            iconName="map-marker-radius"
            autoCapitalize="words"
            multiline
            control={control}
            errors={errors}
            setValue={setValue}
          />
          <ButtonAction
            title="Perbarui Profil"
            onPress={handleSubmit(onSubmit)}
            backgroundColor={colors.BLUE}
            loading={isLoading}
          />
          <Gap height={40} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  imgPfp: {
    width: 155,
    height: 155,
    backgroundColor: colors.WHITE,
    borderRadius: 45,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderWidth: 0.4,
  },
  viewProfile: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
  },
  textLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.BLACK,
    fontStyle: 'italic',
  },
  container: {
    padding: 15,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
