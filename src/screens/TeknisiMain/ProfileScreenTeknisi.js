import {useNavigation} from '@react-navigation/native';
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
import {ProfileDetailItem, ProfileImage} from '../../features/Teknisi';
import api from '../../services/axiosInstance';
import {colors} from '../../utils/constant';

const dummyProfile = {
  photo_profile:
    'https://i.pinimg.com/564x/58/fb/60/58fb608955bcf6de6dbaa6cef0d29213.jpg',
  nama_lengkap: 'Rafi ZImraan',
  provinsi: 'Jawa Barat',
  kabupaten: 'Bandung',
  nomor_telepon: '081234567890',
};

export default function ProfileScreenTeknisi() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState({
    photoProfile: null,
    profileDetails: {},
    isReady: false,
  });

  const {profileDetails, photoProfile, isReady} = profileData;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setRefreshing(true);

      setTimeout(() => {
        setProfileData({
          photoProfile: dummyProfile.photo_profile,
          profileDetails: dummyProfile,
          isReady: true,
        });
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      setProfileData({
        photoProfile: dummyProfile.photo_profile,
        profileDetails: dummyProfile,
        isReady: true,
      });
      setRefreshing(false);
    }
  };

  const handleLogOut = () => {
    Alert.alert('Perhatian!', 'Apakah anda ingin keluar?', [
      {text: 'Batal', style: 'cancel'},
      {text: 'Ya', onPress: () => fetchLogOut()},
    ]);
  };

  const fetchLogOut = async () => {
    try {
      const response = await api.post('/logout');
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      await EncryptedStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      if (error.response) {
        console.log('Server error:', error.response.data);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <ScrollView
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchProfile} />
        }>
        <Gap height={70} />
        <View style={styles.profileContainer}>
          <ProfileImage photoProfile={photoProfile} isReady={isReady} />
          {isReady ? (
            <Text style={styles.username}>{profileDetails.nama_lengkap}</Text>
          ) : (
            <ActivityIndicator size="small" color={colors.PRIMARY} />
          )}
        </View>
        <Gap height={10} />
        <View style={styles.profileDetail}>
          <ProfileDetailItem
            value={
              isReady ? (
                profileDetails.provinsi
              ) : (
                <ActivityIndicator size="small" color={colors.PRIMARY} />
              )
            }
          />
          <Gap height={15} />
          <ProfileDetailItem
            value={
              isReady ? (
                profileDetails.kabupaten
              ) : (
                <ActivityIndicator size="small" color={colors.PRIMARY} />
              )
            }
          />
          <Gap height={15} />
          <ProfileDetailItem
            value={
              isReady ? (
                profileDetails.nomor_telepon
              ) : (
                <ActivityIndicator size="small" color={colors.PRIMARY} />
              )
            }
          />
          <Gap height={15} />
          <ButtonAction
            title="Perbarui Profil"
            backgroundColor={colors.NAVY}
            onPress={() => navigation.navigate('UpdateProfileMember')}
          />
          <Gap height={10} />
          <ButtonAction
            title="Keluar"
            backgroundColor="tomato"
            onPress={handleLogOut}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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
});
