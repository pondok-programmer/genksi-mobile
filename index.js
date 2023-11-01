/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    // console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    const {foreground, action} = notification;
    // console.log(notification);
    notification.finish();
  },
  onAction: function (notification) {
    const {foreground, action} = notification;
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel({
  channelId: 'user-channel',
  channelName: 'User Channel',
  channelDescription: 'A channel for user',
  soundName: 'default',
  importance: Importance.HIGH,
  vibrate: true,
});

PushNotification.createChannel({
  channelId: 'teknisi-channel',
  channelName: 'Teknisi Channel',
  channelDescription: 'A channel for teknisi',
  soundName: 'default',
  importance: Importance.HIGH,
  vibrate: true,
});

AppRegistry.registerComponent(appName, () => App);
