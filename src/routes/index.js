import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging';

import {
  Home,
  LibDemo,
  Login,
  OnBoarding,
  Register,
  SplashScreen,
} from '../screens';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const navigation = useNavigation();
  const [initialRouteName, setInitialRouteName] = useState('LibDemo');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('LibDemo');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRouteName('Register'); // e.g. "Settings"
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
    </Stack.Navigator>
  );
}
