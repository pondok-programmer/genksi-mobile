import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ButtonAction, Gap, Header, Styles} from '../../../components';
import {colors} from '../../../utils/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../services/axiosInstance';

const height = Dimensions.get('window').height;

export default function ProfileDistributor({navigation}) {
  const [profile, setProfile] = useState(null);
  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1500);

  async function handleProfile() {
    try {
      const response = await api.get('/profile');
      // console.log('data profile', response.data.data);
      setProfile(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('error', response.message);
      }
    }
  }

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <View style={[Styles.container, {backgroundColor: colors.WHITE}]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Header title="Profile" onPress={() => navigation.goBack()} />
      {ready && (
        <View>
          {profile?.map((val, ind) => (
            <ScrollView
              stickyHeaderHiddenOnScroll
              stickyHeaderIndices={[0]}
              key={ind}>
              <View style={styles.contentProfile}>
                <View style={styles.ImgPfp}>
                  <Icon
                    name={'account-circle'}
                    size={180}
                    color={'grey'}
                    style={{position: 'absolute'}}
                  />
                </View>
                <Text style={styles.txtNamaLengkap}>{val.nama_lengkap}</Text>
              </View>
              <View style={styles.contentProfileDetail}>
                <Text style={styles.textProfile}>{val.nama_lengkap}</Text>
                <Text style={styles.textProfile}>{val.kabupaten}</Text>
                <Text style={styles.textProfile}>{val.provinsi}</Text>
                <Gap height={30} />

                <ButtonAction
                  title="Perbarui Profile"
                  backgroundColor={colors.PRIMARY}
                  onPress={() => navigation.navigate('UpdateProfile')}
                />
                <Gap height={15} />
                <ButtonAction title="keluar" backgroundColor={'tomato'} />
              </View>
            </ScrollView>
          ))}
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
  txtNamaLengkap: {
    color: 'black',
    fontSize: 20,
    margin: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  textProfile: {
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
  contentProfileDetail: {
    backgroundColor: colors.BLUE,
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    height: height * 2,
  },
  contentProfile: {
    alignItems: 'center',
  },
  ImgPfp: {
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
});
