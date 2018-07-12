import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image
} from 'react-native';

export default class Logo extends React.Component {

	render() {
		return (
            <View style={styles.container}>
            	<Image
                style={{width: 70, height: 70}}
                source={require('../assets/img/logo.png')}
              />
              <Text style={styles.logotext}>iKys</Text>
            </View>
        );
	}

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logotext: {
    fontSize: 26,
    color:'#000',
  },
});
