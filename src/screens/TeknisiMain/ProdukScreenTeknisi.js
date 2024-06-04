import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {ImgCCTV} from '../../assets';
import WhastApp from '../../assets/svg/Whatsapp.svg';
import {Gap} from '../../components';
import {colors} from '../../utils/constant';

export default function ProdukScreenTeknisi() {
  async function OpenWhatsApp() {
    const phoneNumber = '+6282161196119';
    try {
      await Linking.openURL(`https://wa.me/${phoneNumber}`);
    } catch (error) {
      console.log('error opening whastApp:', error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, padding: 15}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Gap height={35} />
      <View style={styles.MenuBoxRole}>
        <Image source={ImgCCTV} style={{width: 100, height: 100}} />
        <Gap width={10} />
        <View style={{flex: 1}}>
          <Text style={styles.usernameTeknisi}>AL-fatir rahmat</Text>
          <Text style={styles.MenuTextBox}>
            Cctv ALstart-23 revolusi 23Mbps
          </Text>
          <Text style={styles.TxtStock}>Stock: 20</Text>
          <Text style={styles.TxtStock}>Tipe: 20</Text>
          <Text style={styles.TxtStock}>Merk: 20</Text>
          <View style={styles.ViewBottomBar}>
            <Text style={styles.TxtPrice}>Harga: Rp 20.000</Text>
            <TouchableNativeFeedback useForeground onPress={OpenWhatsApp}>
              <WhastApp width={28} height={28} />
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ViewBottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usernameTeknisi: {
    maxWidth: 235,
    fontSize: 20,
    height: 30,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  TxtPrice: {
    fontSize: 16,
    color: colors.GREEN,
    fontWeight: '600',
  },
  TxtStock: {
    fontSize: 14,
    color: '#555',
  },
  MenuTextBox: {
    maxWidth: 235,
    fontSize: 14,

    color: '#555',
  },
  MenuBoxRole: {
    backgroundColor: colors.WHITE,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
  },
});
