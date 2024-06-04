import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ImgApplogo} from '../../assets';
import {Gap} from '../../components';
import {colors} from '../../utils/constant';

export default function SplashScreen({navigation}) {
  async function handleSplash() {
    // try {
    //   const credential = await EncryptedStorage.getItem('user_credential');
    //   const onBoarding = await EncryptedStorage.getItem('is_boarding');
    //   if (!credential && !onBoarding) {
    //     navigation.replace('OnBoarding');
    //   } else if (credential) {
    //     navigation.replace('Home');
    //   } else {
    //     navigation.replace('Login');
    //   }
    // } catch (error) {
    //   console.log('Error', error);
    // }

    try {
      const token = await EncryptedStorage.getItem('token');
      const userRole = await EncryptedStorage.getItem('userRole');

      if (token) {
        if (userRole === 'koordinator_teknisi') {
          navigation.replace('Korwil');
        } else if (userRole === 'teknisi') {
          navigation.replace('BottomTopTeknisi');
        } else if (userRole === 'distributor') {
          navigation.replace('DistributorHome');
        } else if (userRole === 'member') {
          navigation.replace('MainNavigator');
        } else {
          navigation.replace('Login');
        }
      } else {
        const onBoarding = await EncryptedStorage.getItem('is_boarding');
        if (!onBoarding) {
          navigation.replace('OnBoarding');
        } else {
          navigation.replace('Login');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleSplash();
    }, 1500);
  }, []);

  return (
    <View style={{...styles.Container}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
      <View style={styles.ContentImg}>
        <Image source={ImgApplogo} style={styles.Img} />
      </View>
      <Gap height={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BLUE,
  },
  ContentImg: {
    backgroundColor: colors.WHITE,
    width: 90,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  Img: {
    height: '76%',
    width: '87%',
    backgroundColor: '#FFFFFF',
  },
});
