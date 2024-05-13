import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {ButtonAction, EmptyBackground, Gap, Header} from '../../../components';
import {colors} from '../../../utils/constant';
import {FormInput} from '../../Auth';

export default function EditUserProfile({navigation}) {
  const dispatch = useDispatch();
  const [selectedImageCamera, setSelectedImageCamera] = React.useState(null);
  //   const {status_user_profile, user_data} = useSelector(state => state.auth);
  //   const {user_id} = user_data;

  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1000); // "lazy render"

  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm();

  // Image Handle
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

  async function hanldeImagePicker() {
    function imagePicker(source) {
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
    }

    // Camera permission
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
        {
          text: 'Kamera',
          onPress: permissionCamera,
        },
        {
          text: 'Galeri',
          onPress: () => imagePicker('gallery'),
        },
      ],
      {cancelable: true},
    );
  }

  const updateProfile = () => {
    Alert.alert('Nantikan fitur nya');
  };

  return (
    <View style={{flex: 1}}>
      <EmptyBackground />
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        style={{padding: 15}}>
        <Header title="Perbarui Profil" onPress={() => navigation.goBack()} />
        {ready && (
          <View style={styles.container}>
            {/* profile region */}
            <TouchableOpacity
              style={styles.viewProfile}
              onPress={hanldeImagePicker}>
              <View style={styles.imgPfp}>
                {selectedImageCamera && selectedImageCamera.uri ? (
                  <Image
                    source={{uri: selectedImageCamera.uri}}
                    style={{width: '100%', height: '100%'}}
                  />
                ) : (
                  <Icon
                    name={'account-circle'}
                    size={170}
                    color={'grey'}
                    style={{position: 'absolute'}}
                  />
                )}
              </View>
              <Gap height={10} />
              {/* <Text style={styles.textUsername}>Rafi zimraan A.W</Text> */}
            </TouchableOpacity>

            <Gap height={10} />
            <FormInput
              name={'nama_lengkap'}
              placeholder={'Nama lengkap..'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />

            <FormInput
              name={'no_whatsapp'}
              placeholder={'WhatsApp (cth. 08987654321)'}
              iconName={'whatsapp'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'provinsi'}
              placeholder={'Provinsi..'}
              iconName={'map-legend'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'kabupaten_kota'}
              placeholder={'Kabupaten/kota..'}
              iconName={'map-legend'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'alamat_lengkap'}
              placeholder={'Alamat lengkap..'}
              iconName={'map-marker-radius'}
              autoCapitalize={'words'}
              multiline
              control={control}
              errors={errors}
            />
            {/* <Gap height={10} /> */}
            <ButtonAction
              title="Perbarui Profile"
              onPress={updateProfile}
              backgroundColor={colors.BLUE}
            />
            <Gap height={40} />
          </View>
        )}
      </ScrollView>
      {!ready && <Text style={styles.textLoading}>Memuat formulir..</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  imgPfp: {
    width: 170,
    height: 170,
    backgroundColor: 'white',
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
  icon: {
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    height: '100%',
  },
  btnResetImg: {
    width: 40,
    height: 40,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    position: 'absolute',
    overflow: 'hidden',
    right: 15,
    top: 15,
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
  textPhotoFieldTitle: {
    position: 'absolute',
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  imgContainer: {
    backgroundColor: 'white',
    elevation: 3,
    height: 210,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 17,
  },
  iconBack: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnBack: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    elevation: 3,
  },
  headerContainer: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
