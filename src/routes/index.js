import messaging from '@react-native-firebase/messaging';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NotifService from '../NotifService';

import {
  DataProduct,
  DistributorHome,
  KategoriProduct,
  MapMember,
  MapTeknisi,
  ProfileDistributor,
} from '../features/Distributor';
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
  AddNewTeknisi,
  Distributor,
  HomeMain,
  HomeScreenKoortek,
  LibDemo,
  Login,
  MapKorwil,
  OnBoarding,
  OrderCctv,
  OrderScreenTeknisi,
  Product,
  ProductTeknisi,
  ProdukScreenTeknisi,
  ProfileMain,
  ProfileScreenKoortek,
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

function BottomTopKoortek() {
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
        component={HomeScreenKoortek}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="folder" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Add User"
        component={AddNewTeknisi}
        options={{
          tabBarLabel: 'Card teknisi ',
          tabBarIcon: ({color}) => (
            <Icon name="credit-card-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenKoortek}
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
  const [initialRouteName, setInitialRouteName] = useState('LibDemo');
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);
  console.error('fcm token', registerToken);

  const onRegister = token => {
    setRegisterToken(token?.token);
    setFcmRegistered(true);
  };

  const onNotif = message => {
    console.log(message);
    notif.localNotif(message?.title, message?.message, null);
  };
  const notif = new NotifService(onRegister, onNotif);

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      // Handle foreground notifications
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // notif.localNotif();
    });

    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(remoteMessage => {
        // Handle notifications when the app is opened from a background state
        console.log(
          'Notification opened by tapping on it:',
          JSON.stringify(remoteMessage),
        );
        // notif.localNotif();
      });

    const unsubscribeOnBackgroundMessage =
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        // Handle background notifications (when the app is in the background or terminated)
        console.log(
          'Message handled in the background!',
          JSON.stringify(remoteMessage),
        );
        // notif.localNotif();
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnBackgroundMessage();
    };
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
      }}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="LibDemo" component={LibDemo} />
      {/* <Stack.Screen name="FCMdemo" component={FCMdemo} /> */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="ProductTeknisi" component={ProductTeknisi} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
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
      <Stack.Screen name="BottomTopKoortek" component={BottomTopKoortek} />
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
