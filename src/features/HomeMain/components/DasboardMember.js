import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {EmptyContent, HeaderComponent, ModalFirstMember, ProductItem} from '..';
import {ImgMaps} from '../../../assets';
import {Gap, Styles} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

const DashboardMember = ({route}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [imageUploaded, setImageUploaded] = useState({});
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function checkFirstTime() {
      try {
        const value = await EncryptedStorage.getItem('modalVisible');
        if (value !== 'true') {
          setModalVisible(true);
          await EncryptedStorage.setItem('modalVisible', 'true');
        }
      } catch (error) {
        console.log('error', error.message);
      }
    }

    checkFirstTime();
    fetchDataProduk();
  }, []);

  async function fetchDataProduk(id) {
    try {
      setRefreshing(true);
      const response = await api.get('/member/order-belum-transfer');
      console.log('data product', response.data.message);
      setDataProduct(response.data.data);

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
  }

  const uploadBuktiTransfer = async (id_order, file) => {
    const formData = new FormData();
    formData.append('photo_bukti_pembayaran', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });

    try {
      const response = await api.post(
        `/member/upload-bukti-transfer/${id_order}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Upload bukti transfer:', response.data.message);
      fetchDataProduk();
      await EncryptedStorage.setItem(
        'uploadedImages',
        JSON.stringify({
          ...imageUploaded,
          [id_order]: file.uri,
        }),
      );

      setImageUploaded(prev => ({
        ...prev,
        [id_order]: file.uri,
      }));
      ToastAndroid.show('Bukti transfer berhasil diupload', ToastAndroid.SHORT);
    } catch (error) {
      console.error(
        'Error uploading bukti transfer:',
        error.response || error.message,
      );
    }
  };

  const handleUploadTransaction = id_order => {
    Alert.alert(
      'Perhatian',
      'Apakah Anda ingin upload bukti transfer?',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Ya',
          onPress: () => handleImagePicker(id_order),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const handleImagePicker = async id_order => {
    const imagePicker = async from => {
      try {
        const method =
          from === 'gallery'
            ? launchImageLibrary({mediaType: 'photo', quality: 0.2})
            : launchCamera({mediaType: 'photo', quality: 0.2});
        const {assets} = await method;
        if (assets) {
          const {fileName: name, uri, type} = assets[0];
          await uploadBuktiTransfer(id_order, {uri, name, type});
        }
      } catch (error) {
        console.error('Error selecting image:', error);
      }
    };

    const PermissionCamera = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          imagePicker('camera');
        }
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    };

    Alert.alert(
      '',
      'Ambil dari gambar...',
      [
        {
          text: 'Kamera',
          onPress: () => PermissionCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => imagePicker('gallery'),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <ScrollView
      style={Styles.container}
      stickyHeaderHiddenOnScroll={true}
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchDataProduk} />
      }>
      <Gap height={35} />
      <HeaderComponent />
      <TouchableNativeFeedback
        useForeground
        onPress={() => navigation.navigate('MapsMember')}
        style={styles.bodyImgMaps}>
        <Image source={ImgMaps} style={styles.imgMaps} />
      </TouchableNativeFeedback>
      <Gap height={20} />
      <View style={{marginHorizontal: 16}}>
        <View style={styles.bodyProduck}>
          <Text style={styles.TxtProduck}>Product</Text>
        </View>
        <Gap height={10} />
        {dataProduct.length === 0 ? (
          <EmptyContent />
        ) : (
          <>
            {dataProduct.map((val, ind) => (
              <ProductItem
                key={ind}
                product={val}
                onUploadTransaction={handleUploadTransaction}
                imageUploaded={imageUploaded}
              />
            ))}
          </>
        )}
      </View>

      {!ready && dataProduct.length > 0 && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Memuat formulir...</Text>
        </View>
      )}

      <ModalFirstMember
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleOnPress={() => navigation.replace('MapsMember')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgMaps: {
    height: 150,
    width: 335,
    borderRadius: 10,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyImgMaps: {
    height: 150,
    width: 335,
    borderRadius: 10,
    alignSelf: 'center',
  },
  ViewNothingContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtNothingProduct: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: '600',
  },
  ImgProduk: {
    height: 150,
    width: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bodyProduck: {
    alignItems: 'flex-start',
  },
  TxtProduck: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.BLACK,
  },
});

export default DashboardMember;
