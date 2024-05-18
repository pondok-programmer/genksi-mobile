import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IconProfile, ImgNothingPhoto} from '../../../assets';
import {EmptyBackground, Gap} from '../../../components';
import {colors} from '../../../utils/constant';
import {setLoading} from '../../Auth/services/authSlice';

export default function ModalMember({
  modalVisible,
  dataTeknisi,
  daftarProduct,
  beliCCTV,
  setModalVisible,
}) {
  console.log('profile teknisi', dataTeknisi);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const BASE_URL = 'https://genksi.ejctechnology.com/';
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    if (modalVisible) {
      dispatch(setLoading('pending'));

      setTimeout(() => {
        dispatch(setLoading('idle'));
      }, 2000);
    }
  }, [modalVisible, dispatch]);

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.ModalContainer}>
        <EmptyBackground />
        {loading === 'pending' ? (
          <View style={styles.loadingActivityIndicator}>
            <ActivityIndicator size="large" color="black" />
            <Gap height={70} />
            <Text style={styles.textLoading}>Memuat formulir..</Text>
          </View>
        ) : (
          <ScrollView
            style={{padding: 15}}
            stickyHeaderHiddenOnScroll
            stickyHeaderIndices={[0]}>
            <Gap height={20} />
            <TouchableNativeFeedback
              useForeground
              onPress={() =>
                navigation.navigate('DetailTeknisiMember', {
                  id: dataTeknisi?.id,
                })
              }
              style={styles.viewImgProduct}>
              <Image
                source={IconProfile}
                style={{height: 100, width: 100, alignSelf: 'center'}}
              />
            </TouchableNativeFeedback>
            <Gap height={10} />
            <Text style={styles.textNameTeknisi}>{dataTeknisi?.name}</Text>
            <Gap height={10} />
            <Text style={styles.txtTitleProduk}>Daftar CCTV:</Text>
            {daftarProduct.map((value, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.modalProduct}
                  onPress={() =>
                    navigation.navigate('DetailProductMember', {
                      id_produk: value?.id_produk,
                      id_teknisi: dataTeknisi?.profile.id_user,
                    })
                  }>
                  <Image
                    source={{uri: BASE_URL + value?.photo_produk}}
                    style={{height: 150, width: '100%'}}
                    defaultSource={ImgNothingPhoto}
                  />
                  <View style={styles.bodyTextProduk}>
                    <Text style={styles.textListProduct}>
                      Nama CCTV: {value?.nama_produk}
                    </Text>
                    <Text style={styles.textListProduct}>
                      Merk: {value?.merk}
                    </Text>
                    <Text style={styles.textListProduct}>
                      Tipe: {value?.tipe}
                    </Text>
                    <Text style={styles.textListProduct}>
                      Resolusi: {value?.resolusi}
                    </Text>
                    <Text style={styles.textListProduct}>
                      Harga: {value?.harga}
                    </Text>
                    <Text style={styles.textListProduct}>
                      Stok produk CCTV: {value?.jumlah_stok_produk_teknisi}
                    </Text>
                  </View>
                  <Gap height={10} />
                  {/* <View style={{marginHorizontal: 50}}>
                    <Button
                      title="Membeli CCTV"
                      onPress={() => beliCCTV(value)}
                      color={colors.BLUE}
                    />
                  </View> */}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  txtTitleProduk: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.BLACK,
  },
  bodyTextProduk: {
    padding: 5,
    gap: 3,
  },
  loadingActivityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
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
  modalProduct: {
    elevation: 5,
    backgroundColor: colors.WHITE,
    borderWidth: 0.5,
    maxWidth: 400,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  viewImgProduct: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textNameTeknisi: {
    color: colors.BLACK,
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  textListProduct: {
    color: colors.BLACK,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
