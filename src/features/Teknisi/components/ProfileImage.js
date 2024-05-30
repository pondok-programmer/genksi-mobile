import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../utils/constant';

const ProfileImage = ({photoProfile, isReady}) => (
  <View style={styles.profileImage}>
    {isReady ? (
      photoProfile ? (
        <Image source={{uri: photoProfile}} style={styles.imageStyle} />
      ) : (
        <Icon
          name="account-circle"
          size={180}
          color="grey"
          style={styles.iconStyle}
        />
      )
    ) : (
      <ActivityIndicator size="large" color={colors.PRIMARY} />
    )}
  </View>
);

const styles = StyleSheet.create({
  profileImage: {
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
  iconStyle: {
    marginTop: 20,
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
});

export default ProfileImage;
