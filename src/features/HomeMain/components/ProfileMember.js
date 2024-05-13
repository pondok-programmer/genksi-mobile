import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ButtonAction, Gap} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

const ProfileMember = () => {
  const navigation = useNavigation();
  const [dataProfile, setDataProfile] = useState({
    id: 1,
    id_user: 1,
    id_atasan: null,
    photo_profile:
      'https://i.pinimg.com/736x/d6/e8/ff/d6e8ff05c7fec836bce48d365e3a1763.jpg',
    nama_lengkap: 'Rafi zimraan',
    nomor_telepon: '081234567890',
    provinsi: 'Jawa Barat',
    kabupaten: 'Bandung',
    alamat: 'Jalan Jalan',
    created_at: '2023-11-28T07:05:59.000000Z',
    updated_at: '2023-11-28T07:05:59.000000Z',
  });

  // Handle logOut
  const handleLogOut = () => {
    Alert.alert('Perhatian!', 'Apakah anda ingin keluar', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => {
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
  // async function handleProfile() {
  //   try {
  //     const response = await api.get('/profile');
  //     console.log('data', response.data.data);
  //     setDataProfile(response.data.data);
  //   } catch (error) {
  //     if (error.response) {
  //       console.log('error from server', error.response.data);
  //     } else {
  //       console.log('error', error.message);
  //     }
  //   }
  // }

  useEffect(() => {
    // handleProfile();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]}>
        <Gap height={70} />
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            {dataProfile.photo_profile ? (
              <Image
                source={{uri: dataProfile?.photo_profile}}
                style={{height: '100%', width: '100%'}}
              />
            ) : (
              <Icon
                name="account-circle"
                size={180}
                color="grey"
                style={{position: 'absolute'}}
              />
            )}
          </View>
          <Text style={styles.username}>{dataProfile.nama_lengkap}</Text>
        </View>
        <Gap height={10} />
        <View style={styles.profileDetail}>
          <Text style={styles.userDetail}>{dataProfile.nama_lengkap}</Text>
          <Gap height={15} />
          <Text style={styles.userDetail}>{dataProfile.kabupaten}</Text>
          <Gap height={15} />

          <Text style={styles.userDetail}>{dataProfile.provinsi}</Text>
          <Gap height={20} />
          <ButtonAction
            title="Perbarui Profil"
            backgroundColor={colors.ABU_ABU}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    backgroundColor: colors.WHITE,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderWidth: 0.4,
  },
  username: {
    color: colors.BLACK,
    fontSize: 20,
    margin: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  profileDetail: {
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    maxWidth: 480,
  },
  userDetail: {
    backgroundColor: colors.WHITE,
    elevation: 3,
    padding: 15,
    width: '80%',
    textAlign: 'center',
    borderRadius: 10,
    color: colors.BLACK,
    fontWeight: '500',
  },
});

export default ProfileMember;
