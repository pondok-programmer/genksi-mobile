import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ImgNothingPhoto, ImgWarning} from '../../../assets';
import {Gap} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

export default function RiwayatTransaksiMember() {
  const [dataRiwayatOrder, setDataRiwayatOrder] = useState([]);
  const [imageUploaded, setImageUploaded] = useState({});
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchRiwayatOrder = async () => {
    try {
      setRefreshing(true);
      const response = await api.get('/member/riwayat-order');
      console.log('riwayat order', response.data.message);
      setDataRiwayatOrder(response.data.data);

      const storedImages = await EncryptedStorage.getItem('uploadedImages');
      if (storedImages) {
        setImageUploaded(JSON.parse(storedImages));
      }
      setReady(true);
      setRefreshing(false);
    } catch (error) {
      if (error.message) {
        console.log('error from server', error.response.data);
      } else {
        console.log('error from source code ', error.message);
      }
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRiwayatOrder();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const renderTransaction = ({item}) => {
    const selectedImage = imageUploaded[item.id_order];

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionInfo}>
          <Image
            source={
              item?.photo_produk
                ? {uri: `https://genksi.ejctechnology.com/${item.photo_produk}`}
                : ImgNothingPhoto
            }
            style={styles.transactionImage}
          />
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionName}>{item?.produk}</Text>
            <Text style={styles.transactionBrand}>Merk: {item?.merk}</Text>
            <Text style={styles.transactionResolusi}>
              Resolusi: {item?.resolusi}
            </Text>
            <Text style={styles.transactionTipe}>Tipe: {item?.tipe}</Text>
            <Text style={styles.transactionDate}>
              Jumlah order: {item?.jumlah_order_produk}
            </Text>
            <Text style={styles.transactionAmount}>
              Harga: Rp {item?.harga}
            </Text>
            <View style={styles.transactionFooter}>
              <Text style={styles.transactionAmountAll}>
                Total Harga: Rp {item?.total_harga_order}
              </Text>
              <TouchableNativeFeedback
                onPress={() => {
                  setSelectedImage(selectedImage);
                  toggleModal();
                }}
                background={TouchableNativeFeedback.Ripple('#DDD')}>
                <View style={styles.trashButton}>
                  {selectedImage ? (
                    <Image
                      source={{uri: selectedImage}}
                      style={styles.trashIcon}
                    />
                  ) : (
                    <Image source={ImgNothingPhoto} style={styles.trashIcon} />
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (!ready) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Memuat formulir...</Text>
      </View>
    );
  }

  if (dataRiwayatOrder.length === 0) {
    return (
      <View style={styles.ViewNothingContent}>
        <View>
          <Image source={ImgWarning} style={{height: 180, width: 100}} />
        </View>
        <Gap height={5} />
        <Text style={styles.TxtNothingProduct}>Product Not found!!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} />
      <Gap height={50} />
      <FlatList
        data={dataRiwayatOrder}
        renderItem={renderTransaction}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.transactionContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchRiwayatOrder}
          />
        }
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.ContainerModal}>
          {selectedImage && (
            <ImageBackground
              source={{uri: selectedImage}}
              resizeMode={'contain'}
              style={{height: 700, width: 300}}>
              <TouchableOpacity
                style={styles.modalCloseView}
                onPress={() => {
                  setIsModalVisible(false);
                }}>
                <Text style={styles.modalCloseText}>{'Tutup'}</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionAmountAll: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.BLUE,
  },
  transactionTipe: {
    fontSize: 15,
    color: '#555',
  },
  ViewNothingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtNothingProduct: {
    fontSize: 18,
    color: 'grey',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 18,
    color: 'grey',
    fontStyle: 'italic',
  },
  container: {
    flex: 1,
  },
  transactionContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  transactionItem: {
    marginBottom: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    elevation: 4,
    overflow: 'hidden',
    padding: 10,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  transactionBrand: {
    fontSize: 15,
    color: '#555',
  },
  transactionResolusi: {
    fontSize: 15,
    color: '#555',
  },
  transactionAmount: {
    fontSize: 14,
    color: '#555',
  },
  transactionDate: {
    fontSize: 14,
    color: '#555',
  },
  transactionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  trashButton: {
    padding: 2,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  trashIcon: {
    width: 20,
    height: 30,
  },
  ContainerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseView: {
    position: 'absolute',
    top: 20,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 5,
  },
  modalCloseText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '900',
  },
});
