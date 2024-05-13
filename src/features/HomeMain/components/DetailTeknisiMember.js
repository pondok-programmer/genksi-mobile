import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EmptyBackground, Gap, Header, Styles} from '../../../components';
import api from '../../../services/axiosInstance';
import {colors} from '../../../utils/constant';

export default function DetailTeknisiMember({navigation}) {
  const [photoTeknisi, setPhotoTeknisi] = useState(null);
  const [dataTeknisi, setDataTeknisi] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    DetailBioTeknisi();
  }, []);

  // PRODUCT DETAIL
  async function DetailBioTeknisi() {
    try {
      const response = await api.get('/member/detail-teknisi/11');
      setDataTeknisi(response.data.data);
      setReady(true);
    } catch (error) {
      if (error.response) {
        console.log('error from server', error.response.data);
      } else {
        console.log('Error fetching product details', error.message);
      }
    }
  }

  return (
    <SafeAreaView style={Styles.container}>
      <EmptyBackground />
      <Gap height={30} />
      <Header title="Detail Product" onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            {ready ? (
              <Image
                source={
                  photoTeknisi && photoTeknisi.photo_produk
                    ? {uri: 'https://genksi.ejctechnology.com/photo_produk'}
                    : require('../../../assets/icons/profile.png')
                }
                style={styles.profileImage}
              />
            ) : (
              <ActivityIndicator size="large" color={colors.PRIMARY} />
            )}
          </View>
          <Text style={styles.profileName}>{dataTeknisi.name}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{dataTeknisi.email}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Nomor Telepon:</Text>
            <Text style={styles.detailValue}>
              {dataTeknisi.profile && dataTeknisi.profile.nomor_telepon}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginTop: 80,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.BLACK,
  },
  detailContainer: {
    width: '80%',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.DARKGRAY,
  },
  detailValue: {
    fontSize: 16,
    color: colors.BLACK,
  },
});
