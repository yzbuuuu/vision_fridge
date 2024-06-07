/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Provider, useDispatch} from 'react-redux';

import Navigation from './Navigator';
import store from './store/store';

function App() {

  console.log('start!!!');
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
