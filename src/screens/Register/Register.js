import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Alert,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Background, Gap, Header} from '../../components';
import {FormInput} from '../../features/Auth';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../../utils/constant';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectRoute, setSelectRoute] = useState('');
  const [selectedImageCamera, setSelectedImageCamera] = React.useState(null);

  function submitRegister() {
    console.log({email, password});
    navigation.replace('Home');
  }

  // Image hanlde
  async function hanldeImagePicker() {
    //
    function imagePicker(source) {
      const options = {
        title: 'Pilih Gambar',
        cancelButtonTitle: 'Batal',
        takePhotoButtonTitle: 'Ambil Gambar dari Kamera',
        chooseFromLibraryButtonTitle: 'Pilih Gambar dari Galeri',
        quality: 0.2,
      };
      if (source === 'camera') {
        launchCamera(options, response => {
          if (response.didCancel) {
            console.log('Batal memilih gambar');
          } else if (response.error) {
            console.log('Error :', response.error);
          } else {
            const {fileName: name, uri, type} = response.assets[0];
            setSelectedImageCamera({uri, name, type});
          }
        });
      } else if (source == 'gallery') {
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('Batal Mengambil gambar dari galery');
          } else if (response.error) {
            console.log('Error :', response.error);
          } else {
            const {fileName: name, uri, type} = response.assets[0];
            setSelectedImageCamera({uri, name, type});
          }
        });
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
          onPress: () => permissionCamera(),
        },
        {
          text: 'Galeri',
          onPress: () => imagePicker('gallery'),
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <View style={{flex: 1}}>
      <Background />
      <Header title="Register" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Gap height={10} />

        {/* IMAGE PICKER */}
        <View
          style={{
            height: 200,
            width: '90%',
          }}>
          <TouchableNativeFeedback
            useForeground
            onPress={() => hanldeImagePicker()}>
            <View
              style={{
                backgroundColor: colors.WHITE,
                elevation: 10,
                height: 210,
                borderRadius: 15,
                overflow: 'hidden',
              }}>
              <Icon
                name="camera-iris"
                color={'grey'}
                size={60}
                style={styles.iconCamera}
              />
              <Text style={styles.textImagePicker}>Pilih Gambar</Text>
              {selectedImageCamera?.uri && (
                <Image
                  source={{uri: selectedImageCamera?.uri}}
                  style={{width: '100%', height: '100%'}}
                />
              )}
            </View>
          </TouchableNativeFeedback>
        </View>
        <Gap height={25} />

        {/* NAMA */}
        <FormInput
          onChangeText={setName}
          placeholder="Masukan nama"
          autoCapitalize={'words'}
          iconName="account"
        />
        <Gap height={15} />

        {/* EMAIL */}
        <FormInput
          onChangeText={setEmail}
          placeholder="contoh@email.com"
          autoCapitalize={'none'}
        />
        <Gap height={15} />

        {/* PASSWORD */}
        <FormInput
          onChangeText={setPassword}
          password
          iconName="lock"
          autoCapitalize={'none'}
        />
        <Gap height={15} />

        {/*  DROPDOWN ROUTE */}
        <View style={styles.viewPicker}>
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
        </View>
        <Gap height={20} />

        {/* BUTTON SUBMIT */}
        <TouchableNativeFeedback onPress={submitRegister} useForeground>
          <View style={styles.btnSubmit}>
            <Text style={styles.textBtnSubmit}>Daftar</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
});
