import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/constant';

export default function LayerSuccesPage({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembelian berhasil{'\n'}Terdaftar</Text>
      <Text style={styles.subtitle}>
        Silakan unggah bukti transfer Anda!{'\n'}Nikmati setiap harinya.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DasboardMember')}>
        <Text style={styles.buttonText}>Mulai</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 26,
    color: colors.BLACK,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
    color: '#666',
  },
  button: {
    backgroundColor: colors.NAVY,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
