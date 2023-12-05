import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList, Button} from 'react-native';
import {Background, Gap, Header} from '../../../components';

export default function OrderCctv({navigation}) {
  const [ready, setReady] = useState(true);
  const [dataOrder, setDataOrder] = useState(null);

  setTimeout(() => {
    setReady(false);
    setDataOrder(orders);
  }, 1500);

  const orders = [
    {
      id: 1,
      buyerId: 101,
      productId: 201,
      productName: 'CCTV Model X',
      price: 200,
      description:
        'Panasonic 4 0MP  Support H 264 amp MJPEG dual 4M 2688 1520 amp 25 30fps 3M 2304xl296 Smart',
      ownerName: 'MUh. partijan. SS',
      imageUri:
        'https://image.made-in-china.com/2f0j00EBRQnTjcgMoV/CCTV-Camera-HKD-80830-.jpg', // Ganti URL_GAMBAR_CCTV_X dengan URL gambar untuk CCTV X
    },
    {
      id: 2,
      buyerId: 102,
      productId: 202,
      productName: 'CCTV Model Y',
      price: 250,
      description:
        'Support H 264 amp MJPEG dual codec Max 20fps 4M 2688 1520 amp 25 30fps 3M 2304xl296 Smar',
      ownerName: 'Sujanto parnum S.pd',
      imageUri: 'https://4.imimg.com/data4/RU/NM/MY-6509051/hd-cctv-camera.jpg', // Ganti URL_GAMBAR_CCTV_Y dengan URL gambar untuk CCTV Y
    },
  ];

  const renderOrder = ({item}) => (
    <View style={styles.orderItem}>
      <Image source={{uri: item.imageUri}} style={styles.orderImage} />
      <View style={styles.orderDetails}>
        {/* <Text style={styles.orderName}>{item.productName}</Text>
        <Text style={styles.orderText}>ID Pembeli: {item.buyerId}</Text> */}
        <Text style={styles.orderText}>ID Product: {item.productId}</Text>
        <Text style={styles.orderText}>Harga: ${item.price}</Text>
        <Text style={styles.orderText}>Deskripsi: {item.description}</Text>
        <Text style={styles.orderText}>Pemilik: {item.ownerName}</Text>
        <Gap height={10} />
        <Button title="beli" color={'tomato'} />
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Background />
      <Header title="Order cctv" onPress={() => navigation.goBack()} />
      {ready ? (
        <View style={styles.ViewLoading}>
          <Text style={[styles.textLoading, {fontSize: 16}]}>
            Memuat formulir
          </Text>
        </View>
      ) : (
        <View style={{padding: 20}}>
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'grey',
    flex: 1,
    fontStyle: 'italic',
  },
  ViewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  orderImage: {
    width: 120,
    height: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  orderDetails: {
    flex: 1,
    padding: 15,
  },
  orderText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
});
