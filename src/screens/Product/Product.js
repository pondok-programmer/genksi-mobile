import {
  Button,
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import {Background, Gap} from '../../components';
import {ImgprofilePicture} from '../../assets';
import axios from 'axios';

export default function Product() {
  const userDetail = [
    {
      id: 1,
      name: 'Nama Pembeli 1',
      no_whatsapp: '62895387744114',
      product: {
        id: 1,
        name: 'CCTV 2000 FULL HD',
        description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
        stock: 50,
        price: 3000000,
      },
    },
    {
      id: 2,
      name: 'Nama Pembeli 2',
      no_whatsapp: '62895387744114',
      product: {
        id: 2,
        name: 'CCTV 2000 FULL HD',
        description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
        stock: 50,
        price: 3000000,
      },
    },
  ];

  async function bukaWhatsApp(NoWhatsApp) {
    try {
      await Linking.openURL(`https://wa.me/${NoWhatsApp}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function konfirmasiPembelian(namaPembeli, productId) {
    try {
      // kirim notifikasi ke korwil untuk melihat detail transaksi
      const response = axios.post('http://localhost:3000/send-fcm', {
        device_token: teknisiDetail.device_token, // Pastikan variabel teknisiDetail sudah didefinisikan
        title: `User ${namaPembeli} Telah Membeli CCTV ${productId}`,
        body: 'Harap periksa detail transaksi',
      });
      console.log(response);

      // kurangi stok cctv yang dibeli user
      const responseDua = axios.put(
        `http://localhost:3000/product-cctv/${productId}`,
      );
      console.log(responseDua);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Background />
      <Gap height={20} />

      <ScrollView>
        <Text style={styles.viewTextUser}>Customer</Text>
        {userDetail.map(user => (
          <View key={user.id} style={styles.viewContent}>
            <View style={styles.viewProfileUser}>
              <Image
                source={ImgprofilePicture}
                style={{height: 100, borderRadius: 10}}
              />
              <Text style={styles.textUserDetail}>{user.name}</Text>
            </View>
            <Gap height={10} />

            <View style={styles.viewContextProductCctv}>
              <Image
                source={ImgprofilePicture}
                style={{height: 100, borderRadius: 10}}
              />
              <View style={styles.textProduct}>
                <Text style={{color: 'black', fontFamily: 'Poppins-Bold'}}>
                  {user.product.name}
                </Text>
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  {user.product.description}
                </Text>
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  Rp {user.product.price},-
                </Text>
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  STOK CCTV: {user.product.stock}
                </Text>
              </View>
            </View>

            {/* BUTTON SUBMIT */}
            <View style={{flexDirection: 'row', paddingHorizontal: 80}}>
              <Button
                title="hubungi pembeli"
                color={'green'}
                onPress={() => bukaWhatsApp(user.no_whatsapp)}
              />
              <Gap width={6} />
              <Button
                title="konfirmasi pembelian"
                color={'orange'}
                onPress={() => konfirmasiPembelian()}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewTextUser: {
    color: 'black',
    margin: 14,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 19,
    top: 15,
  },
  viewContent: {
    margin: 20,
    padding: 8,
    backgroundColor: 'white',
    elevation: 7,
    borderRadius: 15,
    alignItems: 'center',
  },
  viewProfileUser: {
    alignItems: 'center',
  },
  textUserDetail: {
    color: 'black',
    fontSize: 17,
    maxWidth: 200,
    top: 4,
    fontFamily: 'Poppins-Medium',
  },
  viewContextProductCctv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textProduct: {
    maxWidth: 210,
    padding: 4,
    marginVertical: 7,
  },
});
