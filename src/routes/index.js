import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';

import {
  Home,
  Korwil,
  LibDemo,
  Login,
  OnBoarding,
  Product,
  Register,
  SplashScreen,
  Teknisi,
} from '../screens';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const navigation = useNavigation();
  const [initialRouteName, setInitialRouteName] = useState('Korwil');
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
      // navigation.navigate('Product');
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
      initialRouteName={initialRouteName}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LibDemo" component={LibDemo} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Korwil" component={Korwil} />
      <Stack.Screen name="Teknisi" component={Teknisi} />
    </Stack.Navigator>
  );
}
