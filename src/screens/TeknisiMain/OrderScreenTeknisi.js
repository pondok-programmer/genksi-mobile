import React from 'react';
import {Alert, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Tasbar} from '../../components';
import TapNavigator from '../../routes/TapNavigator';

export default function OrderScreenTeknisi() {
  const showAlert = () => {
    Alert.alert('Perhatian!!', 'Nantikan Fitur', [{text: 'OK'}]);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Tasbar onPressIconMenu={showAlert} />
      <TapNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
