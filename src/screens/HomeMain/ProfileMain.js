import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Styles} from '../../components';
import {ProfileMember} from '../../features/HomeMain';

export default function ProfileMain() {
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <ProfileMember />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
