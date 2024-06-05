import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ButtonAction, Gap} from '../../components';
import {ProfileData, ProfileImageKoortek} from '../../features/Korwil';
import api from '../../services/axiosInstance';
import {colors} from '../../utils/constant';

const dataDumy = {
  photo_profile:
    'https://i.pinimg.com/564x/58/fb/60/58fb608955bcf6de6dbaa6cef0d29213.jpg',
  nama_lengkap: 'Jhon Weigh',
  provinsi: 'Jawa Barat',
  kabupaten: 'Bandung',
  nomor_telepon: '08976755632',
};

export default function ProfileScreenKoortek({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState({
    photoProfile: null,
    dataProfile: {},
    isReady: false,
  });

  const {dataProfile, photoProfile, isReady} = profileData;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setRefreshing(true);
        setTimeout(() => {
          setProfileData({
            photoProfile: dataDumy.photo_profile,
            dataProfile: dataDumy,
            isReady: true,
          });
        }, 1000);
        setRefreshing(false);
      } catch (error) {
        console.log('error', error);
      }
      setRefreshing(false);
    };
    fetchProfile();
  }, []);

  const fetchLogout = () => {
    Alert.alert('Perhatian!', 'Apakah anda ingin keluar applikasi?', [
      {text: 'Batal', style: 'cancel'},
      {text: 'Ya', onPress: () => logout()},
    ]);
  };

  const logout = async () => {
    try {
      const response = await api.post('/logout');
      ToastAndroid.show(response.data.message, ToastAndroid.LONG);
      await EncryptedStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      if (error.response) {
        console.log('server error', error.response.data);
      } else {
        console.log('error source code', error.message);
      }
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <ScrollView
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        refreshControl={<RefreshControl refreshing={refreshing} />}>
        <Gap height={50} />
        <View style={styles.bodyImageProf}>
          <ProfileImageKoortek photoProfile={photoProfile} isReady={isReady} />
          {isReady ? (
            <Text>{dataProfile.nama_lengkap}</Text>
          ) : (
            <ActivityIndicator size={'small'} style={colors.PRIMARY} />
          )}
        </View>
        <Gap height={10} />
        <View style={styles.ContentProfile}>
          <ProfileData
            value={
              isReady ? (
                dataProfile.provinsi
              ) : (
                <ActivityIndicator size={'small'} color={colors.PRIMARY} />
              )
            }
          />
          <Gap height={15} />
          <ProfileData
            value={
              isReady ? (
                dataProfile.kabupaten
              ) : (
                <ActivityIndicator size={'small'} color={colors.PRIMARY} />
              )
            }
          />
          <Gap height={15} />
          <ProfileData
            value={
              isReady ? (
                dataProfile.nomor_telepon
              ) : (
                <ActivityIndicator size={'small'} color={colors.PRIMARY} />
              )
            }
          />
          <Gap height={15} />
          <ButtonAction
            title="Perbarui profile"
            backgroundColor={colors.NAVY}
          />
          <Gap height={10} />
          <ButtonAction
            title="Perbarui profile"
            backgroundColor={colors.NAVY}
            onPress={fetchLogout}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ContentProfile: {
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
    maxWidth: 480,
  },
  bodyImageProf: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
});
