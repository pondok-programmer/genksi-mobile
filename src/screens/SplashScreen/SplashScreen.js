import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

export default function SplashScreen({navigation}) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.replace('OnBoarding');
  //   }, 3000);
  // }, []);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
