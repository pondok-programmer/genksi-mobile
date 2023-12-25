import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Alert,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, Styles} from '../../../components';
import EncryptedStorage from 'react-native-encrypted-storage';
import api from '../../../services/axiosInstance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../utils/constant';
import {
  IconChecklist,
  IconProduct,
  IconProfile,
  IconKategori,
  ImgCheckOut,
  ImgGoggleMap,
} from '../../../assets';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function DistributorHome({navigation}) {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleProfile();
  }, []);

  async function handleProfile() {
    try {
      const response = await api.get('/profile');
      setProfile(response.data.data[0]);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
        if (error.response.data.message === 'Unauthenticated.') {
          navigation.replace('Login');
          ToastAndroid.show(
            'Login kembali untuk update data anda',
            ToastAndroid.LONG,
          );
        }
      } else {
        console.log('error', error.message);
      }
    }
  }

  // alert logOut
  const logout = () => {
    Alert.alert('Perhatian!', 'Apakah anda ingin keluar', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => {
          // Alert.alert('Nantikan fitur nya');
          handleLogOut();
        },
      },
    ]);
  };

  async function handleLogOut() {
    try {
      const response = await api.post('/logout');
      console.log('distributor', response.data.message);
      await EncryptedStorage.removeItem('token');
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      if (error.response) {
        console.log('Error from server', error.response.data);
        if (error.response.data.message === 'Unauthenticated.') {
          navigation.replace('Login');
        } else {
          // Penanganan kesalahan lainnya
          console.log('Error from server:', error.response.data.message);
        }
      } else {
        console.log('Error:', error.message);
      }
    }
  }

  return (
    <View style={[Styles.container, {backgroundColor: colors.BLUE}]}>
      <Gap height={30} />
      {/* image logOut */}
      <TouchableOpacity style={styles.imgLogOut} onPress={logout}>
        <Image
          source={ImgCheckOut}
          style={{
            height: 30,
            width: 30,
          }}
        />
      </TouchableOpacity>

      {/* text name user */}
      <View
        style={{
          padding: 20,
          top: 30,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {isLoading ? (
          <>
            <Text style={styles.textName}>hii, </Text>
            <ActivityIndicator size="small" color="#fff" />
          </>
        ) : (
          <Text style={styles.textName}>hii, {profile.nama_lengkap}</Text>
        )}
      </View>
      <Gap height={23} />

      {/* first box */}
      <View style={styles.distrubutorViewContainer}>
        <Gap height={40} />
        <Text style={styles.textTitle}> Data Product Cctv</Text>
        <View style={styles.boxContext}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('DataProduct')}>
            <Image source={IconChecklist} style={{width: 40, height: 40}} />
            <Text style={styles.txtDasboard}>Data Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('Kategori')}>
            <Image source={IconKategori} style={{width: 40, height: 40}} />
            <Text style={styles.txtDasboard}>Kategori Product</Text>
          </TouchableOpacity>
        </View>

        <Gap height={10} />
        {/* second box */}
        <Text style={styles.textTitle}>Lokasi Pengguna</Text>
        <View style={styles.boxContextSecond}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('MapKorwil')}>
            <Image source={ImgGoggleMap} style={{width: 40, height: 40}} />
            <Text style={styles.txtDasboard}>Korwil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('MapTeknisiDistributor')}>
            <Image source={ImgGoggleMap} style={{width: 40, height: 40}} />
            <Text style={styles.txtDasboard}>Teknisi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('MapMemberDistributor')}>
            <Image source={ImgGoggleMap} style={{width: 40, height: 40}} />
            <Text style={styles.txtDasboard}>Member</Text>
          </TouchableOpacity>
        </View>

        <Gap height={10} />

        {/* third box */}
        <Text style={styles.textTitle}>Output Transaksi dan Profile</Text>
        <View style={styles.boxContextThird}>
          <TouchableOpacity style={styles.box}>
            <Image source={IconChecklist} style={{width: 40, height: 40}} />
            <Text style={styles.txtDasboard}>Transaksi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('ProfileDistributor')}>
            <Image source={IconProfile} style={{width: 40, height: 40}} />
            <Text style={styles.txtDasboard}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgLogOut: {
    padding: 10,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },
  distrubutorViewContainer: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: '90%',
  },
  txtDasboard: {
    color: colors.BLACK,
    fontSize: 14,
  },
  textTitle: {
    color: '#000',
    fontSize: 17,
    fontWeight: '900',
    margin: 10,
  },
  textName: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.secondaryLight,
  },
  box: {
    backgroundColor: colors.WHITE,
    width: '26%',
    height: '107%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
    elevation: 13,
    borderWidth: 0.7,
    margin: 10,
  },
  boxContextSecond: {
    flexDirection: 'row',
    height: '14%',
    alignItems: 'center',
  },
  boxContextThird: {
    flexDirection: 'row',
    height: '14%',
    alignItems: 'center',
  },
  boxContext: {
    height: '14%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  context: {
    backgroundColor: colors.WHITE,
    height: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginVertical: 10,
  },
});
