import React from 'react';
import {  Text, View } from 'react-native';
import MainComponent from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();
export default function App() {
  return (
    <Provider store = {store}>
    <MainComponent/>
    </Provider>
  );
}

