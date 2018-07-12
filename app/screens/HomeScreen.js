import React, { Component } from 'react';

import SearchScreen from './SearchScreen';
import HeaderSearch from '../components/Headers/HeaderSearch';
import { HomeNavigation } from '../config/router';

import * as firebase from 'firebase';
import { Container, Text } from 'native-base';
import { 
  StyleSheet
} from 'react-native';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <HomeNavigation />
    );
  }

}