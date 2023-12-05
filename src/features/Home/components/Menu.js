import React, {useRef, useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Button,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {Gap} from '../../../components';
import {
  IconChecklist,
  IconProduct,
  IconProfile,
  IconShopping,
  ImgCCTV,
} from '../../../assets';
import {colors} from '../../../utils/constant';
import {FormInput} from '../../Auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Menu() {
  const {name} = useSelector(state => state.auth);
  const {token} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  // handle role
  const handleRole = () => {
    Alert.alert('Konfirmasi', 'Apakah anda ingin menjadi teknisi?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => {
          Alert.alert(
            'Perhatian!',
            'Sedang dalam proses, silahkan menunggu beberapa menit..',
          );
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.body, {backgroundColor: colors.BLUE}]}>
        <Gap height={40} />
        <View style={styles.bodyimgAndTxtUser}>
          <Text style={styles.txtAdmin}>Hii, member</Text>
        </View>
        <Gap height={20} />

        {/* CONTENT */}
        <View style={styles.contentALL}>
          <Gap height={30} />

          <View style={styles.MenuBoxRole}>
            <View style={{padding: 10}}>
              <Text style={styles.MenuTextBox}>
                Apakah anda ingin menjadi teknisi?
              </Text>
              <Gap height={17} />

              <Button title="daftar" color={'tomato'} onPress={handleRole} />
            </View>
            <Image
              source={ImgCCTV}
              style={{width: 100, height: 100, alignSelf: 'center'}}
            />
          </View>

          <View style={styles.viewContent}>
            <TouchableOpacity
              style={styles.boxTpq}
              onPress={() => navigation.navigate('TransaksiMember')}>
              <Image source={IconChecklist} style={{width: 40, height: 40}} />
              <Text style={styles.txtDasboard}>Transaksi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxTpq}
              onPress={() => navigation.navigate('ProfileMember')}>
              <Image source={IconProfile} style={{width: 40, height: 40}} />
              <Text style={styles.txtDasboard}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MenuTextBox: {
    maxWidth: 235,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  MenuBoxRole: {
    backgroundColor: colors.secondaryMain,
    elevation: 15,
    height: '10%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
  },
  txtRole: {
    fontSize: 18,
    color: colors.BLACK,
    padding: 10,
    fontWeight: '500',
  },
  contentStorageSaveDatas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtSaveDataTitle: {
    fontSize: 20,
    color: colors.BLACK,
  },
  bodyPenyimpanan: {
    marginTop: '10%',
    marginLeft: '5%',
  },
  body: {
    height: '100%',
    width: '100%',
  },
  imgUser: {
    height: '104%',
    width: '19%',
  },
  bodyimgAndTxtUser: {
    flexDirection: 'row',
    marginHorizontal: 10,
    height: height / 12,
    margin: 10,
    alignItems: 'center',
    top: 40,
  },
  txtAdmin: {
    fontSize: 20,
    color: colors.WHITE,
    textAlign: 'left',
    marginLeft: '3%',
  },
  imgSetting: {
    height: '23%',
    width: '10%',
  },
  contentALL: {
    backgroundColor: colors.WHITE,
    height: height * 2,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginVertical: 10,
  },
  contentCarosel: {
    height: 180,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 25,
    marginTop: 50,
    elevation: 10,
  },
  imgCarosel: {
    height: '12%',
    width: '25%',
  },

  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.yellow,
    height: '5%',
    width: '30%',
    borderRadius: 30,
  },
  viewCalendar: {
    height: '3%',
    width: '5%',
    marginRight: 13,
  },

  contentBody: {
    height: height / 8,
    marginTop: 80,
    justifyContent: 'center',
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: height / 8,
    marginTop: 60,
    alignItems: 'center',
  },
  boxTpq: {
    backgroundColor: colors.secondaryMain,
    width: '26%',
    height: '107%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
    elevation: 13,
    borderWidth: 0.7,
  },
  txtDasboard: {
    color: colors.WHITE,
    fontSize: 14,
  },
});
