import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {IconProfile, IconTrash} from '../../assets';
import {Gap, Styles, Tasbar} from '../../components';
import {colors} from '../../utils/constant';

export default function AddNewTeknisi() {
  const [dropDownVisible, setdropDownVisible] = useState(false);

  const handlePressIconMenu = () => {
    setdropDownVisible(!dropDownVisible);
  };

  const handleDropDown = () => {
    setdropDownVisible(false);
    Alert.alert('Perhatian', 'fitur dalam proses pembuatan', [
      {text: 'OK', style: 'cancel'},
    ]);
  };

  return (
    <View style={Styles.container}>
      <Tasbar onPressIconMenu={handlePressIconMenu} />
      <Gap height={10} />
      <View style={styles.bodyContent}>
        <Image source={IconProfile} style={{height: 70, width: 70}} />
        <Gap width={10} />
        <View style={styles.content}>
          <Text style={styles.txtTitle}>Supardi parjiman bin sunto</Text>
          <Gap height={5} />
          <Text style={styles.noTelephone}>+62087867575</Text>
        </View>
        <TouchableNativeFeedback useForeground>
          <Image source={IconTrash} style={{height: 30, width: 30}} />
        </TouchableNativeFeedback>
      </View>

      {dropDownVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={dropDownVisible}
          onRequestClose={() => setdropDownVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdown}>
              <Button onPress={handleDropDown} title="Tambah Teknisi" />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    width: 200,
    padding: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    elevation: 10,
  },
  noTelephone: {
    color: '#555',
    fontWeight: '500',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
    maxWidth: 250,
  },
  bodyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    backgroundColor: colors.WHITE,
    elevation: 5,
    margin: 10,
    borderRadius: 10,
  },
});
