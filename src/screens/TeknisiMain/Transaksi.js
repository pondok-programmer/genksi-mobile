import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconTrash} from '../../assets';
import {colors} from '../../utils/constant';

export default function Transaksi({navigation}) {
  const [ready, setReady] = useState(true);
  const [dataTransaksi, setDataTransaksi] = useState(null);

  const transactions = [
    {
      id: 1,
      name: 'Cctv Wallpapers - Top Free Cctv Backgrounds - WallpaperAccess',
      amount: 100,
      date: '2023-12-04',
      description:
        'Owing to the wide experience in this domain, we are instrumental in offering',
      buyer: 'Suparjinem',
      brand: 'Brand A',
      imageUri:
        'https://image.made-in-china.com/2f0j00EBRQnTjcgMoV/CCTV-Camera-HKD-80830-.jpg',
    },
    {
      id: 2,
      name: 'Indoor CCTV Camera',
      amount: 150,
      date: '2023-12-03',
      description:
        'Owing to the wide experience in this domain, we are instrumental ',
      buyer: 'suparman',
      brand: 'Brand B',
      imageUri: 'https://4.imimg.com/data4/RU/NM/MY-6509051/hd-cctv-camera.jpg',
    },
  ];

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setReady(false);
      setDataTransaksi(transactions);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleDelete = id => {
    Alert.alert(
      'Perhatian!',
      'Apakah Anda akan menghapus riwayat transaksi?',
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setDataTransaksi(prevData =>
              prevData.filter(item => item.id !== id),
            );
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderTransaction = ({item}) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Image source={{uri: item.imageUri}} style={styles.transactionImage} />
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>{item.name}</Text>
          <Text style={styles.transactionDescription}>
            Description: {item.description}
          </Text>
          <Text style={styles.transactionBuyer}>Buyer: {item.buyer}</Text>
          <Text style={styles.transactionBrand}>Brand: {item.brand}</Text>
          <Text style={styles.transactionAmount}>Amount: ${item.amount}</Text>
          <View style={styles.transactionFooter}>
            <Text style={styles.transactionDate}>Date: {item.date}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Image source={IconTrash} style={{height: 20, width: 20}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {ready ? (
        <View style={styles.ViewLoading}>
          <Text style={[styles.textLoading, {fontSize: 16}]}>
            Memuat formulir...
          </Text>
        </View>
      ) : (
        <View style={{padding: 25}}>
          <FlatList
            data={dataTransaksi}
            renderItem={renderTransaction}
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
    color: colors.GRAYDEFAULT,
    flex: 1,
    fontStyle: 'italic',
  },
  ViewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionItem: {
    marginBottom: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    elevation: 2,
    padding: 5,
  },
  transactionInfo: {
    flexDirection: 'row',
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
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: '#777',
  },
});
