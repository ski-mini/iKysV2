import React, { Component } from 'react';
import Logo from '../components/Logo';
import FbConnect from '../components/FbConnect';

import { 
  StyleSheet, 
  Text, 
  View,
  StatusBar
} from 'react-native';

export default class LoginScreen extends React.Component {

	render() {
		return (
          <View style={styles.container}>
          	<StatusBar backgroundColor="#9499b7" barStyle="light-content" />
          	<Logo />
          	<FbConnect />
          </View>
        );
	}

}

const styles = StyleSheet.create({
  welcometext: {
    fontSize: 18,
    color:'#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#c5cae9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
