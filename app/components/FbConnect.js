import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Content, Form, Button } from 'native-base';
      
import * as firebase from 'firebase';

export default class FbConnect extends React.Component {

  async loginWithFacebook() {

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1567800526640749', { permissions: ['public_profile'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential)
      .then(currentUser => {
        firebase.database().ref("/users/" + currentUser.providerData[0].uid).set({
          displayName: currentUser.providerData[0].displayName,
          fbToken: token,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    }
  }

  render() {
    return (
        <Form>
          <Button
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text>Login with Facebook</Text>
          </Button>
          
        </Form>
    );
  }
}