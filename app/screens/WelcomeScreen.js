import React, { Component } from 'react';

import * as firebase from 'firebase';
import { Container, Text } from 'native-base';
import { 
  StyleSheet
} from 'react-native';


export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Text>Welcome!</Text>
      </Container>
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
  icon: {
    width: 24,
    height: 24,
  },
});