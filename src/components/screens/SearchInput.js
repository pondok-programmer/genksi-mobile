import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '..';
import {colors} from '../../utils/constant';

export default function SearchInput({
  backgroundColor,
  placeholderTextColor,
  borderRadius,
  placeholder,
}) {
  return (
    <View style={[styles.containerSearchBar, {borderRadius, backgroundColor}]}>
      <Icon name={'magnify'} color={'black'} size={30} />
      <Gap height={3} />
      <TextInput
        placeholder={placeholder ? 'Search' : 'Cari produk cctv'}
        placeholderTextColor={placeholderTextColor}
        style={{color: colors.BLACK}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerSearchBar: {
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    elevation: 3,
    alignItems: 'center',
  },
});
