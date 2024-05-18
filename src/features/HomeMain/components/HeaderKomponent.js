import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gap, SearchInput} from '../../../components';
import {colors} from '../../../utils/constant';

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ViewHeaderTitle}>
        <Text style={styles.TxtTitleDasb}>Genksi</Text>
      </View>
      <Gap height={20} />
      <SearchInput
        backgroundColor={colors.GREY}
        borderRadius={10}
        placeholder={''}
        placeholderTextColor={colors.BLACK}
      />
      <Gap height={20} />
      <Text style={styles.TxtSearchMap}>Mencari Lokasi Teknisi</Text>
      <Gap height={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  ViewHeaderTitle: {
    // flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  TxtTitleDasb: {
    color: colors.BLACK,
    fontSize: 28,
    fontWeight: '600',
  },
  TxtSearchMap: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.BLACK,
  },
});

export default HeaderComponent;
