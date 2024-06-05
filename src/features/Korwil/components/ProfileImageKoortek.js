import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../utils/constant';

export default function ProfileImageKoortek({photoProfile, isReady}) {
  return (
    <View style={styles.Container}>
      {isReady ? (
        photoProfile ? (
          <Image source={{uri: photoProfile}} style={styles.Img} />
        ) : (
          <Icon
            name="account-circle"
            size={180}
            color="grey"
            style={styles.Icon}
          />
        )
      ) : (
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Icon: {
    marginTop: 20,
  },
  Img: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  Container: {
    width: 200,
    height: 200,
    backgroundColor: colors.WHITE,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderWidth: 0.4,
  },
});
