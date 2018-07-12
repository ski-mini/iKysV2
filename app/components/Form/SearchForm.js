import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Icon } from 'native-base';
import { StyleSheet, Text, View, } from 'react-native';

export default class SearchForm extends React.Component {

	render() {
		return (
            <Item>
              <Icon active name='search' style={styles.white} />
              <Input onChangeText={(text) => this.props.register(text)} placeholderTextColor={'white'}  style={styles.white} placeholder="Recherche" />
            </Item>
        );
	}

}

const styles = StyleSheet.create({
  white: {
    color: 'white',
  },
});
