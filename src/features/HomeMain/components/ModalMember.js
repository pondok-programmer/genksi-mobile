import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {IconProfile} from '../../../assets';
import {Gap} from '../../../components';
import {colors} from '../../../utils/constant';

export default function ModalMember({
  modalVisible,
  ready,
  dataTeknisi,
  daftarProduct,
  beliCCTV,
  setModalVisible,
}) {
  const navigation = useNavigation();
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.ModalContainer}>
        {!ready ? (
          <View style={styles.loadingActivityIndicator}>
            <ActivityIndicator size="large" color="black" />
            <Gap height={70} />
            <Text style={styles.textLoading}>Memuat formulir..</Text>
          </View>
        ) : (
          <ScrollView style={{padding: 15}}>
            <Gap height={20} />
            <TouchableNativeFeedback
              useForeground
              onPress={() => navigation.navigate('DetailTeknisiMember')}
              style={styles.viewImgProduct}>
              <Image
                source={IconProfile}
                style={{height: 100, width: 100, alignSelf: 'center'}}
              />
            </TouchableNativeFeedback>
            <Gap height={10} />
            <Text style={styles.textNameTeknisi}>{dataTeknisi.name}</Text>
            <Gap height={10} />
            <Text style={styles.textListProduct}>Daftar Cctv:</Text>
            {daftarProduct.map((value, index) => {
              return (
                <View key={index} style={styles.modalProduct}>
                  <Text style={styles.textListProduct}>
                    Nama cctv: {value.nama_produk}
                  </Text>
                  <Text style={styles.textListProduct}>merk: {value.merk}</Text>
                  <Text style={styles.textListProduct}>tipe: {value.tipe}</Text>
                  <Text style={styles.textListProduct}>
                    resolusi: {value.resolusi}
                  </Text>
                  <Text style={styles.textListProduct}>
                    harga: {value.harga}
                  </Text>
                  <Text style={styles.textListProduct}>
                    stok product cctv: {value.jumlah_stok_produk_teknisi}
                  </Text>
                  <Gap height={10} />
                  <View style={{marginHorizontal: 50}}>
                    <Button
                      title="Membeli Cctv"
                      onPress={() => beliCCTV(value)}
                      color={colors.BLUE}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    // alignSelf: 'center',
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
    fontSize: 19,
    marginHorizontal: 20,
    fontFamily: 'Poppins-Medium',
  },
});
