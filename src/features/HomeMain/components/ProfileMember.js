import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
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

  // Fetch profile data from the server
  const fetchProfile = async () => {
    try {
      setRefreshing(true);
      const response = await api.get('/member/profile');
      const profile = response.data.data[0];

      setProfileData({
        photoProfile: profile.photo_profile,
        profileDetails: profile,
        isReady: true,
      });
    } catch (error) {
      handleFetchError(error);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle fetch profile error
  const handleFetchError = error => {
    if (error.response) {
      console.log('Server error:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  };

  // Handle user logout
  const handleLogOut = () => {
    Alert.alert('Perhatian!', 'Apakah anda ingin keluar?', [
      {text: 'Batal', style: 'cancel'},
      {text: 'Ya', onPress: () => fetchLogOut()},
    ]);
  };

  // Fetch logout from the server
  const fetchLogOut = async () => {
    try {
      const response = await api.post('/logout');
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      await EncryptedStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      handleFetchError(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchProfile} />
        }>
        <Gap height={70} />
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            {isReady ? (
              photoProfile ? (
                <Image source={{uri: photoProfile}} style={styles.imageStyle} />
              ) : (
                <Icon
                  name="account-circle"
                  size={180}
                  color="grey"
                  style={styles.iconStyle}
                />
              )
            ) : (
              <ActivityIndicator size="large" color={colors.PRIMARY} />
            )}
          </View>
          {isReady ? (
            <Text style={styles.username}>{profileDetails.nama_lengkap}</Text>
          ) : (
            <ActivityIndicator size="small" color={colors.PRIMARY} />
          )}
        </View>
        <Gap height={10} />
        <View style={styles.profileDetail}>
          <View style={styles.userDetail}>
            {isReady ? (
              <Text style={styles.provinsi}>{profileDetails.provinsi}</Text>
            ) : (
              <ActivityIndicator size="small" color={colors.PRIMARY} />
            )}
          </View>
          <Gap height={15} />
          <View style={styles.userDetail}>
            {isReady ? (
              <Text style={styles.kabupaten}>{profileDetails.kabupaten}</Text>
            ) : (
              <ActivityIndicator size="small" color={colors.PRIMARY} />
            )}
          </View>
          <Gap height={15} />
          <View style={styles.userDetail}>
            {isReady ? (
              <Text style={styles.nomor_telepon}>
                {profileDetails.nomor_telepon}
              </Text>
            ) : (
              <ActivityIndicator size="small" color={colors.PRIMARY} />
            )}
          </View>

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
};

const styles = StyleSheet.create({
  kabupaten: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.BLACK,
    textAlign: 'center',
  },
  nomor_telepon: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.BLACK,
    textAlign: 'center',
  },
  provinsi: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.BLACK,
    textAlign: 'center',
  },
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
    alignItems: 'center',
    borderRadius: 10,
    color: colors.BLACK,
    fontWeight: '500',
  },
});

export default ProfileMember;
