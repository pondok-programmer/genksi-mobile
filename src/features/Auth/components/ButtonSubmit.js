import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {colors} from '../../../utils/constant';

export default function ButtonSubmit({
  title = 'Daftar',
  onPress,
  loading,
  disabled,
}) {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={{...styles.container}}>
        {loading ? (
          <ActivityIndicator
            color={'white'}
            size={'large'}
            style={styles.textTitle}
          />
        ) : (
          <Text
            style={{
              ...styles.textTitle,
              opacity: disabled ? 8 : 1,
            }}>
            {title}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: '#006bd6',
    width: 180,
    height: 50,
    borderRadius: 50 / 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
