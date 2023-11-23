import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import {ImgCCTV} from '../../assets';

export default function OnBoarding({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.viewShape} />
        <Image source={ImgCCTV} style={styles.imgCctv} />
        <Text style={styles.textTitle}>
          Genksi, mempunyai kualitas dan kuantitas yang terjangkau!
        </Text>
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigation.replace('Login')}>
          <View style={styles.btnNext}>
            <Text style={styles.textBtnNext}>Mulai</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtnNext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnNext: {
    backgroundColor: 'dodgerblue',
    position: 'absolute',
    bottom: 30,
    width: '80%',
    alignSelf: 'center',
    elevation: 3,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  imgCctv: {
    width: 280,
    height: 250,
    alignSelf: 'center',
    marginVertical: 50,
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 480,
  },
  viewShape: {
    width: 500,
    height: '70%',
    backgroundColor: '#2f80ed',
    borderRadius: 50,
    transform: [{rotate: '5deg'}],
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: -50,
    right: -10,
  },
});
