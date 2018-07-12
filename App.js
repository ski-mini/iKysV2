import React, { Component } from 'react';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
import * as firebase from 'firebase';

import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import './app/config/global';

const firebaseConfig = {
  apiKey: global.FIREBASE_APIKEY,
  authDomain: global.FIREBASE_AUTHDOMAIN,
  databaseURL: global.FIREBASE_DBURL,
  projectId: global.FIREBASE_PROJECTID,
  storageBucket: "",
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount() {
    this.loadFont().done();

    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
        this.setState({ user: user, loading: false, authenticated: true }); 
      } else {
        this.setState({ loading: false, authenticated: false });
      }
     });
  }

  async loadFont(){
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  render() {
    if (this.state.loading) return null;

    if (!this.state.authenticated) {
      return (
        <Root>
          <LoginScreen />
        </Root>
      );
    }

    return (
      <Root>
        <HomeScreen user={this.state.user} />
      </Root>
    );
  }

}
