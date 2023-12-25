import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../services/axiosInstance';
import {ButtonAction, Gap, Header} from '../../../components';
import {colors} from '../../../utils/constant';

const height = Dimensions.get('window').height;

export default function ProfileMember({navigation}) {
  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1500);

  const [dataProfile, setDataProfile] = useState({
    data: [
      {
        id: 1,
        id_user: 1,
        id_atasan: null,
        photo_profile: null,
        nama_lengkap: 'distributor',
        nomor_telepon: '081234567890',
        provinsi: 'Jawa Barat',
        kabupaten: 'Bandung',
        alamat: 'Jalan Jalan',
        created_at: '2023-11-28T07:05:59.000000Z',
        updated_at: '2023-11-28T07:05:59.000000Z',
      },
    ],
  });

  // handle logOut
  const handleLogOut = () => {
    Alert.alert('Perhatian!', 'Apakah anda ingin keluar', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => {
          // Alert.alert('Nantikan fitur nya');
          fecthLogOut();
        },
      },
    ]);
  };

  async function fecthLogOut() {
    try {
      const response = await api.post('/logout');
      console.log('succeess logout', response.data);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      await EncryptedStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      if (error.response) {
        console.log('Error form server', error.response.data);
      } else {
        console.log('error', error.message);
      }
    }
  }

  // data profile
  async function handleProfile() {
    try {
      const response = await api.get('/profile');
      console.log('data', response.data.data);
      setDataProfile(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('error', error.message);
      }
    }
  }

  useEffect(() => {
    // handleProfile();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: colors.BLUE}}>
      <Header title="Profil Anda" onPress={() => navigation.goBack()} />
      {ready && (
        <View style={[styles.Container]}>
          <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
            <View style={styles.viewProfile}>
              <View style={styles.imgPfp}>
                <Icon
                  name={'account-circle'}
                  size={180}
                  color={'grey'}
                  style={{position: 'absolute'}}
                />
              </View>
              <Text style={styles.textUsername}>nama_lengkap</Text>
            </View>
            <View style={styles.viewProfileDetail}>
              <Text style={styles.textUserDetail}>nama_lengkap</Text>
              <Text style={styles.textUserDetail}>kabupaten</Text>
              <Text style={styles.textUserDetail}>provinsi</Text>
              <Gap height={30} />

              <ButtonAction
                title="Perbarui Profil"
                backgroundColor={colors.BLUE}
                onPress={() => navigation.navigate('UpdateProfile')}
              />
              <Gap height={15} />
              <ButtonAction
                title="Keluar"
                backgroundColor="tomato"
                onPress={handleLogOut}
              />
            </View>
          </ScrollView>
        </View>
      )}
      {!ready && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    height: '100%',
    width: '100%',
  },
  textOption: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
  btnOption: {
    width: '90%',
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    elevation: 3,
  },
  imgPfp: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderWidth: 0.4,
  },
  textUserDetail: {
    backgroundColor: 'white',
    elevation: 3,
    padding: 15,
    width: '80%',
    textAlign: 'center',
    margin: 5,
    borderRadius: 10,
    color: 'black',
    fontWeight: '500',
  },
  viewProfileDetail: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    padding: 20,
    height: height * 2,
    width: '100%',
    maxWidth: 480,
  },
  textUsername: {
    color: 'black',
    fontSize: 20,
    margin: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  viewProfile: {
    alignItems: 'center',
  },
});
