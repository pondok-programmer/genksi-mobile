import {Button, StyleSheet, Text, View, Linking} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function Product() {
  const [userDetail, setUserDetail] = useState({
    id: 1,
    name: 'Nama Pembeli Satu',
    no_whatsapp: 6285157439660,
    product: {
      id: 2,
      name: 'CCTV 2000 FULL HD',
      description: 'CCTV berkualitas bagus! Dengan resolusi 4k',
      stock: 50,
      price: 3000000,
    },
  });

  async function bukaWhatsApp() {
    try {
      await Linking.openURL(`https://wa.me/${userDetail.no_whatsapp}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function konfirmasiPembelian() {
    try {
      // kirim notifikasi ke korwil untuk melihat detail transaksi
      const response = axios.post('http://localhost:3000/send-fcm', {
        device_token: teknisiDetail.device_token,
        title: `User Anu Telah Membeli CCTV ${userDetail.product.name}`,
        body: 'Harap periksa detail transaksi',
      });
      console.log(response);

      // kurangi stok cctv yang dibeli user
      const responseDua = axios.put(
        `http://localhost:3000/product-cctv/${userDetail.product.id}`,
      );
      console.log(responseDua);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>Product</Text>
      <View
        style={{
          margin: 20,
          backgroundColor: 'aqua',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name={'account'} color={'black'} size={35} />
          <View>
            <Text style={{color: 'black', fontSize: 17}}>
              Pembeli: {userDetail.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name={'camera-party-mode'} color={'black'} size={35} />
          <View>
            <Text>{userDetail.product.name}</Text>
            <Text>{userDetail.product.description}</Text>
            <Text>Rp {userDetail.product.price},-</Text>
            <Text>STOK CCTV: {userDetail.product.stock}</Text>
          </View>
        </View>
        <Button
          title="hubungi pembeli"
          color={'green'}
          onPress={() => bukaWhatsApp()}
        />
        <Button
          title="konfirmasi pembelian"
          color={'orange'}
          onPress={() => konfirmasiPembelian()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
