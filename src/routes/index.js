import messaging from '@react-native-firebase/messaging';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  DataProduct,
  DistributorHome,
  KategoriProduct,
  MapMember,
  MapTeknisi,
  ProfileDistributor,
} from '../features/Distributor';
import {Menu} from '../features/Home';
import {
  DasboardMember,
  DetailProduct,
  DetailTeknisiMember,
  LayerSuccesPage,
  MapsMember,
  UpdateProfileMember,
} from '../features/HomeMain';
import {UpdateProfile} from '../features/Teknisi';
import {
  Distributor,
  HomeMain,
  Korwil,
  Login,
  MapKorwil,
  OnBoarding,
  OrderCctv,
  OrderScreenTeknisi,
  Product,
  ProductTeknisi,
  ProdukScreenTeknisi,
  ProfileMain,
  ProfileScreenTeknisi,
  Register,
  RiwayatOrderMain,
  SplashScreen,
  Transaksi,
} from '../screens';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// bottomTop User
function Main() {
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  useFocusEffect(() => {
    setBackgroundColor('#ffffff');
    return () => {
      setBackgroundColor('#000000');
    };
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="rgb(0,93,255)"
      inactiveColor="#9E9E9E"
      barStyle={{backgroundColor: backgroundColor}}>
      <Tab.Screen
        name="Home"
        component={HomeMain}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Riwayat Order"
        component={RiwayatOrderMain}
        options={{
          tabBarLabel: 'Riwayat Order',
          tabBarIcon: ({color}) => (
            <Icon name="cart-variant" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileMain}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function BottomTopTeknisi() {
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  useFocusEffect(() => {
    setBackgroundColor('#ffffff');
    return () => {
      setBackgroundColor('#000000');
    };
  });

  return (
    <Tab.Navigator
      initialRouteName="Produk"
      activeColor="rgb(0,93,255)"
      inactiveColor="#9E9E9E"
      barStyle={{backgroundColor: backgroundColor}}>
      <Tab.Screen
        name="Produk"
        component={ProdukScreenTeknisi}
        options={{
          tabBarLabel: 'Produk',
          tabBarIcon: ({color}) => (
            <Icon name="folder" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreenTeknisi}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({color}) => (
            <Icon name="cart-variant" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenTeknisi}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  const navigation = useNavigation();
  const [initialRouteName, setInitialRouteName] = useState('SplashScreen');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // handle notifikasi jika notifikasi masuk dan aplikasi sedang ada di latar belakang
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // handle notifikasi jika aplikasi terbuka dari notifikasi
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('Product');
    });

    // handle notifikasi jika aplikasi keluar
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRouteName('Product');
          // setInitialRouteName('Register'); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
      }}
      initialRouteName={'SplashScreen'}>
      {/* <Stack.Screen name="LibDemo" component={LibDemo} /> */}
      {/* <Stack.Screen name="FCMdemo" component={FCMdemo} /> */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Korwil" component={Korwil} />
      <Stack.Screen name="ProductTeknisi" component={ProductTeknisi} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="TransaksiTeknisi" component={Transaksi} />
      <Stack.Screen name="OrderCctvTeknisi" component={OrderCctv} />
      <Stack.Screen name="Distributor" component={Distributor} />
      <Stack.Screen name="DistributorHome" component={DistributorHome} />
      <Stack.Screen name="Kategori" component={KategoriProduct} />
      <Stack.Screen name="DataProduct" component={DataProduct} />
      <Stack.Screen name="MapKorwil" component={MapKorwil} />
      <Stack.Screen name="MapTeknisiDistributor" component={MapTeknisi} />
      <Stack.Screen name="ProfileDistributor" component={ProfileDistributor} />
      <Stack.Screen name="MapMemberDistributor" component={MapMember} />
      <Stack.Screen name="MainNavigator" component={Main} />
      <Stack.Screen name="HomeMain" component={HomeMain} />
      <Stack.Screen name="RiwayatOrderMain" component={RiwayatOrderMain} />
      <Stack.Screen name="ProfileMain" component={ProfileMain} />
      <Stack.Screen name="DasboardMember" component={DasboardMember} />
      <Stack.Screen name="MapsMember" component={MapsMember} />
      <Stack.Screen name="DetailProductMember" component={DetailProduct} />
      <Stack.Screen name="SuccesCheckOut" component={LayerSuccesPage} />
      <Stack.Screen name="BottomTopTeknisi" component={BottomTopTeknisi} />
      <Stack.Screen
        name="UpdateProfileMember"
        component={UpdateProfileMember}
      />

      <Stack.Screen
        name="DetailTeknisiMember"
        component={DetailTeknisiMember}
      />
    </Stack.Navigator>
  );
}
