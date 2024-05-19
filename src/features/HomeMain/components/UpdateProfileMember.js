import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonAction, EmptyBackground, Gap, Header} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';
import {FormInput} from '../../Auth';
import {setLoading} from '../../Auth/services/authSlice';

export default function UpdateProfileMember({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: {errors},
    handleSubmit,
    getValues,
  } = useForm();

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('Batal memilih gambar');
    } else if (response.error) {
      console.log('Error:', response.error);
    } else {
      const {fileName: name, uri, type} = response.assets[0];
      setSelectedImage({uri, name, type});
    }
  };

  const handleImagePicker = async () => {
    const imagePicker = source => {
      const options = {
        mediaType: 'photo',
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
      'Ambil gambar dari...',
      '',
      [
        {text: 'Kamera', onPress: permissionCamera},
        {text: 'Galeri', onPress: () => imagePicker('gallery')},
      ],
      {cancelable: true},
    );
  };

  async function fetchUpdateProfile(authUpdate) {
    const formData = new FormData();
    formData.append('nama_lengkap', authUpdate.nama_lengkap);
    formData.append('nomor_telepon', authUpdate.nomor_telepon);
    formData.append('alamat', authUpdate.alamat);
    formData.append('kabupaten', authUpdate.kabupaten);
    formData.append('provinsi', authUpdate.provinsi);

    if (selectedImage) {
      formData.append('photo_profile', {
        uri: selectedImage.uri,
        name: selectedImage.name,
        type: selectedImage.type,
      });
    }
    // console.log('formdata', formData);
    // return false;

    try {
      setIsLoading(true);
      dispatch(setLoading('pending'));

      const response = await api.post(
        '/member/update-profile?_method=put',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsLoading(false);
      dispatch(setLoading('idle'));
      navigation.goBack();
      ToastAndroid.show(response.data.message, ToastAndroid.LONG);
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
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <EmptyBackground />
      <ScrollView
        style={{padding: 15}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchUpdateProfile(getValues())}
          />
        }>
        <Header title="Perbarui Profil" onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.viewProfile}
            onPress={handleImagePicker}>
            <View style={styles.imgPfp}>
              {selectedImage?.uri ? (
                <Image source={{uri: selectedImage.uri}} style={styles.image} />
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
          />
          <FormInput
            name="nomor_telepon"
            placeholder="Nomor telepon.."
            iconName="phone"
            control={control}
            errors={errors}
          />
          <FormInput
            name="provinsi"
            placeholder="Provinsi.."
            iconName="map-marker"
            autoCapitalize="words"
            control={control}
            errors={errors}
          />
          <FormInput
            name="kabupaten"
            placeholder="Kabupaten/kota.."
            iconName="map-marker"
            autoCapitalize="words"
            control={control}
            errors={errors}
          />
          <FormInput
            name="alamat"
            placeholder="Alamat lengkap.."
            iconName="map-marker-radius"
            autoCapitalize="words"
            multiline
            control={control}
            errors={errors}
          />
          <ButtonAction
            title="Perbarui Profil"
            onPress={handleSubmit(fetchUpdateProfile)}
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
  container: {
    padding: 15,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
