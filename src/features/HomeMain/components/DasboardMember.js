import {useNavigation} from '@react-navigation/native'; // tambahkan ini
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ModalFirstMember} from '..';
import {IconShoppingDasboard, ImgMaps, ImgWarning} from '../../../assets';
import {EmptyBackground, Gap, SearchInput, Styles} from '../../../components';
import {colors} from '../../../utils/constant';

export default function DasboardMember() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [teknisiIsSelected, setTeknisiIsSelected] = useState(false);

  useEffect(() => {
    async function checkFistTime() {
      try {
        const value = await EncryptedStorage.getItem('modalVisible');
        if (value === 'null') {
          setModalVisible(true);
          await EncryptedStorage.setItem('modalVisible', 'true');
        }
      } catch (error) {
        console.log('error', error.message);
      }
    }
    checkFistTime();
  }, []);

  const [dataProduct, setDataProduct] = useState([
    {
      id: 1,
      id_user: 1,
      photo_profile:
        'https://i.pinimg.com/736x/d6/e8/ff/d6e8ff05c7fec836bce48d365e3a1763.jpg',
      title: 'Neountram LG',
      resolusi: '238GB',
    },
    {
      id: 2,
      id_user: 2,
      photo_profile:
        'https://i.pinimg.com/736x/d6/e8/ff/d6e8ff05c7fec836bce48d365e3a1763.jpg',
      title: 'Staram Neo',
      resolusi: '988GB',
    },
  ]);

  return (
    <SafeAreaView style={Styles.container}>
      <EmptyBackground />
      <Gap height={35} />
      <View style={{marginHorizontal: 16}}>
        <View style={styles.ViewHeaderTitle}>
          <Text style={styles.TxtTitleDasb}>Genksi</Text>
          <View style={styles.ViewIconShopp}>
            <Image source={IconShoppingDasboard} style={styles.IconShopp} />
          </View>
          <View style={styles.ViewCheckOut}>
            <Text style={styles.TxtCheckOut}>2</Text>
          </View>
        </View>
        <Gap height={20} />
        <SearchInput
          backgroundColor={colors.GREY}
          borderRadius={10}
          placeholder={''}
          placeholderTextColor={colors.BLACK}
        />
        <Gap height={20} />
        <Text style={styles.TxtSearchMap}>Mencari Lokasi Teknisi</Text>
        <Gap height={10} />
        <TouchableNativeFeedback
          useForeground
          onPress={() => navigation.navigate('MapsMember')}
          style={styles.bodyImgMaps}>
          <Image source={ImgMaps} style={{height: 150, width: '100%'}} />
        </TouchableNativeFeedback>
        <Gap height={20} />
        <ScrollView
          accessibilityActions={[0]}
          stickyHeaderHiddenOnScroll={true}>
          <View style={styles.bodyProduck}>
            <Text style={styles.TxtProduck}>Product</Text>
            <Text style={styles.TxtProduckAll}>See All</Text>
          </View>
          <Gap height={10} />
          {teknisiIsSelected ? (
            <View style={styles.ViewNothingContent}>
              <View>
                <Image source={ImgWarning} style={{height: 180, width: 100}} />
              </View>
              <Gap height={5} />
              <Text style={styles.TxtNothingProduct}>Product Not found!!</Text>
            </View>
          ) : (
            <View style={styles.ViewCOntentProduck}>
              {dataProduct.map((val, ind) => (
                <TouchableOpacity style={styles.contentProduck} key={ind}>
                  <Image
                    source={{uri: val.photo_profile}}
                    style={styles.ImgProduk}
                  />
                  <Gap height={2} />
                  <Text style={styles.titleProduck}>{val.title}</Text>
                  <Gap height={2} />
                  <Text style={styles.resolusiProduck}>{val.resolusi}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <ModalFirstMember
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleOnPress={() => navigation.replace('MapsMember')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodyImgMaps: {
    height: 150,
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.BLACK,
  },
  TxtNothingProduct: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: '600',
  },
  ViewNothingContent: {alignItems: 'center', justifyContent: 'center'},
  resolusiProduck: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.GRAYDEFAULT,
    marginLeft: 5,
  },
  titleProduck: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.BLACK,
    marginLeft: 5,
  },
  ImgProduk: {
    height: 150,
    width: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  ViewCOntentProduck: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  contentProduck: {
    borderRadius: 10,
    width: 150,
    height: 200,
    backgroundColor: colors.WHITE,
    borderWidth: 0.5,
    borderColor: colors.BLACK,
    elevation: 5,
  },
  TxtProduckAll: {
    color: colors.BLUE,
    fontWeight: '400',
    fontSize: 14,
  },
  bodyProduck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TxtProduck: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.BLACK,
  },
  TxtSearchMap: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.BLACK,
  },
  TxtCheckOut: {
    color: colors.WHITE,
    fontSize: 10,
  },
  ViewCheckOut: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    borderRadius: 10,
    marginBottom: 10,
    width: 18,
    height: 18,
    backgroundColor: colors.BLUE,
    borderWidth: 0.3,
    borderColor: colors.BLACK,
  },
  ViewIconShopp: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.BLACK,
  },
  TxtTitleDasb: {
    color: colors.BLACK,
    fontSize: 28,
    fontWeight: '600',
  },
  IconShopp: {
    height: 15,
    width: 15,
  },
  ViewHeaderTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
