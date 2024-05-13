import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconDangerous} from '../../../assets';
import {colors} from '../../../utils/constant';

export default function ModalFirstMember({
  modalVisible,
  setModalVisible,
  handleOnPress,
}) {
  const navigation = useNavigation();

  //   const handleOnPress = () => {
  //     // Tambahkan navigasi ke MapsMember
  //     navigation.navigate('MapsMember');
  //     // Tutup modal setelah navigasi
  //     setModalVisible(false);
  //   };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      style={{flex: 1}}
      onRequestClose={() => setModalVisible(false)}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={styles.Container}>
        <View style={styles.bodyModal}>
          <Image
            source={IconDangerous}
            style={{height: 200, width: 300, marginBottom: 20}}
          />
          <Text style={styles.txtTitle}>
            Anda memerlukan bantuan teknisi. Silakan cari teknisi terdekat
            melalui Google Maps.
          </Text>
          <TouchableOpacity onPress={handleOnPress} style={styles.okButton}>
            <Text style={styles.okText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.BLACK,
  },
  bodyModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 30,
    alignItems: 'center',
    elevation: 5,
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  okButton: {
    backgroundColor: colors.GREEN,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
