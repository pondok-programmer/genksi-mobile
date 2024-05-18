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

export default function DetailTeknisiMember({navigation, route}) {
  const {id} = route.params;
  const [data, setData] = useState({
    photoTeknisi: null,
    dataTeknisi: {},
    ready: false,
  });

  useEffect(() => {
    const fetchDetailBioTeknisi = async teknisiId => {
      try {
        const response = await api.get(`/member/detail-teknisi/${teknisiId}`);
        setData({
          photoTeknisi: response.data.data.photo_produk,
          dataTeknisi: response.data.data,
          ready: true,
        });
      } catch (error) {
        if (error.response) {
          console.log('error from server', error.response.data);
        } else {
          console.log('Error fetching product details', error.message);
        }
      }
    };
    fetchDetailBioTeknisi(id);
  }, [id]);

  const {photoTeknisi, dataTeknisi, ready} = data;

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
                  photoTeknisi
                    ? {uri: `https://genksi.ejctechnology.com/${photoTeknisi}`}
                    : require('../../../assets/icons/profile.png')
                }
                style={styles.profileImage}
              />
            ) : (
              <ActivityIndicator size="large" color={colors.PRIMARY} />
            )}
          </View>
          {ready ? (
            <Text style={styles.profileName}>{dataTeknisi?.name}</Text>
          ) : (
            <ActivityIndicator size="large" color={colors.PRIMARY} />
          )}
        </View>
        <View style={styles.detailContainer}>
          <DetailItem label="Email:" value={dataTeknisi?.email} ready={ready} />
          <DetailItem
            label="Nomor Telepon:"
            value={dataTeknisi?.profile?.nomor_telepon}
            ready={ready}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailItem = ({label, value, ready}) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    {ready ? (
      <Text style={styles.detailValue}>{value}</Text>
    ) : (
      <ActivityIndicator size="large" color={colors.PRIMARY} />
    )}
  </View>
);

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
