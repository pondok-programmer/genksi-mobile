import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {IconMenu2, IconProfile} from '../../../assets';
import {colors} from '../../../utils/constant';

export default function NavbarComponent(onMenuPress) {
  return (
    <View style={styles.navbar}>
      <TouchableNativeFeedback useForeground onPress={onMenuPress}>
        <Image
          source={IconMenu2}
          style={styles.imgMenu}
          tintColor={colors.BLACK}
        />
      </TouchableNativeFeedback>
      <View style={styles.textContainer}>
        <Text style={styles.txtName}>Joseph Thomson</Text>
      </View>
      <Image source={IconProfile} style={{height: 45, width: 45}} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  imgMenu: {
    height: 39,
    width: 37,
    backgroundColor: '#536DFE',
    padding: 10,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  txtName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginLeft: 10,
  },
});
