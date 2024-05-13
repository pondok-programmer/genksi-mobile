import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {store} from './redux';
import Navigator from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
