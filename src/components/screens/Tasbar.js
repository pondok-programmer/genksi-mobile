import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {SearchInput} from '..';
import MenuSvg from '../../assets/svg/menuSvg.svg';
import {colors} from '../../utils/constant';

export default function Tasbar({onPressIconMenu}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <TouchableNativeFeedback useForeground onPress={onPressIconMenu}>
          <MenuSvg width={28} height={28} />
          {/* <Image source={IconMenu2} style={{width: 40, height: 40}} /> */}
        </TouchableNativeFeedback>
        <SearchInput
          placeholder={'Cari data teknisi'}
          placeholderTextColor={colors.GREY}
          backgroundColor={colors.WHITE}
          borderRadius={12}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 30,
    top: 40,
  },
  container: {
    backgroundColor: colors.Dongker,
    height: 95,
    paddingHorizontal: 10,
  },
});
