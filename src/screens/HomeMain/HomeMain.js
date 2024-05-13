import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Styles} from '../../components';
import {DasboardMember} from '../../features/HomeMain';

export default function HomeMain() {
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <DasboardMember />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
