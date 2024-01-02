import React from 'react';
import {store} from './redux';
import {Provider} from 'react-redux';
import Navigator from './routes';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}

// bootsplash
