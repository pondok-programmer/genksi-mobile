import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ButtonAction, Gap, Header} from '../../../components';
import {colors} from '../../../utils/constant';
import api from '../../../services/axiosInstance';

const height = Dimensions.get('window').height;

export default function UserProfile({navigation}) {
  const [dataProfile, setDataProfile] = useState(null);
  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1500);

  async function handleProfile() {
    try {
      const response = await api.get('/profile');
      // console.log('data profile', response.data.data);
      setDataProfile(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('error', response.message);
      }
    }
  }

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

  //! handle logOut
  async function fecthLogOut() {
    try {
      const response = await api.post('/logout');
      console.log('succeess logout', response.data);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      await EncryptedStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      if (error.response) {
        console.log('Error from server', error.response.data);
        if (error.response.data.message === 'Unauthenticated.') {
          navigation.replace('Login');
        } else {
          console.log('Error from server:', error.response.data.message);
        }
      } else {
        console.log('Error:', error.message);
      }
    }
  }

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Header title="Profil" onPress={() => navigation.goBack()} />
      {ready && (
        <View>
          {dataProfile?.map((v, i) => (
            <ScrollView
              stickyHeaderHiddenOnScroll
              stickyHeaderIndices={[0]}
              key={i}>
              <View style={styles.viewProfile}>
                <View style={styles.imgPfp}>
                  <Icon
                    name={'account-circle'}
                    size={180}
                    color={'grey'}
                    style={{position: 'absolute'}}
                  />
                </View>
                <Text style={styles.textUsername}>{v.nama_lengkap}</Text>
              </View>
              <View style={styles.viewProfileDetail}>
                <Text style={styles.textUserDetail}>{v.nomor_telepon}</Text>
                <Text style={styles.textUserDetail}>{v.kabupaten}</Text>
                <Text style={styles.textUserDetail}>{v.provinsi}</Text>
                <Gap height={30} />

                <ButtonAction
                  title="Perbarui Profil"
                  backgroundColor={colors.PRIMARY}
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
          ))}
        </View>
      )}
      {!ready && (
        <View style={styles.ViewLoading}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  ViewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: colors.BLUE,
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    padding: 20,
    height: height * 2,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
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
