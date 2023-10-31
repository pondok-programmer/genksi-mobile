import React from 'react';
import {store} from './redux';
import {Provider} from 'react-redux';
import Navigator from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
