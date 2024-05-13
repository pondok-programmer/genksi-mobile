import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {EmptyBackground, Gap} from '../../../components';
import {colors} from '../../../utils/constant';

export default function RiwayatTransaksiMember() {
  const transactions = [
    {
      id: 1,
      name: 'Cctv Wallpapers - Top Free Cctv Backgrounds - WallpaperAccess',
      amount: 100,
      date: '2023-12-04',
      description:
        'Owing to the wide experience in this domain, we are instrumental in offering Indoor CCTV Camera to our clients.',
      buyer: 'Suparjinem',
      brand: 'Brand A', // Tambahkan properti brand
      imageUri:
        'https://image.made-in-china.com/2f0j00EBRQnTjcgMoV/CCTV-Camera-HKD-80830-.jpg',
    },
    {
      id: 2,
      name: 'Indoor CCTV Camera',
      amount: 150,
      date: '2023-12-03',
      description:
        'Owing to the wide experience in this domain, we are instrumental in offering Indoor CCTV Camera to our clients.',
      buyer: 'suparman',
      brand: 'Brand B', // Tambahkan properti brand
      imageUri: 'https://4.imimg.com/data4/RU/NM/MY-6509051/hd-cctv-camera.jpg',
    },
  ];

  const renderTransaction = ({item}) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Image source={{uri: item.imageUri}} style={styles.transactionImage} />
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>{item.name}</Text>
          <Text style={styles.transactionDescription}>
            Description: {item.description}
          </Text>
          <Text style={styles.transactionBuyer}>
            Nama Teknisi: {item.buyer}
          </Text>
          <Text style={styles.transactionBrand}>Brand: {item.brand}</Text>
          <Text style={styles.transactionAmount}>Amount: ${item.amount}</Text>
          <Text style={styles.transactionDate}>Date: {item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <EmptyBackground />
      <View style={styles.transactionContainer}>
        <Gap height={50} />
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transactionContainer: {
    flex: 1,
    padding: 25,
  },
  transactionItem: {
    marginBottom: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    elevation: 4,
    padding: 10,
  },
  transactionInfo: {
    flexDirection: 'row',
    elevation: 10,
  },
  transactionImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#555',
  },
  transactionBuyer: {
    fontSize: 14,
    color: '#555',
  },
  transactionBrand: {
    fontSize: 14,
    color: '#555',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.GREEN,
    marginTop: 5,
  },
  transactionDate: {
    fontSize: 12,
    color: '#777',
  },
});
